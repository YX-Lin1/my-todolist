"use client";

import { Button } from "@surgeteam/design-system/components/ui/button";
import { TrpcErrorPanel } from "@/app/components/trpc-error-panel";
import { TodoFormDialog } from "./_components/todo-form-dialog";
import { FilterBar } from "./_components/filter-bar";
import { TodoList } from "./_components/todo-list";
import { TodoStats } from "./_components/todo-stats";
import { useTodoPage } from "./_hooks/use-todo-page";
import { useI18n } from "@surgeteam/i18n/use-i18n";

export default function TodolistsPage() {
  const { t } = useI18n();
  const { errorLabels, searchValue, setSearchValue, items, filteredItems, doneCount, pendingCount, isLoading, isError, error, isMutating, dialogOpen, setDialogOpen, dialogMode, editingItem, openCreateDialog, openEditDialog, handleFormSubmit, handleToggleCompleted, onDeleteTodo, handleLogout } = useTodoPage();

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

        {isError ? (
          <div className="mb-4">
            <TrpcErrorPanel
              error={error}
              labels={errorLabels}
              t={t}
            />
          </div>
        ) : null}

        <FilterBar
          value={searchValue}
          disabled={isMutating || isError}
          onChange={setSearchValue}
          onAdd={openCreateDialog}
        />

        <TodoList
          items={filteredItems}
          isLoading={isLoading}
          isError={isError}
          disabled={isMutating}
          onToggleCompleted={handleToggleCompleted}
          onDelete={onDeleteTodo}
          onEdit={openEditDialog}
        />

        <TodoStats
          total={items.length}
          done={doneCount}
          pending={pendingCount}
        />
      </div>
    </>
  );
}
