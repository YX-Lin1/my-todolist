import { getI18n } from "@surgeteam/i18n/get-i18n";
import { createMetadata } from "@surgeteam/seo/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return createMetadata({
    title: t("seo.todolists.title"),
    description: t("seo.todolists.description"),
  });
}

export default function TodolistLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
      <div className="flex flex-col min-h-screen">
          {children}
      </div>
  )
}