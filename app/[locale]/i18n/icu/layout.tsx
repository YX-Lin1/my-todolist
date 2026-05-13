import { getI18n } from "@surgeteam/i18n/get-i18n";
import { createMetadata } from "@surgeteam/seo/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return createMetadata({
    title: t("seo.i18nIcu.title"),
    description: t("seo.i18nIcu.description"),
  });
}

export default function I18nIcuLayout({ children }: { children: ReactNode }) {
  return children;
}
