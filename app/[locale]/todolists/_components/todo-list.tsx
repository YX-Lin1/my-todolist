'use client'
import { Button } from "@surgeteam/design-system/components/ui/button";
import { useI18n } from "@surgeteam/i18n/use-i18n";

type TodoItem = {
  id: string;
  todo: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  deadline: Date | null;
}

export interface TodoListProps {
  items: TodoItem[];
  isLoading: boolean;
  isError: boolean;
  disabled?: boolean;
  onToggleCompleted: (item: TodoItem) => void;
  onDelete: (item: TodoItem) => void;
  onEdit: (item: TodoItem) => void;
}

export function TodoList({
  items,
  isLoading,
  isError,
  disabled = false,
  onToggleCompleted,
  onDelete,
  onEdit,
}: TodoListProps) {
  const { t } = useI18n();

  const priorityLabel = {
    high: t("todolists.priorityHigh"),
    medium: t("todolists.priorityMedium"),
    low: t("todolists.priorityLow"),
  } as const;

  return (
    <>
    {isLoading ? (
      <p className="my-[20px] text-center text-[#666] text-[16px]">
        {t("todolists.loading")}
      </p>
    ) : null}

    {isError ? (
      <p className="absolute right-[20px] bottom-[5px] text-right text-[#666] text-[14px]">
        {t("todolists.error")}
      </p>
    ) : null}

    {!isLoading && !isError && items.length === 0 ? (
      <p className="my-[20px] text-center text-[#666] text-[16px]">
        {t("todolists.empty")}
      </p>
    ) : null}

    {items.length > 0 ? (
      <div>
        {items.map((item) => (
          <div
            className={`mb-[10px] flex items-center justify-between p-[5px] ${
              item.completed ? "bg-[#f0f0f0]" : "bg-white"
            }`}
            key={item.id}
          >
            <input
              checked={item.completed}
              className="h-[20px] w-[20px] cursor-pointer"
              disabled={disabled}
              onChange={() => onToggleCompleted(item)}
              type="checkbox"
            />
            <span className={`text-base ${
              item.completed
                ? "text-[#666666] line-through"
                : "text-[#000000]"
            }`}>{item.todo}</span>
            <span className="text-[#666] text-[12px]">{priorityLabel[item.priority]}</span>
            <span className="text-[#666] text-[12px]">{item.deadline ? new Date(item.deadline).toLocaleDateString() : ""}</span>
            <div className="flex items-center gap-2">
              <Button
                className="rounded bg-[#f44336] px-4 py-2 text-base text-white hover:bg-[#e53935]"
                disabled={disabled}
                onClick={() => onDelete(item)}
                size="lg"
                type="button"
              >
                {t("todolists.delete")}
              </Button>
              <Button
                className="rounded bg-[#007bff] px-4 py-2 text-base text-white hover:bg-[#0056b3]"
                disabled={disabled}
                onClick={() => onEdit(item)}
                size="lg"
                type="button"
              >
                {t("todolists.edit")}
              </Button>
            </div>
          </div>
        ))}
        </div>
    ) : null}
    </>
  );
}