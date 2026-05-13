import "./styles.css";

import "@/library/i18n/register";
import { AnalyticsProvider } from "@surgeteam/analytics/provider";
import { DesignSystemProvider } from "@surgeteam/design-system";
import { getI18n } from "@surgeteam/i18n/get-i18n";
import { I18nProvider } from "@surgeteam/i18n/provider";
import { validateLocale } from "@surgeteam/i18n/validate-locale";
import { getNonce } from "@surgeteam/security/nonce";
import { createMetadata } from "@surgeteam/seo/metadata";
import type { Metadata } from "next";
import { ReactQueryProvider } from "@/library/react-query/provider";

import { PageShell } from "@/app/components/page-shell";
import { TRPCProvider } from "@/library/trpc/provider";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  const siteTitle = t("seo.site.title");
  return createMetadata({
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: t("seo.site.description"),
  });
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  validateLocale(locale);
  const nonce = await getNonce();

  return (
    <html data-scroll-behavior="smooth" lang={locale} suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <DesignSystemProvider forcedTheme="dark" nonce={nonce ?? undefined}>
          <I18nProvider>
            <AnalyticsProvider
              customOptions={{ googleAnalytics: { nonce: nonce ?? undefined } }}
            >
              <ReactQueryProvider>
                <TRPCProvider>
                  <PageShell>{children}</PageShell>
                </TRPCProvider>
              </ReactQueryProvider>
            </AnalyticsProvider>
          </I18nProvider>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
