import { getI18n } from "@surgeteam/i18n/get-i18n";
import { createMetadata } from "@surgeteam/seo/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { translateServiceErrorCode } from "@/library/i18n/translate-service-error-code";
import { safeServiceCall } from "@/library/services/safe-service-call";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return createMetadata({
    title: t("seo.servicesUsers.title"),
    description: t("seo.servicesUsers.description"),
  });
}

function jsonStringifyValue(value: unknown): string {
  return JSON.stringify(
    value,
    (_, v) => (v instanceof Date ? v.toISOString() : v),
    2
  );
}

function formatTimeZoneLabel(timeZone: string | undefined): string {
  return timeZone ?? "UTC";
}

interface PageProps {
  searchParams: Promise<{ id?: string | string[] }>;
}

export default async function ServicesUsersDemoPage({
  searchParams,
}: PageProps) {
  const { t, formatDateTime, timeZone } = await getI18n();
  const params = await searchParams;
  const rawId = params.id;
  const idParam = Array.isArray(rawId) ? rawId[0] : rawId;
  const trimmed = idParam?.trim() ?? "";

  let parsedBody: ReactNode = null;

  if (trimmed) {
    const result = await safeServiceCall((services) =>
      services.getUsersService().get({ id: trimmed })
    );

    if (result.success) {
      const user = result.data;
      const fullName = `${user.firstName} ${user.lastName}`.trim();
      const tagsLabel =
        user.tags.length > 0
          ? user.tags.join(", ")
          : t("services.users.friendly.empty");
      const bioLabel = user.bio ?? t("services.users.friendly.empty");
      const avatarLabel = user.avatarUrl ?? t("services.users.friendly.empty");

      parsedBody = (
        <div className="space-y-4">
          <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-5">
            <h2 className="font-semibold text-lg text-white">
              {t("services.users.friendly.title")}
            </h2>
            <p className="mt-1 text-slate-400 text-sm">
              {t("services.users.friendly.timeZone", {
                timeZone: formatTimeZoneLabel(timeZone),
              })}
            </p>
            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <dt className="text-slate-400 text-xs">
                  {t("services.users.friendly.fullName")}
                </dt>
                <dd className="mt-1 font-medium text-slate-100">{fullName}</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <dt className="text-slate-400 text-xs">
                  {t("services.users.friendly.email")}
                </dt>
                <dd className="mt-1 break-all font-medium text-slate-100">
                  {user.email}
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <dt className="text-slate-400 text-xs">
                  {t("services.users.friendly.id")}
                </dt>
                <dd className="mt-1 break-all font-medium text-slate-100">
                  {user.id}
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <dt className="text-slate-400 text-xs">
                  {t("services.users.friendly.tags")}
                </dt>
                <dd className="mt-1 font-medium text-slate-100">{tagsLabel}</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3 sm:col-span-2">
                <dt className="text-slate-400 text-xs">
                  {t("services.users.friendly.bio")}
                </dt>
                <dd className="mt-1 font-medium text-slate-100">{bioLabel}</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3 sm:col-span-2">
                <dt className="text-slate-400 text-xs">
                  {t("services.users.friendly.avatarUrl")}
                </dt>
                <dd className="mt-1 break-all font-medium text-slate-100">
                  {avatarLabel}
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <dt className="text-slate-400 text-xs">
                  {t("services.users.friendly.createdAt")}
                </dt>
                <dd className="mt-1 font-medium text-slate-100">
                  {formatDateTime(user.createdAt, "longTimeWithSeconds")}
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <dt className="text-slate-400 text-xs">
                  {t("services.users.friendly.updatedAt")}
                </dt>
                <dd className="mt-1 font-medium text-slate-100">
                  {formatDateTime(user.updatedAt, "longTimeWithSeconds")}
                </dd>
              </div>
            </dl>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-lg text-white">
              {t("services.users.resultTitle")}
            </h2>
            <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200 text-sm leading-6">
              <code>{jsonStringifyValue(user)}</code>
            </pre>
          </section>
        </div>
      );
    } else {
      parsedBody = (
        <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-4 text-red-100/90">
          <p className="font-medium">{t("services.users.errorTitle")}</p>
          <p className="mt-2 text-red-100/70 text-sm leading-6">
            {t("services.users.errorHint")}
          </p>
          <p className="mt-3 text-red-100/85 text-sm leading-6">
            {translateServiceErrorCode(t, result.error.code)}
          </p>
          {result.error.details === undefined ? null : (
            <div className="mt-3">
              <p className="font-medium text-red-100/80 text-xs uppercase tracking-wide">
                {t("services.users.errorDetailsLabel")}
              </p>
              <pre className="mt-1 overflow-x-auto rounded-lg border border-white/10 bg-slate-950/60 p-3 font-mono text-slate-300 text-xs leading-5">
                {jsonStringifyValue(result.error.details)}
              </pre>
            </div>
          )}
        </div>
      );
    }
  } else {
    parsedBody = (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-950/30 p-4 text-amber-100/90">
        <p className="font-medium">{t("services.users.errorTitle")}</p>
        <p className="mt-2 text-amber-100/70 text-sm leading-6">
          {t("services.users.errorHint")}
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl text-slate-300">
        <header className="border-white/10 border-b pb-6">
          <h1 className="font-bold text-4xl text-white tracking-tight">
            {t("services.users.title")}
          </h1>
          <p className="mt-3 text-slate-400 leading-7">
            {t("services.users.lead")}
          </p>
        </header>

        <section className="space-y-6 py-8">
          <form
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
            method="get"
          >
            <div className="min-w-0 flex-1">
              <label
                className="mb-1.5 block font-medium text-slate-400 text-sm"
                htmlFor="user-id"
              >
                {t("services.users.formLabel")}
              </label>
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none ring-[#7cc0ff]/40 placeholder:text-slate-500 focus:ring-2"
                defaultValue={trimmed}
                id="user-id"
                name="id"
                placeholder="1234567890123456789"
                type="text"
              />
            </div>
            <button
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-800 px-5 py-2 font-medium text-white transition-colors hover:border-white/20 hover:bg-slate-700"
              type="submit"
            >
              {t("services.users.submit")}
            </button>
          </form>

          {trimmed ? (
            parsedBody
          ) : (
            <p className="text-slate-400 text-sm leading-7">
              {t("services.users.noIdHint")}
            </p>
          )}
        </section>
      </article>
    </div>
  );
}
