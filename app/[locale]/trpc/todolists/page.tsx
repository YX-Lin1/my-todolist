"use client";

import { useI18n } from "@surgeteam/i18n/use-i18n";
import { trpc } from "@/library/trpc/client";
import { TrpcErrorPanel } from "@/app/components/trpc-error-panel";

function jsonStringifyValue(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

export default function TrpcTodolistsTestPage() {
  const { t } = useI18n();
  const query = trpc.todolists.list.useQuery({});

  const items = query.data?.data ?? [];
  const doneCount = items.filter((item) => item.completed).length;
  const pendingCount = items.length - doneCount;

  const errorLabels = {
    title: t("trpc.todolists.errorTitle"),
    hint: t("trpc.todolists.errorHint"),
    detailsLabel: t("trpc.todolists.errorDetailsLabel"),
  };

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl text-slate-300">
        <header className="border-white/10 border-b pb-6">
          <h1 className="font-bold text-4xl text-white tracking-tight">
            {t("trpc.todolists.title")}
          </h1>
          <p className="mt-3 text-slate-400 leading-7">
            {t("trpc.todolists.lead")}
          </p>
        </header>

        <section className="space-y-6 py-8">
          {query.isFetching ? (
            <p className="text-slate-400 text-sm leading-7">
              {t("trpc.todolists.loading")}
            </p>
          ) : null}

          {query.isError ? (
            <TrpcErrorPanel error={query.error} labels={errorLabels} t={t} />
          ) : null}

          {query.data ? (
            <div className="space-y-4">
              <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-5">
                <h2 className="font-semibold text-lg text-white">
                  {t("trpc.todolists.friendly.title")}
                </h2>
                <p className="mt-2 text-slate-400 text-sm leading-6">
                  {t("trpc.todolists.friendly.summary", {
                    total: String(items.length),
                    done: String(doneCount),
                    pending: String(pendingCount),
                  })}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-semibold text-lg text-white">
                  {t("trpc.todolists.resultTitle")}
                </h2>
                <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200 text-sm leading-6">
                  <code>{jsonStringifyValue(query.data)}</code>
                </pre>
              </section>
            </div>
          ) : null}
        </section>
      </article>
    </div>
  );
}
