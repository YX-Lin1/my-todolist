import { getI18n } from "@surgeteam/i18n/get-i18n";
import { createMetadata } from "@surgeteam/seo/metadata";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return createMetadata({
    title: t("seo.todolists.title"),
    description: t("seo.todolists.description"),
  });
}

export default async function TodolistLayout({
  children,
}: {
  children: ReactNode
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("MY-TOKEN")?.value;
  if(!token) {
    redirect("/login");
  }
  return (
      <div className="flex flex-col min-h-screen">
          {children}
      </div>
  )
}