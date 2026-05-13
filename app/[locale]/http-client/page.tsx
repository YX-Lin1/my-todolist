import { getI18n } from "@surgeteam/i18n/get-i18n";
import { Link } from "@surgeteam/i18n/navigation";
import { createMetadata } from "@surgeteam/seo/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return createMetadata({
    title: t("seo.httpClient.title"),
    description: t("seo.httpClient.description"),
  });
}

export default async function HttpClientOverviewPage() {
  const { t } = await getI18n();
  const storybookUrl = process.env.NEXT_PUBLIC_STORYBOOK_URL;
  const storybookDocsUrl = storybookUrl
    ? `${storybookUrl.endsWith("/") ? storybookUrl.slice(0, -1) : storybookUrl}/?path=/docs/http-client-introduction`
    : null;

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl text-slate-300">
        <header className="border-white/10 border-b pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-bold text-4xl text-white tracking-tight">
              {t("httpClient.introduction.title")}
            </h1>
            {storybookDocsUrl ? (
              <a
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-900 px-4 py-2 font-medium text-[#7cc0ff] transition-colors hover:border-white/20 hover:bg-slate-800 hover:text-[#a5d6ff]"
                href={storybookDocsUrl}
                rel="noreferrer"
                target="_blank"
              >
                {t("httpClient.introduction.docCta")}
              </a>
            ) : null}
          </div>
          <p className="mt-3 text-slate-400 leading-7">
            {t("httpClient.introduction.description")}
          </p>
        </header>

        <section className="space-y-4 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("httpClient.introduction.featuresTitle")}
          </h2>
          <ul className="space-y-2 leading-7">
            <li>{t("httpClient.introduction.features.adapter")}</li>
            <li>{t("httpClient.introduction.features.interface")}</li>
            <li>{t("httpClient.introduction.features.types")}</li>
            <li>{t("httpClient.introduction.features.interceptors")}</li>
            <li>{t("httpClient.introduction.features.timeoutAbort")}</li>
            <li>{t("httpClient.introduction.features.nextjs")}</li>
            <li>{t("httpClient.introduction.features.errorHandling")}</li>
          </ul>
        </section>

        <section className="space-y-6 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("httpClient.introduction.conceptsTitle")}
          </h2>

          <div>
            <h3 className="font-medium text-white text-xl">
              {t("httpClient.introduction.instanceTitle")}
            </h3>
            <p className="mt-2 text-slate-400 leading-7">
              {t("httpClient.introduction.instanceDesc")}
            </p>
            <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200 text-sm leading-6">
              <code>{`const httpClient = new HttpClient({
  baseURL: "https://api.example.com",
  timeout: 10000,
});`}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-medium text-white text-xl">
              {t("httpClient.introduction.methodsTitle")}
            </h3>
            <p className="mt-2 leading-8">
              {t("httpClient.introduction.methodsDesc")}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-white text-xl">
              {t("httpClient.introduction.transformsTitle")}
            </h3>
            <ul className="mt-2 space-y-2 leading-7">
              <li>
                {t("httpClient.introduction.transforms.requestInterceptor")}
              </li>
              <li>
                {t("httpClient.introduction.transforms.responseInterceptor")}
              </li>
              <li>
                {t("httpClient.introduction.transforms.requestTransformer")}
              </li>
              <li>
                {t("httpClient.introduction.transforms.responseTransformer")}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white text-xl">
              {t("httpClient.introduction.errorTitle")}
            </h3>
            <p className="mt-2 leading-8">
              {t("httpClient.introduction.errorDesc")}
            </p>
          </div>
        </section>

        <section className="space-y-6 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("httpClient.introduction.adapterTitle")}
          </h2>
          <p className="text-slate-400 leading-7">
            {t("httpClient.introduction.adapterDesc")}
          </p>
          <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200 text-sm leading-6">
            <code>{`// default: fetch adapter
const client1 = new HttpClient({
  baseURL: "https://api.example.com",
});

// explicit: built-in fetch adapter
const client2 = new HttpClient({
  adapter: "fetch",
  baseURL: "https://api.example.com",
});

// custom adapter
const client3 = new HttpClient({
  adapter: customAdapter,
  baseURL: "https://api.example.com",
});`}</code>
          </pre>
        </section>

        <section className="space-y-4 py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("httpClient.introduction.sections.tryDemos.title")}
          </h2>
          <p className="text-slate-400 leading-7">
            {t("httpClient.introduction.sections.tryDemos.description")}
          </p>
          <ul className="space-y-4">
            <li>
              <Link
                className="font-medium text-[#7cc0ff] text-lg transition-colors hover:text-[#a5d6ff]"
                href="/http-client/users"
              >
                {t("httpClient.pages.users")} →
              </Link>
              <p className="mt-1 text-slate-400 leading-7">
                {t("httpClient.users.lead")}
              </p>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
