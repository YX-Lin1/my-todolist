"use client";

import { Button } from "@surgeteam/design-system/components/ui/button";
import { useI18n } from "@surgeteam/i18n/use-i18n";
import { useMemo, useState } from "react";
import { parseTrpcError, TrpcErrorPanel } from "@/app/components/trpc-error-panel";
import { trpc } from "@/library/trpc/client";
import { useRouter } from "@surgeteam/i18n/navigation";
import { toast } from "sonner";
import { translateServiceErrorCode } from "@/library/i18n/translate-service-error-code";
import { TodoFormDialog, TodoFormValues} from "./_components/todo-form-dialog";
import { FilterBar } from "./_components/filter-bar";
import { TodoList } from "./_components/todo-list";

type TodoItem = {
  id: string;
  todo: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  deadline: Date | null;
};

export default function TodolistsPage() {
  const { t } = useI18n();
  const utils = trpc.useUtils();
  const router = useRouter();

  // 进页自动拉列表；用户身份在服务端 ctx.userId
  const listQuery = trpc.todolists.list.useQuery({});
  const [searchValue, setSearchValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editingItem, setEditingItem] = useState<TodoItem | null>(null);

  const toastTrpcError = (error: unknown) => {
    const { code } = parseTrpcError(error);
    toast.error(translateServiceErrorCode(t, code));
  };

  const createMutation = trpc.todolists.create.useMutation({
    onSuccess: async () => {
      await utils.todolists.list.invalidate();
      setDialogOpen(false);
      toast.success(t("todolists.createSuccess"));
    },
    onError:toastTrpcError,
  });

  const updateMutation = trpc.todolists.update.useMutation({
    onSuccess: async () => {
      await utils.todolists.list.invalidate();
      setDialogOpen(false);
      setEditingItem(null);
      toast.success(t("todolists.updateSuccess"));
    },
    onError:toastTrpcError,
  });

  const deleteMutation = trpc.todolists.delete.useMutation({
    onSuccess: () => {
      utils.todolists.list.invalidate();
      toast.success(t("todolists.deleteSuccess"));
    },
    onError:toastTrpcError,
  });

  const logoutMutation = trpc.login.logout.useMutation({
    onSuccess: () => {
      router.push("/");
    },
    onError:toastTrpcError,
  });

  // Service 返回 { data: TodoItem[] }
  // 第一个data是接口返回的data，第二个data是后端TodolistsListResponseSchema约定的data
  // ?? []：如果listQuery.data为空，则返回空数组
  const items: TodoItem[] = listQuery.data?.data ?? [];

  const filteredItems = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter((item) => item.todo.toLowerCase().includes(keyword));
  }, [items, searchValue]);
  // 只有items或searchValue变化时，才重新计算filteredItems

  const doneCount = items.filter((item) => item.completed).length;
  const pendingCount = items.length - doneCount;

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const openCreateDialog = () => {
    setDialogOpen(true);
    setDialogMode("create");
    setEditingItem(null);
  };

  const openEditDialog = (item: TodoItem) => {
    setDialogOpen(true);
    setDialogMode("edit");
    setEditingItem(item);
  };

  const handleToggleCompleted = (item: TodoItem) => {
    updateMutation.mutate({
      data: {
        id: item.id,
        todo: item.todo,
        completed: !item.completed,
        priority: item.priority,
        deadline: item.deadline,
      },
    });
  };

  const onDeleteTodo = (item: TodoItem) => {
    deleteMutation.mutate({ data: { id: item.id } });
  };

  const handleFormSubmit = (values: TodoFormValues) => {
    if (dialogMode === "create") {
      createMutation.mutate({
        data: {
          todo: values.todo,
          priority: values.priority,
          deadline: values.deadline ?? null,
          completed: false,
        },
      });
      return;
    }

    if (!editingItem) return;

    updateMutation.mutate({
      data: {
        id: editingItem.id,
        todo: values.todo,
        priority: values.priority,
        deadline: values.deadline ?? null,
        completed: values.completed,
      },
    });
  };

  const errorLabels = {
    title: t("todolists.errorTitle"),
    hint: t("todolists.errorHint"),
    detailsLabel: t("todolists.errorDetailsLabel"),
  };

  const handleLogout = async () => {
    logoutMutation.mutate();
  }

  return (
    <>
      <TodoFormDialog
        open={dialogOpen}
        mode={dialogMode}
        initialValues={
          dialogMode === "edit" && editingItem
            ? {
                todo: editingItem.todo,
                priority: editingItem.priority,
                deadline: editingItem.deadline
                  ? new Date(editingItem.deadline)
                  : undefined,
                completed: editingItem.completed,
              }
            : undefined
        }
        onOpenChange={setDialogOpen}
        onSubmit={handleFormSubmit}
      />
      <div className="sticky top-0 z-100 flex items-center justify-between bg-gradient-to-br from-[#FFE100B5] to-[#FFBF5FAF] px-[30px] py-4 text-white shadow-md">
        <h1 className="font-bold text-2xl">{t("todolists.title")}</h1>
        <Button className="bg-white/20 border border-white/30 text-white px-[17px] py-[8px] rounded-6 cursor-pointer text-base font-medium transition-all duration-300 hover:bg-white/50"
         onClick={handleLogout}>{t("todolists.logout")}</Button>
      </div>

      <div className="relative rounded-[12px] bg-[#fff3e0] pt-[20px] pr-[20px] pb-[35px] pl-[20px]">
        <p className="mb-[20px] font-bold text-[16px]">{t("todolists.listTitle")}</p>

        {listQuery.isError ? (
          <div className="mb-4">
            <TrpcErrorPanel
              error={listQuery.error}
              labels={errorLabels}
              t={t}
            />
          </div>
        ) : null}

        <FilterBar
          value={searchValue}
          disabled={isMutating || listQuery.isError}
          onChange={setSearchValue}
          onAdd={openCreateDialog}
        />

        <TodoList
          items={filteredItems}
          isLoading={listQuery.isLoading}
          isError={listQuery.isError}
          disabled={isMutating}
          onToggleCompleted={handleToggleCompleted}
          onDelete={onDeleteTodo}
          onEdit={openEditDialog}
        />

        {!listQuery.isError ? (
          <div className="absolute right-[20px] bottom-[5px] text-right text-[#666] text-[14px]">
            <p>
              {t("todolists.stats", {
                total: String(items.length),
                done: String(doneCount),
                pending: String(pendingCount),
              })}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
