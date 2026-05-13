"use client";

import { usePathname, useRouter } from "@surgeteam/i18n/navigation";
import { useI18n } from "@surgeteam/i18n/use-i18n";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBrowserUsersApi } from "@/library/api/main/client-browser";

function jsonStringifyValue(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  return String(err);
}

export default function HttpClientUsersDemoPage() {
  const { t, formatDateTime, timeZone } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const idFromUrl = searchParams.get("id") ?? "";
  const [inputId, setInputId] = useState("");

  useEffect(() => {
    setInputId(idFromUrl);
  }, [idFromUrl]);

  const trimmedId = idFromUrl.trim();

  const query = useQuery({
    queryKey: ["http-client", "users", "get", trimmedId],
    queryFn: async () => {
      const usersApi = getBrowserUsersApi();
      return usersApi.get({ path: { id: trimmedId } });
    },
    enabled: trimmedId.length > 0,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextId = inputId.trim();
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    if (nextId) {
      nextSearchParams.set("id", nextId);
    } else {
      nextSearchParams.delete("id");
    }
    const query = nextSearchParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl text-slate-300">
        <header className="border-white/10 border-b pb-6">
          <h1 className="font-bold text-4xl text-white tracking-tight">
            {t("httpClient.users.title")}
          </h1>
          <p className="mt-3 text-slate-400 leading-7">
            {t("httpClient.users.lead")}
          </p>
        </header>

        <section className="space-y-6 py-8">
          <form
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
            onSubmit={onSubmit}
          >
            <div className="min-w-0 flex-1">
              <label
                className="mb-1.5 block font-medium text-slate-400 text-sm"
                htmlFor="user-id"
              >
                {t("httpClient.users.formLabel")}
              </label>
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none ring-[#7cc0ff]/40 placeholder:text-slate-500 focus:ring-2"
                id="user-id"
                onChange={(event) => setInputId(event.target.value)}
                placeholder="1234567890123456789"
                type="text"
                value={inputId}
              />
            </div>
            <button
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-800 px-5 py-2 font-medium text-white transition-colors hover:border-white/20 hover:bg-slate-700"
              type="submit"
            >
              {t("httpClient.users.submit")}
            </button>
          </form>

          {trimmedId ? null : (
            <p className="text-slate-400 text-sm leading-7">
              {t("httpClient.users.noIdHint")}
            </p>
          )}

          {query.isFetching ? (
            <p className="text-slate-400 text-sm leading-7">
              {t("httpClient.users.loading")}
            </p>
          ) : null}

          {query.isError ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-4 text-red-100/90">
              <p className="font-medium">{t("httpClient.users.errorTitle")}</p>
              <p className="mt-2 text-red-100/70 text-sm leading-6">
                {t("httpClient.users.errorHint")}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg border border-white/10 bg-slate-950/60 p-3 font-mono text-slate-300 text-xs leading-5">
                {errorMessage(query.error)}
              </pre>
            </div>
          ) : null}

          {query.data ? (
            <div className="space-y-4">
              <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-5">
                <h2 className="font-semibold text-lg text-white">
                  {t("httpClient.users.friendly.title")}
                </h2>
                <p className="mt-1 text-slate-400 text-sm">
                  {t("httpClient.users.friendly.timeZone", {
                    timeZone: timeZone ?? "UTC",
                  })}
                </p>
                <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                    <dt className="text-slate-400 text-xs">
                      {t("httpClient.users.friendly.fullName")}
                    </dt>
                    <dd className="mt-1 font-medium text-slate-100">
                      {`${query.data.firstName} ${query.data.lastName}`.trim()}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                    <dt className="text-slate-400 text-xs">
                      {t("httpClient.users.friendly.email")}
                    </dt>
                    <dd className="mt-1 break-all font-medium text-slate-100">
                      {query.data.email}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3 sm:col-span-2">
                    <dt className="text-slate-400 text-xs">
                      {t("httpClient.users.friendly.id")}
                    </dt>
                    <dd className="mt-1 break-all font-medium text-slate-100">
                      {query.data.id}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                    <dt className="text-slate-400 text-xs">
                      {t("httpClient.users.friendly.createdAt")}
                    </dt>
                    <dd className="mt-1 font-medium text-slate-100">
                      {formatDateTime(
                        new Date(query.data.createdAt),
                        "longTimeWithSeconds"
                      )}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                    <dt className="text-slate-400 text-xs">
                      {t("httpClient.users.friendly.updatedAt")}
                    </dt>
                    <dd className="mt-1 font-medium text-slate-100">
                      {formatDateTime(
                        new Date(query.data.updatedAt),
                        "longTimeWithSeconds"
                      )}
                    </dd>
                  </div>
                </dl>
              </section>

              <section className="space-y-2">
                <h2 className="font-semibold text-lg text-white">
                  {t("httpClient.users.resultTitle")}
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
