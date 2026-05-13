import { getI18n } from "@surgeteam/i18n/get-i18n";
import { createMetadata } from "@surgeteam/seo/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return createMetadata({
    title: t("seo.security.title"),
    description: t("seo.security.description"),
  });
}

export default async function SecurityOverviewPage() {
  const { t } = await getI18n();
  const storybookUrl = process.env.NEXT_PUBLIC_STORYBOOK_URL;
  const storybookDocsUrl = storybookUrl
    ? `${storybookUrl.endsWith("/") ? storybookUrl.slice(0, -1) : storybookUrl}/?path=/docs/security-introduction`
    : null;

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl text-slate-300">
        <header className="border-white/10 border-b pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-bold text-4xl text-white tracking-tight">
              {t("security.introduction.title")}
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
            {t.rich("security.introduction.description", {
              pkg: (chunks) => (
                <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                  {chunks}
                </code>
              ),
              nosecone: (chunks) => (
                <a
                  className="text-[#7cc0ff] underline decoration-[#7cc0ff]/50 underline-offset-2 hover:text-[#a5d6ff]"
                  href="https://github.com/nosecone/nosecone"
                  rel="noreferrer"
                  target="_blank"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </header>

        <section className="space-y-4 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("security.introduction.featuresTitle")}
          </h2>
          <ul className="space-y-2 leading-7">
            <li>{t("security.introduction.features.headers")}</li>
            <li>
              {t.rich("security.introduction.features.nonce", {
                code: (chunks) => (
                  <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                    {chunks}
                  </code>
                ),
              })}
            </li>
            <li>
              {t.rich("security.introduction.features.defaults", {
                code: (chunks) => (
                  <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                    {chunks}
                  </code>
                ),
              })}
            </li>
            <li>
              {t.rich("security.introduction.features.merge", {
                code: (chunks) => (
                  <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                    {chunks}
                  </code>
                ),
              })}
            </li>
            <li>
              {t.rich("security.introduction.features.middleware", {
                code: (chunks) => (
                  <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                    {chunks}
                  </code>
                ),
              })}
            </li>
            <li>
              {t.rich("security.introduction.features.types", {
                code: (chunks) => (
                  <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                    {chunks}
                  </code>
                ),
              })}
            </li>
          </ul>
        </section>

        <section className="space-y-6 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("security.introduction.conceptsTitle")}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white text-xl">
                {t("security.introduction.tradeoffsTitle")}
              </h3>
              <p className="mt-2 leading-8">
                {t("security.introduction.tradeoffsDescription")}
              </p>
              <ul className="mt-2 space-y-2 leading-7">
                <li>{t("security.introduction.tradeoffsItems.appCollect")}</li>
                <li>
                  {t("security.introduction.tradeoffsItems.otherPkgDeclare")}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white text-xl">
                {t("security.introduction.noseconeTitle")}
              </h3>
              <p className="mt-2 leading-8">
                {t.rich("security.introduction.noseconeDescription", {
                  code: (chunks) => (
                    <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                      {chunks}
                    </code>
                  ),
                })}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white text-xl">
                {t("security.introduction.mergeTitle")}
              </h3>
              <p className="mt-2 leading-8">
                {t.rich("security.introduction.mergeDescription", {
                  code: (chunks) => (
                    <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                      {chunks}
                    </code>
                  ),
                })}
              </p>
              <ul className="mt-2 space-y-2 leading-7">
                <li>{t("security.introduction.mergeItems.csp")}</li>
                <li>{t("security.introduction.mergeItems.policies")}</li>
                <li>{t("security.introduction.mergeItems.hsts")}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white text-xl">
                {t("security.introduction.nonceTitle")}
              </h3>
              <p className="mt-2 leading-8">
                {t.rich("security.introduction.nonceDescription", {
                  code: (chunks) => (
                    <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                      {chunks}
                    </code>
                  ),
                })}
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
