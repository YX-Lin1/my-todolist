"use client";

import { useI18n } from "@surgeteam/i18n/use-i18n";
import { trpc } from "@/library/trpc/client";
import { useEffect, useState } from "react";
// 可选：Input、Button 等设计系统组件

export default function TodolistsPage() {
  const { t } = useI18n();
  const listQuery = trpc.todolists.list.useQuery({});

  if (listQuery.isLoading) {
    return <p>{t("todolists.loading")}</p>;
  }
  if (listQuery.isError) {
    // 阶段 2 未做时可简单显示 message
    return <p>{listQuery.error.message}</p>;
  }

  const items = listQuery.data?.data ?? [];

  return (
    <div>
      <h1>{t("todolists.title")}</h1>
      {items.length === 0 ? (
        <p>{t("todolists.empty")}</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.todo}</li>
          ))}
        </ul>
      )}
    </div>
  );
}