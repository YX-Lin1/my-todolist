#!/usr/bin/env node
/**
 * Scan Next.js Client Components for forbidden imports.
 *
 * Why:
 * - `"use client"` files must not import non-browser modules from
 *   `@/library/{di,services,db,api}`.
 * - The only allowed exception is importing modules whose path ends with
 *   `-browser.ts(x)` (e.g. `client-browser.tsx`).
 *
 * Configuration:
 * - By default, this restricts imports from `@/library/{di,services,db,api}`.
 * - For those restricted directories, only modules whose path ends with
 *   `-browser` (optionally suffixed with `.ts` or `.tsx` in the import specifier)
 *   are allowed in `"use client"` files.
 * - Note: this script checks only direct `import` / `export ... from` statements
 *   in `"use client"` files; it does not follow transitive dependencies.
 * - You can override the restricted directory names via CLI:
 *   - `node scripts/check-client-boundary.mjs apps/ --restrictedDirs=di,services`
 *
 * Usage:
 *   node scripts/check-client-boundary.mjs [baseDir]
 *   # default baseDir: apps/
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_RESTRICTED_DIRS = ["di", "services", "db", "api"];

const argv = process.argv.slice(2);
let baseDir = path.resolve("apps");
let restrictedDirNames = DEFAULT_RESTRICTED_DIRS;

// Positional arg: first non-flag is treated as baseDir.
const firstPositionalIndex = argv.findIndex((a) => !a.startsWith("--"));
if (firstPositionalIndex !== -1) {
  baseDir = path.resolve(argv[firstPositionalIndex]);
}

// CLI override: --restrictedDirs=di,services,db,api  (comma-separated)
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith("--restrictedDirs=")) {
    const value = a.slice("--restrictedDirs=".length);
    restrictedDirNames = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  } else if (a === "--restrictedDirs" || a === "--restricted") {
    const value = argv[i + 1];
    if (typeof value === "string") {
      restrictedDirNames = value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      i++;
    }
  }
}

const libraryRoot = path.resolve(baseDir, "app", "library");
const libraryRootPrefix = `${libraryRoot}${path.sep}`;
const restrictedDirRootsAbs = restrictedDirNames.map((dirName) =>
  path.resolve(libraryRoot, dirName)
);
const restrictedAliasRoots = restrictedDirNames.map(
  (dirName) => `@/library/${dirName}`
);

// Keep regex literals at top-level to satisfy Biome's `useTopLevelRegex`.
// Allow modules whose last path segment ends with "-browser"
// and optionally with ".ts" or ".tsx" in the specifier string.
//
// Additionally allow importing API error contracts (e.g. error / error-codes)
// from Client Components.
const REGEX_ALLOWED_CLIENT_MODULE_SPECIFIER =
  /(?:-browser|error|error-codes)(?:\.tsx?)?$/;
const REGEX_TS_EXT = /\.(ts|tsx)$/;
const REGEX_NEWLINE = /\r?\n/;
const REGEX_USE_CLIENT_DIRECTIVE = /^["']use client["']\s*;?$/;
const REGEX_TS_FILE = /\.(ts|tsx)$/;

const REGEX_IMPORT_SIDE_EFFECT = /^\s*import\s+["']([^"']+)["']\s*;?/gm;
const REGEX_IMPORT_FROM =
  /^\s*import\s+(?:type\s+)?[\s\S]+?\s+from\s+["']([^"']+)["']\s*;?/gm;
const REGEX_EXPORT_ALL_FROM =
  /^\s*export\s+\*\s+from\s+["']([^"']+)["']\s*;?/gm;
const REGEX_EXPORT_NAMED_FROM =
  /^\s*export\s*\{\s*[^}]*\s*\}\s*from\s+["']([^"']+)["']\s*;?/gm;

function isBrowserModuleSpecifier(specifier) {
  // Allowed module specifiers whose last path segment ends with "-browser"
  // and is optionally suffixed with `.ts` or `.tsx`.
  // Example: "@/library/db/main/client-browser"
  // Example: "@/library/db/main/client-browser.ts"
  return REGEX_ALLOWED_CLIENT_MODULE_SPECIFIER.test(specifier);
}

function isForbiddenAliasImport(specifier) {
  // In "use client" files:
  // - Any import under @/library/{restrictedDirs...} is only allowed when
  //   the imported module specifier ends with "-browser".
  for (const root of restrictedAliasRoots) {
    if (specifier === root || specifier.startsWith(`${root}/`)) {
      return !isBrowserModuleSpecifier(specifier);
    }
  }
  return false;
}

function isUnderAnyRoot(resolvedNoExt, rootsAbs) {
  for (const root of rootsAbs) {
    if (resolvedNoExt === root) {
      return true;
    }
    if (resolvedNoExt.startsWith(`${root}${path.sep}`)) {
      return true;
    }
  }
  return false;
}

function isForbiddenRelativeImport(filePath, specifier) {
  // Relative imports: resolve the specifier to an absolute path and then check
  // whether it lands under apps/app/library/{restrictedDirs...}.
  if (!(specifier.startsWith(".") || specifier.startsWith(".."))) {
    return false;
  }

  const resolved = path.resolve(path.dirname(filePath), specifier);
  const resolvedNoExt = resolved.replace(REGEX_TS_EXT, "");

  // Any import under these roots is only allowed when it ends with "-browser".
  if (isUnderAnyRoot(resolvedNoExt, restrictedDirRootsAbs)) {
    return !resolvedNoExt.endsWith("-browser");
  }

  return false;
}

function hasUseClientDirective(content) {
  // Pragmatic approach:
  // - directive must appear near the top; check first 30 lines for exact line.
  // - avoids heavy parsing; keeps the script small.
  const lines = content.split(REGEX_NEWLINE);
  for (let i = 0; i < Math.min(lines.length, 30); i++) {
    const t = lines[i].trim();
    if (!t) {
      continue;
    }
    if (REGEX_USE_CLIENT_DIRECTIVE.test(t)) {
      return true;
    }
    // Stop early when we hit something that isn't a directive/comment.
    if (!t.startsWith("//")) {
      break;
    }
  }
  return false;
}

function extractImportSpecifiers(content) {
  const specs = new Set();

  // import "module";
  for (const m of content.matchAll(REGEX_IMPORT_SIDE_EFFECT)) {
    specs.add(m[1]);
  }

  // import x from "module";
  // import type x from "module";
  for (const m of content.matchAll(REGEX_IMPORT_FROM)) {
    specs.add(m[1]);
  }

  // export * from "module";
  for (const m of content.matchAll(REGEX_EXPORT_ALL_FROM)) {
    specs.add(m[1]);
  }

  // export { a, b } from "module";
  for (const m of content.matchAll(REGEX_EXPORT_NAMED_FROM)) {
    specs.add(m[1]);
  }

  return [...specs];
}

async function walkTsFiles(dir) {
  /** @type {string[]} */
  const files = [];

  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules") {
      continue;
    }
    if (
      entry.name === ".next" ||
      entry.name === "dist" ||
      entry.name === "build"
    ) {
      continue;
    }
    if (entry.name.startsWith(".")) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkTsFiles(fullPath)));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }
    if (!REGEX_TS_FILE.test(entry.name)) {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function toPosix(p) {
  return p.split(path.sep).join("/");
}

const violationsByFile = new Map(); // file -> { specs: string[] }

async function main() {
  if (!(await stat(baseDir)).isDirectory()) {
    console.error(
      `[check-client-boundary] baseDir is not a directory: ${baseDir}`
    );
    process.exit(1);
  }

  const files = await walkTsFiles(baseDir);

  for (const file of files) {
    // Skip library internals. We only want to validate that app-level Client
    // components don't import restricted server-only modules.
    if (file.startsWith(libraryRootPrefix)) {
      continue;
    }

    const content = await readFile(file, "utf8");
    if (!hasUseClientDirective(content)) {
      continue;
    }

    const specs = extractImportSpecifiers(content);
    const forbidden = specs.filter((spec) => {
      if (isForbiddenAliasImport(spec)) {
        return true;
      }
      return isForbiddenRelativeImport(file, spec);
    });
    if (forbidden.length === 0) {
      continue;
    }

    const rel = toPosix(path.relative(process.cwd(), file));
    violationsByFile.set(rel, { specs: forbidden });
  }

  if (violationsByFile.size === 0) {
    console.log("[check-client-boundary] OK: no forbidden imports found.");
    return;
  }

  console.error(
    "[check-client-boundary] Found forbidden imports in Next.js Client Components:\n" +
      `${violationsByFile.size} file(s) violated the boundary.`
  );
  for (const [file, { specs }] of violationsByFile.entries()) {
    console.error(`\n- ${file}`);
    for (const spec of specs) {
      console.error(`  * forbidden import: ${spec}`);
    }
  }

  process.exitCode = 1;
}

await main();
