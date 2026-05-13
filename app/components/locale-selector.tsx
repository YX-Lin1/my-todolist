"use client";

import { Button } from "@surgeteam/design-system/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@surgeteam/design-system/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@surgeteam/i18n/navigation";
import { Globe } from "lucide-react";
import { useParams } from "next/navigation";
import {
  defaultLocale,
  locales,
  localesWithNames,
} from "@/config/locale/locales";

/**
 * Client component for selecting locale/language.
 * Icon + current language display, click to open dropdown options.
 * Uses navigation (usePathname, useRouter) for locale-aware routing.
 */
export function LocaleSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = (params.locale as string | undefined) ?? defaultLocale;

  const handleValueChange = (value: string) => {
    router.replace(pathname, { locale: value });
  };

  const currentLabel =
    localesWithNames[currentLocale as keyof typeof localesWithNames] ??
    currentLocale;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-8 shrink-0 gap-1.5 border-border bg-background/70 text-foreground shadow-none hover:bg-accent/70 hover:text-accent-foreground"
          size="sm"
          variant="outline"
        >
          <Globe aria-hidden className="size-4 shrink-0 text-primary" />
          <span className="max-w-[9rem] shrink-0 truncate sm:max-w-[11rem]">
            {currentLabel}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-border">
        <DropdownMenuRadioGroup
          onValueChange={handleValueChange}
          value={currentLocale}
        >
          {locales.map((locale) => (
            <DropdownMenuRadioItem key={locale} value={locale}>
              {localesWithNames[locale as keyof typeof localesWithNames] ??
                locale}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
