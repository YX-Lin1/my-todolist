import { Link } from "@surgeteam/i18n/navigation";
import { useI18n } from "@surgeteam/i18n/use-i18n";

export default function I18nOverviewPage() {
  const { t } = useI18n();
  const storybookUrl = process.env.NEXT_PUBLIC_STORYBOOK_URL;
  const storybookDocsUrl = storybookUrl
    ? `${storybookUrl.endsWith("/") ? storybookUrl.slice(0, -1) : storybookUrl}/?path=/docs/i18n-introduction`
    : null;

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl text-slate-300">
        <header className="border-white/10 border-b pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-bold text-4xl text-white tracking-tight">
              {t("i18n.introduction.title")}
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
            {t.rich("i18n.introduction.description", {
              link: (chunks) => (
                <a
                  className="text-[#7cc0ff] underline decoration-[#7cc0ff]/50 underline-offset-2 hover:text-[#a5d6ff]"
                  href="https://next-intl-docs.vercel.app/"
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
            {t("i18n.introduction.featuresTitle")}
          </h2>
          <ul className="space-y-2 leading-7">
            <li>{t("i18n.introduction.features.nextIntlWrap")}</li>
            <li>{t("i18n.introduction.features.singleConfig")}</li>
            <li>{t("i18n.introduction.features.simplifyApi")}</li>
            <li>{t("i18n.introduction.features.translationApi")}</li>
            <li>{t("i18n.introduction.features.localeNavigation")}</li>
            <li>{t("i18n.introduction.features.formatter")}</li>
            <li>{t("i18n.introduction.features.timezone")}</li>
            <li>{t("i18n.introduction.features.frameworkIntegration")}</li>
            <li>{t("i18n.introduction.features.apiDbIntegration")}</li>
          </ul>
        </section>

        <section className="space-y-6 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("i18n.introduction.conceptsTitle")}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white text-xl">
                {t("i18n.introduction.relationshipTitle")}
              </h3>
              <p className="mt-2 leading-8">
                {t("i18n.introduction.relationshipDescription")}
              </p>
              <p className="mt-2 leading-8">
                {t("i18n.introduction.relationshipDetail")}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white text-xl">
                {t("i18n.introduction.clientTitle")}
              </h3>
              <p className="mt-2 leading-8">
                {t("i18n.introduction.clientDescription")}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white text-xl">
                {t("i18n.introduction.serverTitle")}
              </h3>
              <p className="mt-2 leading-8">
                {t("i18n.introduction.serverDescription")}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white text-xl">
                {t("i18n.introduction.formatPresetTitle")}
              </h3>
              <p className="mt-2 leading-8">
                {t("i18n.introduction.formatPresetDescription")}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("i18n.introduction.tryDemosTitle")}
          </h2>
          <p className="text-slate-400 leading-7">
            {t("i18n.introduction.tryDemosDescription")}
          </p>
          <ul className="space-y-4">
            <li>
              <Link
                className="font-medium text-[#7cc0ff] text-lg transition-colors hover:text-[#a5d6ff]"
                href="/i18n/formatter"
              >
                {t("i18n.pages.formatter")} →
              </Link>
              <p className="mt-1 text-slate-400 leading-7">
                {t("i18n.formatter.description")}
              </p>
            </li>
            <li>
              <Link
                className="font-medium text-[#7cc0ff] text-lg transition-colors hover:text-[#a5d6ff]"
                href="/i18n/icu"
              >
                {t("i18n.pages.icu")} →
              </Link>
              <p className="mt-1 text-slate-400 leading-7">
                {t("i18n.icu.description")}
              </p>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
