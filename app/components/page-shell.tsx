"use client";

import { LocaleSelector } from "@/app/components/locale-selector";
import { TimezoneSelector } from "@/app/components/timezone-selector";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <header className="sticky top-0 z-50 border-border border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-center justify-end gap-1 px-3 py-2.5 sm:gap-2 sm:px-4 sm:py-3">
          <LocaleSelector />
          <TimezoneSelector />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
