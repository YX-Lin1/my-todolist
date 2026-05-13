import { getI18n } from "@surgeteam/i18n/get-i18n";
import { Link } from "@surgeteam/i18n/navigation";
import { createMetadata } from "@surgeteam/seo/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return createMetadata({
    title: t("seo.services.title"),
    description: t("seo.services.description"),
  });
}

export default async function ServicesOverviewPage() {
  const { t } = await getI18n();
  const storybookUrl = process.env.NEXT_PUBLIC_STORYBOOK_URL;
  const storybookDocsUrl = storybookUrl
    ? `${storybookUrl.endsWith("/") ? storybookUrl.slice(0, -1) : storybookUrl}/?path=/docs/service-introduction`
    : null;

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl text-slate-300">
        <header className="border-white/10 border-b pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-bold text-4xl text-white tracking-tight">
              {t("services.introduction.title")}
            </h1>
            {storybookDocsUrl ? (
              <a
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-900 px-4 py-2 font-medium text-[#7cc0ff] transition-colors hover:border-white/20 hover:bg-slate-800 hover:text-[#a5d6ff]"
                href={storybookDocsUrl}
                rel="noreferrer"
                target="_blank"
              >
                {t("services.introduction.docCta")}
              </a>
            ) : null}
          </div>
          <p className="mt-3 text-slate-400 leading-7">
            {t("services.introduction.lead")}
          </p>
        </header>

        <section className="space-y-4 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("services.introduction.sections.keyPoints.title")}
          </h2>
          <ul className="space-y-2 leading-7">
            <li>
              <span className="font-medium text-white">
                {t(
                  "services.introduction.sections.keyPoints.items.servicesIsCore.label"
                )}
              </span>
              ：
              {t(
                "services.introduction.sections.keyPoints.items.servicesIsCore.desc"
              )}
            </li>
            <li>
              <span className="font-medium text-white">
                {t(
                  "services.introduction.sections.keyPoints.items.dataSourcesInfra.label"
                )}
              </span>
              ：
              {t(
                "services.introduction.sections.keyPoints.items.dataSourcesInfra.desc"
              )}
            </li>
            <li>
              <span className="font-medium text-white">
                {t(
                  "services.introduction.sections.keyPoints.items.diIsBackbone.label"
                )}
              </span>
              ：
              {t(
                "services.introduction.sections.keyPoints.items.diIsBackbone.descPrefix"
              )}{" "}
              <code className="rounded-md bg-white/5 px-1.5 py-0.5 text-slate-200">
                container.services.*
              </code>
            </li>
            <li>
              <span className="font-medium text-white">
                {t(
                  "services.introduction.sections.keyPoints.items.contractFirst.label"
                )}
              </span>
              ：
              {t(
                "services.introduction.sections.keyPoints.items.contractFirst.desc"
              )}
            </li>
          </ul>
        </section>

        <section className="space-y-6 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("services.introduction.sections.layering.title")}
          </h2>
          <p className="text-slate-400 leading-7">
            {t("services.introduction.sections.layering.lead")}
          </p>
          <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200 text-sm leading-6">
            <code>{t("services.introduction.sections.layering.code")}</code>
          </pre>
        </section>

        <section className="space-y-6 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("services.introduction.sections.responsibilities.title")}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white text-xl">
                {t(
                  "services.introduction.sections.responsibilities.servicesTitle"
                )}
              </h3>
              <ul className="mt-2 space-y-2 leading-7">
                <li>
                  <span className="font-medium text-white">
                    {t(
                      "services.introduction.sections.responsibilities.servicesItems.orchestration.label"
                    )}
                  </span>
                  ：
                  {t(
                    "services.introduction.sections.responsibilities.servicesItems.orchestration.desc"
                  )}
                </li>
                <li>
                  <span className="font-medium text-white">
                    {t(
                      "services.introduction.sections.responsibilities.servicesItems.contract.label"
                    )}
                  </span>
                  ：
                  {t(
                    "services.introduction.sections.responsibilities.servicesItems.contract.desc"
                  )}
                </li>
                <li>
                  <span className="font-medium text-white">
                    {t(
                      "services.introduction.sections.responsibilities.servicesItems.mapping.label"
                    )}
                  </span>
                  ：
                  {t(
                    "services.introduction.sections.responsibilities.servicesItems.mapping.desc"
                  )}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white text-xl">
                {t(
                  "services.introduction.sections.responsibilities.dataSourcesTitle"
                )}
              </h3>
              <ul className="mt-2 space-y-2 leading-7">
                <li>
                  <span className="font-medium text-white">
                    {t(
                      "services.introduction.sections.responsibilities.dataSourcesItems.singleSourceClosure.label"
                    )}
                  </span>
                  ：
                  {t(
                    "services.introduction.sections.responsibilities.dataSourcesItems.singleSourceClosure.desc"
                  )}
                </li>
                <li>
                  <span className="font-medium text-white">
                    {t(
                      "services.introduction.sections.responsibilities.dataSourcesItems.configIsolation.label"
                    )}
                  </span>
                  ：
                  {t(
                    "services.introduction.sections.responsibilities.dataSourcesItems.configIsolation.desc"
                  )}
                </li>
                <li>
                  <span className="font-medium text-white">
                    {t(
                      "services.introduction.sections.responsibilities.dataSourcesItems.replaceable.label"
                    )}
                  </span>
                  ：
                  {t(
                    "services.introduction.sections.responsibilities.dataSourcesItems.replaceable.desc"
                  )}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("services.introduction.sections.forbidden.title")}
          </h2>
          <ul className="space-y-2 leading-7">
            <li>
              {t(
                "services.introduction.sections.forbidden.items.noDirectInfraFromEntrypoint"
              )}
            </li>
            <li>
              {t(
                "services.introduction.sections.forbidden.items.noNewClientInServices"
              )}
            </li>
            <li>
              {t(
                "services.introduction.sections.forbidden.items.noCrossDataSource"
              )}
            </li>
          </ul>
        </section>

        <section className="space-y-4 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("services.introduction.sections.deliverables.title")}
          </h2>
          <p className="text-slate-400 leading-7">
            {t("services.introduction.sections.deliverables.lead")}
          </p>
          <ul className="space-y-2 leading-7">
            <li>
              {t(
                "services.introduction.sections.deliverables.items.stableEntry"
              )}
            </li>
            <li>
              {t(
                "services.introduction.sections.deliverables.items.fileContract"
              )}
            </li>
            <li>
              {t(
                "services.introduction.sections.deliverables.items.diRegistrations"
              )}
            </li>
          </ul>
        </section>

        <section className="space-y-4 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("services.introduction.sections.whenToAdd.title")}
          </h2>
          <p className="text-slate-400 leading-7">
            {t("services.introduction.sections.whenToAdd.lead")}
          </p>
          <ul className="space-y-2 leading-7">
            <li>
              {t(
                "services.introduction.sections.whenToAdd.items.forRscOrActions"
              )}
            </li>
            <li>
              {t("services.introduction.sections.whenToAdd.items.forTrpc")}
            </li>
            <li>
              {t("services.introduction.sections.whenToAdd.items.forTests")}
            </li>
          </ul>
        </section>

        <section className="space-y-4 py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("services.introduction.sections.tryDemos.title")}
          </h2>
          <p className="text-slate-400 leading-7">
            {t("services.introduction.sections.tryDemos.description")}
          </p>
          <ul className="space-y-4">
            <li>
              <Link
                className="font-medium text-[#7cc0ff] text-lg transition-colors hover:text-[#a5d6ff]"
                href="/services/users"
              >
                {t("services.pages.users")} →
              </Link>
              <p className="mt-1 text-slate-400 leading-7">
                {t("services.users.lead")}
              </p>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
