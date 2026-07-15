"use client";
import { useState, useMemo } from "react";
import { trpc } from "@/library/trpc/client";
import { useRouter } from "@surgeteam/i18n/navigation";
import { parseTrpcError } from "@/app/components/trpc-error-panel";
import { toast } from "sonner";
import { translateServiceErrorCode } from "@/library/i18n/translate-service-error-code";
import { TodoFormValues } from "../_components/todo-form-dialog";
import { useI18n } from "@surgeteam/i18n/use-i18n";

type TodoItem = {
  id: string;
  todo: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  deadline: Date | null;
};

export function useTodoPage() {
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

  return {
    errorLabels,
    // 列表与筛选
    searchValue,
    setSearchValue,
    items,
    filteredItems,
    doneCount,
    pendingCount,
    // query 状态
    isLoading: listQuery.isLoading,
    isError: listQuery.isError,
    error: listQuery.error,
    isMutating,
    // 弹窗
    dialogOpen,
    setDialogOpen,
    dialogMode,
    editingItem,
    openCreateDialog,
    openEditDialog,
    handleFormSubmit,
    // 列表操作
    handleToggleCompleted,
    onDeleteTodo,
    handleLogout,
  };
}