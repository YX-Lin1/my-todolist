import { getI18n } from "@surgeteam/i18n/get-i18n";
import { Link } from "@surgeteam/i18n/navigation";
import { createMetadata } from "@surgeteam/seo/metadata";
import type { Metadata } from "next";

const TRPC_DOCS_URL = "https://trpc.io/docs";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return createMetadata({
    title: t("seo.trpc.title"),
    description: t("seo.trpc.description"),
  });
}

export default async function TrpcOverviewPage() {
  const { t } = await getI18n();

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl text-slate-300">
        <header className="border-white/10 border-b pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-bold text-4xl text-white tracking-tight">
              {t("trpc.introduction.title")}
            </h1>
            <a
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-900 px-4 py-2 font-medium text-[#7cc0ff] transition-colors hover:border-white/20 hover:bg-slate-800 hover:text-[#a5d6ff]"
              href={TRPC_DOCS_URL}
              rel="noreferrer"
              target="_blank"
            >
              {t("trpc.introduction.docCta")}
            </a>
          </div>
          <p className="mt-3 text-slate-400 leading-7">
            {t("trpc.introduction.description")}
          </p>
        </header>

        <section className="space-y-4 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("trpc.introduction.featuresTitle")}
          </h2>
          <ul className="space-y-2 leading-7">
            <li>{t("trpc.introduction.features.endToEnd")}</li>
            <li>{t("trpc.introduction.features.reactQuery")}</li>
            <li>{t("trpc.introduction.features.batching")}</li>
            <li>{t("trpc.introduction.features.superjson")}</li>
            <li>{t("trpc.introduction.features.context")}</li>
            <li>{t("trpc.introduction.features.serverGuidance")}</li>
          </ul>
        </section>

        <section className="space-y-6 border-white/10 border-b py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("trpc.introduction.conceptsTitle")}
          </h2>

          <div>
            <h3 className="font-medium text-white text-xl">
              {t("trpc.introduction.routerTitle")}
            </h3>
            <p className="mt-2 text-slate-400 leading-7">
              {t("trpc.introduction.routerDesc")}
            </p>
            <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200 text-sm leading-6">
              <code>{`// library/trpc/routers/index.ts — aggregate routers, export AppRouter
export const appRouter = router({
  users: usersRouter,
});
export type AppRouter = typeof appRouter;`}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-medium text-white text-xl">
              {t("trpc.introduction.clientTitle")}
            </h3>
            <p className="mt-2 text-slate-400 leading-7">
              {t("trpc.introduction.clientDesc")}
            </p>
            <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200 text-sm leading-6">
              <code>{`"use client";

import { trpc } from "@/library/trpc/client";

export function Example({ userId }: { userId: string }) {
  const query = trpc.users.get.useQuery({ id: userId });
  if (query.isLoading) return <p>Loading…</p>;
  if (query.isError) return <p>{query.error.message}</p>;
  return <pre>{JSON.stringify(query.data, null, 2)}</pre>;
}`}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-medium text-white text-xl">
              {t("trpc.introduction.procedureTitle")}
            </h3>
            <p className="mt-2 text-slate-400 leading-7">
              {t("trpc.introduction.procedureDesc")}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-white text-xl">
              {t("trpc.introduction.apiTitle")}
            </h3>
            <p className="mt-2 text-slate-400 leading-7">
              {t("trpc.introduction.apiDesc")}
            </p>
          </div>
        </section>

        <section className="space-y-4 py-8">
          <h2 className="font-semibold text-2xl text-white">
            {t("trpc.introduction.sections.tryDemos.title")}
          </h2>
          <p className="text-slate-400 leading-7">
            {t("trpc.introduction.sections.tryDemos.description")}
          </p>
          <ul className="space-y-4">
            <li>
              <Link
                className="font-medium text-[#7cc0ff] text-lg transition-colors hover:text-[#a5d6ff]"
                href="/trpc/users"
              >
                {t("trpc.pages.users")} →
              </Link>
              <p className="mt-1 text-slate-400 leading-7">
                {t("trpc.users.lead")}
              </p>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
