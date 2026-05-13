import { getI18n } from "@surgeteam/i18n/get-i18n";
import { createMetadata } from "@surgeteam/seo/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return createMetadata({
    title: t("seo.httpClientUsers.title"),
    description: t("seo.httpClientUsers.description"),
  });
}

export default function HttpClientUsersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
