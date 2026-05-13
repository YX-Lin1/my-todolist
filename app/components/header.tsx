"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@surgeteam/design-system/components/ui/navigation-menu";
import { Link, usePathname } from "@surgeteam/i18n/navigation";
import { useI18n } from "@surgeteam/i18n/use-i18n";

import { BrandMark } from "./brand-mark";
import { LocaleSelector } from "./locale-selector";
import { TimezoneSelector } from "./timezone-selector";

const TRAILING_SLASH_PATTERN = /\/+$/;
const LOCALE_PREFIX_PATTERN = /^\/(en|ja|zh)(?=\/|$)/;
const MAX_VISIBLE_NAV_ITEMS = 5;

/**
 * Enterprise-style header: sticky dark bar, logo, nav, CTA, locale/timezone.
 */
export function Header() {
  const pathname = usePathname();
  const { t } = useI18n();

  const storybookUrl = process.env.NEXT_PUBLIC_STORYBOOK_URL;

  const navItems: {
    href: string;
    label: string;
    external?: boolean;
    demoLinks?: { href: string; label: string }[];
  }[] = [
    { href: "/", label: t("components.nav.home") },
    {
      href: "/security",
      label: t("components.nav.security"),
    },
    {
      href: "/observability",
      label: t("components.nav.observability"),
    },
    {
      href: "/analytics",
      label: t("components.nav.analytics"),
    },
    {
      href: "/services",
      label: t("components.nav.services"),
    },
    {
      href: "/di",
      label: t("components.nav.di"),
    },
    {
      href: "/i18n",
      label: t("components.nav.i18n"),
    },
    {
      href: "/http-client",
      label: t("components.nav.httpClient"),
    },
    {
      href: "/trpc",
      label: t("components.nav.trpc"),
    },
  ];
  const visibleNavItems = navItems.slice(0, MAX_VISIBLE_NAV_ITEMS);
  const overflowNavItems = navItems.slice(MAX_VISIBLE_NAV_ITEMS);

  const normalizePath = (path: string) => {
    const pathWithoutLocale = path.replace(LOCALE_PREFIX_PATTERN, "") || "/";
    if (pathWithoutLocale === "/") {
      return pathWithoutLocale;
    }
    return pathWithoutLocale.replace(TRAILING_SLASH_PATTERN, "");
  };

  const isItemActive = (href: string, external?: boolean) => {
    if (external) {
      return false;
    }
    const currentPath = normalizePath(pathname || "/");
    const targetPath = normalizePath(href);
    if (targetPath === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(targetPath);
  };

  const isSubItemActive = (href: string, parentHref: string) => {
    const currentPath = normalizePath(pathname || "/");
    const targetPath = normalizePath(href);
    const parentPath = normalizePath(parentHref);

    if (targetPath === parentPath) {
      return currentPath === targetPath;
    }

    return (
      currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)
    );
  };

  const renderNavItemWithDropdown = (item: (typeof navItems)[0]) => {
    const isActive = isItemActive(item.href, item.external);
    return (
      <NavigationMenuItem key={item.href}>
        <NavigationMenuTrigger
          className={`h-auto bg-transparent p-0 font-medium text-slate-400 text-sm transition-colors hover:bg-transparent hover:text-[#137fec] data-[state=open]:bg-transparent data-[state=open]:text-[#137fec] ${
            isActive ? "text-[#137fec]" : ""
          }`}
        >
          {item.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-56 p-2">
            {item.demoLinks?.map((demoLink) => {
              const isDemoActive = isSubItemActive(demoLink.href, item.href);
              return (
                <li key={demoLink.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        isDemoActive
                          ? "bg-[#137fec]/20 font-medium text-[#137fec]"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                      href={demoLink.href}
                    >
                      {demoLink.label}
                    </Link>
                  </NavigationMenuLink>
                </li>
              );
            })}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  };

  const renderNavItem = (item: (typeof navItems)[0]) => {
    const isActive = isItemActive(item.href, item.external);
    return (
      <NavigationMenuItem key={item.href}>
        <NavigationMenuLink active={isActive} asChild>
          {item.external ? (
            <a
              className={`font-medium text-slate-400 text-sm transition-colors hover:text-[#137fec] ${
                isActive ? "text-[#137fec]!" : ""
              }`}
              href={item.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {item.label}
            </a>
          ) : (
            <Link
              className={`font-medium text-slate-400 text-sm transition-colors hover:text-[#137fec] ${
                isActive ? "text-[#137fec]!" : ""
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          )}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  const hasOverflowActiveItem = overflowNavItems.some((item) =>
    isItemActive(item.href, item.external)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-white/5 border-b bg-[#0f172a]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <div className="flex min-w-0 items-center gap-6">
          <Link
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
            href="/"
          >
            <BrandMark className="size-8 text-[#D9EAFC]" />
            <span className="font-bold text-[#D9EAFC] text-xl tracking-tight">
              SURGE
            </span>
          </Link>
          <NavigationMenu
            className="hidden min-w-0 flex-1 md:flex"
            viewport={false}
          >
            <NavigationMenuList className="gap-4">
              {visibleNavItems.map((item) => {
                const hasDemoLinks =
                  item.demoLinks && item.demoLinks.length > 0;
                return hasDemoLinks
                  ? renderNavItemWithDropdown(item)
                  : renderNavItem(item);
              })}
              {overflowNavItems.length > 0 ? (
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`h-auto bg-transparent p-0 font-medium text-slate-400 text-sm transition-colors hover:bg-transparent hover:text-[#137fec] data-[state=open]:bg-transparent data-[state=open]:text-[#137fec] ${
                      hasOverflowActiveItem ? "text-[#137fec]" : ""
                    }`}
                  >
                    {t("components.nav.more")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-56 p-2">
                      {overflowNavItems.map((item) => {
                        const isActive = isItemActive(item.href, item.external);
                        if (item.external) {
                          return (
                            <li key={item.href}>
                              <NavigationMenuLink asChild>
                                <a
                                  className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                    isActive
                                      ? "bg-[#137fec]/20 font-medium text-[#137fec]"
                                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                                  }`}
                                  href={item.href}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  {item.label}
                                </a>
                              </NavigationMenuLink>
                            </li>
                          );
                        }

                        return (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                  isActive
                                    ? "bg-[#137fec]/20 font-medium text-[#137fec]"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                                href={item.href}
                              >
                                {item.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : null}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex shrink-0 items-center gap-6">
          <div className="flex items-center gap-2">
            <LocaleSelector />
            <TimezoneSelector />
          </div>
          {storybookUrl ? (
            <a
              className="rounded-lg bg-[#137fec] px-5 py-2 font-semibold text-sm text-white shadow-[#137fec]/20 shadow-lg transition-all hover:bg-[#137fec]/90"
              href={storybookUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("homepage.getStarted")}
            </a>
          ) : (
            <Link
              className="rounded-lg bg-[#137fec] px-5 py-2 font-semibold text-sm text-white shadow-[#137fec]/20 shadow-lg transition-all hover:bg-[#137fec]/90"
              href="/i18n"
            >
              {t("homepage.getStarted")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
