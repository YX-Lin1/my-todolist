import { getI18n } from "@surgeteam/i18n/get-i18n";
import { createMetadata } from "@surgeteam/seo/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return createMetadata({
    title: t("seo.di.title"),
    description: t("seo.di.description"),
  });
}

export default async function DiOverviewPage() {
  const { t } = await getI18n();
  const storybookUrl = process.env.NEXT_PUBLIC_STORYBOOK_URL;
  const storybookDocsUrl = storybookUrl
    ? `${storybookUrl.endsWith("/") ? storybookUrl.slice(0, -1) : storybookUrl}/?path=/docs/di-introduction`
    : null;

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl text-slate-300">
        <header className="border-white/10 border-b pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-bold text-4xl text-white tracking-tight">
              {t("di.introduction.title")}
            </h1>
            {storybookDocsUrl ? (
              <a
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-900 px-4 py-2 font-medium text-[#7cc0ff] transition-colors hover:border-white/20 hover:bg-slate-800 hover:text-[#a5d6ff]"
                href={storybookDocsUrl}
                rel="noreferrer"
                target="_blank"
              >
                查看完整文档 →
              </a>
            ) : null}
          </div>
          <p className="mt-3 text-slate-400 leading-7">
            {t.rich("di.introduction.description", {
              token: (chunks) => (
                <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                  {chunks}
                </code>
              ),
              defineResources: (chunks) => (
                <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                  {chunks}
                </code>
              ),
              createContainer: (chunks) => (
                <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                  {chunks}
                </code>
              ),
            })}
          </p>
        </header>

        <section className="space-y-4 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("di.introduction.featuresTitle")}
          </h2>
          <ul className="space-y-2 leading-7">
            <li>
              {t.rich("di.introduction.features.typeSafe", {
                code: (chunks) => (
                  <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                    {chunks}
                  </code>
                ),
                lt: () => <>&lt;</>,
                gt: () => <>&gt;</>,
              })}
            </li>
            <li>
              {t.rich("di.introduction.features.resourceGraph", {
                code: (chunks) => (
                  <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                    {chunks}
                  </code>
                ),
                lbrace: () => <>{"{"}</>,
                rbrace: () => <>{"}"}</>,
              })}
            </li>
            <li>{t("di.introduction.features.lifetimes")}</li>
            <li>
              {t.rich("di.introduction.features.testing", {
                code: (chunks) => (
                  <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                    {chunks}
                  </code>
                ),
              })}
            </li>
            <li>{t("di.introduction.features.cycleDetect")}</li>
          </ul>
        </section>

        <section className="space-y-6 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("di.introduction.conceptsTitle")}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white text-xl">
                {t("di.introduction.tokenTitle")}
              </h3>
              <p className="mt-2 leading-8">
                {t.rich("di.introduction.tokenDescription", {
                  code: (chunks) => (
                    <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                      {chunks}
                    </code>
                  ),
                  lt: () => <>&lt;</>,
                  gt: () => <>&gt;</>,
                })}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white text-xl">
                {t("di.introduction.registryTitle")}
              </h3>
              <ul className="mt-2 space-y-2 leading-7">
                <li>
                  {t.rich("di.introduction.registryItems.manager", {
                    code: (chunks) => (
                      <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                        {chunks}
                      </code>
                    ),
                  })}
                </li>
                <li>
                  {t.rich("di.introduction.registryItems.resolver", {
                    code: (chunks) => (
                      <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                        {chunks}
                      </code>
                    ),
                  })}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white text-xl">
                {t("di.introduction.resolverTitle")}
              </h3>
              <p className="mt-2 leading-8">
                {t("di.introduction.resolverIntro")}
              </p>
              <ul className="mt-2 space-y-2 leading-7">
                <li>{t("di.introduction.resolverItems.process")}</li>
                <li>{t("di.introduction.resolverItems.request")}</li>
              </ul>
              <p className="mt-4 text-slate-400 leading-7">
                {t("di.introduction.resolverSummary")}
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
