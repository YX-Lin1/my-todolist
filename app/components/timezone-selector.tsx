"use client";

import { Button } from "@surgeteam/design-system/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@surgeteam/design-system/components/ui/dropdown-menu";
import { getTimezoneConfig } from "@surgeteam/i18n/register-configs";
import { useI18n } from "@surgeteam/i18n/use-i18n";
import { Clock } from "lucide-react";
import { regions } from "@/config/timezone/regions";

const GMT_OFFSET_REGEX = /GMT([+-])(\d{1,2})(?::(\d{2}))?/;

type RegionConfig =
  | { timezones: string[] }
  | { subRegions: Record<string, { timezones: string[] }> };

function buildSubmenus(
  renderSubmenu: (
    regionKey: string,
    subRegionKey: string | null,
    timezones: string[]
  ) => React.ReactNode,
  regionsConfig: Record<string, RegionConfig>
): React.ReactNode[] {
  const submenus: React.ReactNode[] = [];
  for (const [regionKey, regionValue] of Object.entries(regionsConfig)) {
    if ("timezones" in regionValue) {
      const node = renderSubmenu(regionKey, null, regionValue.timezones);
      if (node) {
        submenus.push(node);
      }
    } else if ("subRegions" in regionValue) {
      for (const [subRegionKey, subRegion] of Object.entries(
        regionValue.subRegions
      )) {
        const node = renderSubmenu(
          regionKey,
          subRegionKey,
          subRegion.timezones
        );
        if (node) {
          submenus.push(node);
        }
      }
    }
  }
  return submenus;
}

/**
 * Format timezone as UTC+xx:xx (e.g., UTC+09:00, UTC-05:00)
 */
function formatUTCOffset(timeZone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(new Date());
    const tzPart = parts.find((p) => p.type === "timeZoneName");
    if (!tzPart) {
      return "UTC";
    }

    const value = tzPart.value;
    const match = value.match(GMT_OFFSET_REGEX);
    if (match) {
      const sign = match[1];
      const hours = match[2].padStart(2, "0");
      const mins = (match[3] ?? "00").padStart(2, "0");
      return `UTC${sign}${hours}:${mins}`;
    }
    return value.replace("GMT", "UTC");
  } catch {
    return "UTC";
  }
}

/**
 * Client component for selecting timezone.
 * Icon + current timezone display, click to open dropdown options.
 * Groups timezones by region. Updates the timezone cookie via setTimezoneCookie and reloads the page to apply changes.
 */
export function TimezoneSelector() {
  const { t, timeZone, setTimezoneCookie } = useI18n();
  const config = getTimezoneConfig();
  const whitelist = new Set(
    config.timezones.length > 0 ? config.timezones : []
  );

  const handleValueChange = (value: string) => {
    setTimezoneCookie(value);
    window.location.reload();
  };

  const currentLabel = formatUTCOffset(timeZone ?? "UTC");

  const renderSubmenu = (
    regionKey: string,
    subRegionKey: string | null,
    timezones: string[]
  ) => {
    const filtered =
      whitelist.size > 0
        ? timezones.filter((tz) => whitelist.has(tz))
        : timezones;
    if (filtered.length === 0) {
      return null;
    }

    const labelKey = subRegionKey ?? regionKey;
    const label = t(`timezones.regions.${labelKey}`);

    return (
      <DropdownMenuSub key={subRegionKey ?? regionKey}>
        <DropdownMenuSubTrigger className="text-foreground">
          {label || labelKey}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="max-h-[280px] overflow-y-auto border-border">
          {filtered.map((tz) => {
            const tzLabel = t(`timezones.${tz}`);
            return (
              <DropdownMenuRadioItem key={tz} value={tz}>
                {tzLabel || tz}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  };

  const submenus = buildSubmenus(renderSubmenu, regions);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-8 max-w-[min(100vw-8rem,14rem)] shrink-0 gap-1.5 border-border bg-background/70 text-foreground shadow-none hover:bg-accent/70 hover:text-accent-foreground sm:max-w-[16rem] lg:max-w-[18rem]"
          size="sm"
          variant="outline"
        >
          <Clock aria-hidden className="size-4 shrink-0 text-primary" />
          <span className="min-w-0 flex-1 truncate text-left">{currentLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-border">
        <DropdownMenuRadioGroup
          onValueChange={handleValueChange}
          value={timeZone}
        >
          {submenus}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
