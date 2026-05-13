import { getI18n } from "@surgeteam/i18n/get-i18n";
import { createMetadata } from "@surgeteam/seo/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return createMetadata({
    title: t("seo.analytics.title"),
    description: t("seo.analytics.description"),
  });
}

export default async function AnalyticsOverviewPage() {
  const { t } = await getI18n();
  const storybookUrl = process.env.NEXT_PUBLIC_STORYBOOK_URL;
  const storybookDocsUrl = storybookUrl
    ? `${storybookUrl.endsWith("/") ? storybookUrl.slice(0, -1) : storybookUrl}/?path=/docs/analytics-introduction`
    : null;

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl text-slate-300">
        <header className="border-white/10 border-b pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-bold text-4xl text-white tracking-tight">
              {t("analytics.introduction.title")}
            </h1>
            {storybookDocsUrl ? (
              <a
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-900 px-4 py-2 font-medium text-[#7cc0ff] transition-colors hover:border-white/20 hover:bg-slate-800 hover:text-[#a5d6ff]"
                href={storybookDocsUrl}
                rel="noreferrer"
                target="_blank"
              >
                {t("analytics.introduction.docCta")}
              </a>
            ) : null}
          </div>
          <p className="mt-3 text-slate-400 leading-7">
            {t("analytics.introduction.lead")}
          </p>
        </header>

        <section className="space-y-4 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("analytics.introduction.sections.features.title")}
          </h2>
          <ul className="space-y-2 leading-7">
            <li>
              {t("analytics.introduction.sections.features.items.pluggable")}
            </li>
            <li>
              {t(
                "analytics.introduction.sections.features.items.openInterface"
              )}
            </li>
            <li>
              {t("analytics.introduction.sections.features.items.cspNonce")}
            </li>
            <li>
              {t(
                "analytics.introduction.sections.features.items.securityHeaders"
              )}
            </li>
            <li>
              {t("analytics.introduction.sections.features.items.nextConfig")}
            </li>
            <li>
              {t(
                "analytics.introduction.sections.features.items.instrumentation"
              )}
            </li>
            <li>
              {t(
                "analytics.introduction.sections.features.items.codeSplitting"
              )}
            </li>
          </ul>
        </section>

        <section className="space-y-6 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("analytics.introduction.sections.concepts.title")}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white text-xl">
                {t(
                  "analytics.introduction.sections.concepts.items.adapterArchitecture.title"
                )}
              </h3>
              <p className="mt-2 text-slate-400 leading-7">
                {t(
                  "analytics.introduction.sections.concepts.items.adapterArchitecture.desc"
                )}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white text-xl">
                {t(
                  "analytics.introduction.sections.concepts.items.envToggle.title"
                )}
              </h3>
              <p className="mt-2 text-slate-400 leading-7">
                {t(
                  "analytics.introduction.sections.concepts.items.envToggle.desc"
                )}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white text-xl">
                {t(
                  "analytics.introduction.sections.concepts.items.cspNonce.title"
                )}
              </h3>
              <p className="mt-2 text-slate-400 leading-7">
                {t(
                  "analytics.introduction.sections.concepts.items.cspNonce.desc"
                )}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white text-xl">
                {t(
                  "analytics.introduction.sections.concepts.items.securityOptions.title"
                )}
              </h3>
              <p className="mt-2 text-slate-400 leading-7">
                {t(
                  "analytics.introduction.sections.concepts.items.securityOptions.desc"
                )}
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
