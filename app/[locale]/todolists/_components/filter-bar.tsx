'use client'

import { Button } from "@surgeteam/design-system/components/ui/button";
import { Input } from "@surgeteam/design-system/components/ui/input";
import { useI18n } from "@surgeteam/i18n/use-i18n";

export interface FilterBarProps {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export function FilterBar({
  value,
  disabled = false,
  onChange,
  onAdd,
}: FilterBarProps) {
  const { t } = useI18n();

  return (
    <>
    <div className="flex gap-[10px]">
      <Input
        className="mb-2 h-10 flex-1 rounded-md p-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("todolists.searchPlaceholder")}
        type="text"
      />

      <Button
        className="rounded bg-[#FFBB1E] px-4 py-2 text-base text-white hover:bg-[#e0a800]"
        size="lg"
        type="button"
      >
        {t("todolists.search")}
      </Button>
    </div>

    <Button
        onClick={onAdd}
        disabled={disabled}
        size="lg"
        type="button"
      >
        {t("todolists.add")}
      </Button>
    </>
  );
}