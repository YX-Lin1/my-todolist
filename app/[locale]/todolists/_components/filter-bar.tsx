'use client'

import { Button } from "@surgeteam/design-system/components/ui/button";
import { Input } from "@surgeteam/design-system/components/ui/input";
import { useI18n } from "@surgeteam/i18n/use-i18n";
import { TodoStatus } from "../_hooks/use-todo-page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@surgeteam/design-system/components/ui/select";
export interface FilterBarProps {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onAdd: () => void;
  onStatusChange: (status: TodoStatus) => void;
  todoStatus: TodoStatus;
}

export function FilterBar({
  value,
  disabled = false,
  onChange,
  onAdd,
  onStatusChange,
  todoStatus,
}: FilterBarProps) {
  const { t } = useI18n();

  return (
    <div className="flex w-full flex-wrap items-center gap-[10px]">
      <Input
        className="h-10 min-w-0 flex-1 rounded-md p-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("todolists.searchPlaceholder")}
        type="text"
      />

      <Select
        value={todoStatus}
        onValueChange={onStatusChange}
      >
        <SelectTrigger className="h-10 w-[120px] shrink-0">
          <SelectValue placeholder={t("todolists.statusPlaceholder")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("todolists.statusAll")}</SelectItem>
          <SelectItem value="completed">
            {t("todolists.statusCompleted")}
          </SelectItem>
          <SelectItem value="pending">
            {t("todolists.statusPending")}
          </SelectItem>
        </SelectContent>
      </Select>

      <Button
        className="h-10 shrink-0 rounded bg-[#FFBB1E] px-4 text-base text-white hover:bg-[#e0a800]"
        type="button"
      >
        {t("todolists.search")}
      </Button>

      <Button
        className="h-10 shrink-0 rounded bg-[#4CAF50] px-4 text-base text-white hover:bg-[#45a049]"
        onClick={onAdd}
        disabled={disabled}
        type="button"
      >
        {t("todolists.add")}
      </Button>
    </div>
  );
}
