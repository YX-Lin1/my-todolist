import { Alert, AlertDescription, AlertTitle } from "@surgeteam/design-system/components/ui/alert";
import { Button } from "@surgeteam/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@surgeteam/design-system/components/ui/card";
import { Input } from "@surgeteam/design-system/components/ui/input";
import { Label } from "@surgeteam/design-system/components/ui/label";
import { Separator } from "@surgeteam/design-system/components/ui/separator";
import { getI18n } from "@surgeteam/i18n/get-i18n";
import { Link } from "@surgeteam/i18n/navigation";
import { createMetadata } from "@surgeteam/seo/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { translateServiceErrorCode } from "@/library/services/common/translate-service-error-code";
import { ServiceErrorCodes } from "@/library/services/error-codes";
import { safeServiceCall } from "@/library/services/safe-service-call";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return createMetadata({
    title: t("seo.demoUser.title"),
    description: t("seo.demoUser.description"),
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

function InvalidRequestErrorPanel({
  t,
  code,
  details,
}: {
  t: (key: string) => string;
  code: string;
  details: unknown;
}) {
  return (
    <Alert variant="destructive">
      <AlertTitle>{t("demoUser.errorTitle")}</AlertTitle>
      <AlertDescription className="space-y-3">
        <p>{translateServiceErrorCode(t, code)}</p>
        {details === undefined ? null : (
          <div>
            <p className="font-medium text-xs uppercase tracking-wide opacity-90">
              {t("demoUser.errorDetailsLabel")}
            </p>
            <pre className="mt-2 overflow-x-auto rounded-md border border-border bg-muted/40 p-3 font-mono text-foreground text-xs leading-relaxed">
              {jsonStringifyValue(details)}
            </pre>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}

interface PageProps {
  searchParams: Promise<{ id?: string | string[] }>;
}

export default async function DemoUserPage({ searchParams }: PageProps) {
  const { t, formatDateTime, timeZone } = await getI18n();
  const params = await searchParams;
  const rawId = params.id;
  const idParam = Array.isArray(rawId) ? rawId[0] : rawId;
  const trimmed = idParam?.trim() ?? "";

  let resultSection: ReactNode = null;
  let errorPanel: ReactNode = null;

  if (trimmed) {
    const result = await safeServiceCall((services) =>
      services.getUsersService().get({ id: trimmed })
    );

    if (result.success) {
      const user = result.data;
      const fullName = `${user.firstName} ${user.lastName}`.trim();

      resultSection = (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{t("demoUser.friendly.title")}</CardTitle>
              <p className="text-muted-foreground text-sm">
                {t("demoUser.friendly.timeZone", {
                  timeZone: formatTimeZoneLabel(timeZone),
                })}
              </p>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1 rounded-lg border border-border bg-muted/30 p-3">
                  <dt className="text-muted-foreground text-xs">
                    {t("demoUser.friendly.fullName")}
                  </dt>
                  <dd className="font-medium text-foreground">{fullName}</dd>
                </div>
                <div className="space-y-1 rounded-lg border border-border bg-muted/30 p-3">
                  <dt className="text-muted-foreground text-xs">
                    {t("demoUser.friendly.email")}
                  </dt>
                  <dd className="break-all font-medium text-foreground">
                    {user.email}
                  </dd>
                </div>
                <div className="space-y-1 rounded-lg border border-border bg-muted/30 p-3">
                  <dt className="text-muted-foreground text-xs">
                    {t("demoUser.friendly.id")}
                  </dt>
                  <dd className="break-all font-medium text-foreground">
                    {user.id}
                  </dd>
                </div>
                <div className="space-y-1 rounded-lg border border-border bg-muted/30 p-3">
                  <dt className="text-muted-foreground text-xs">
                    {t("demoUser.friendly.createdAt")}
                  </dt>
                  <dd className="font-medium text-foreground">
                    {formatDateTime(user.createdAt, "longTimeWithSeconds")}
                  </dd>
                </div>
                <div className="space-y-1 rounded-lg border border-border bg-muted/30 p-3 sm:col-span-2">
                  <dt className="text-muted-foreground text-xs">
                    {t("demoUser.friendly.updatedAt")}
                  </dt>
                  <dd className="font-medium text-foreground">
                    {formatDateTime(user.updatedAt, "longTimeWithSeconds")}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <section className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              {t("demoUser.resultTitle")}
            </h2>
            <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-foreground text-sm leading-relaxed">
              <code>{jsonStringifyValue(user)}</code>
            </pre>
          </section>
        </div>
      );
    } else if (result.error.code === ServiceErrorCodes.INVALID_REQUEST) {
      errorPanel = (
        <InvalidRequestErrorPanel
          code={result.error.code}
          details={result.error.details}
          t={t}
        />
      );
      resultSection = null;
    } else if (result.error.code === ServiceErrorCodes.USER_NOT_FOUND) {
      notFound();
    } else {
      throw result.error;
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Button asChild variant="ghost">
            <Link href="/">{t("demoUser.back")}</Link>
          </Button>
          <h1 className="mt-2 font-semibold text-2xl text-foreground tracking-tight sm:text-3xl">
            {t("demoUser.title")}
          </h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            {t("demoUser.lead")}
          </p>
        </div>
      </div>

      <Separator className="mb-8" />

      <section className="space-y-8">
        <form className="flex flex-col gap-4 sm:flex-row sm:items-end" method="get">
          <div className="min-w-0 flex-1 space-y-2">
            <Label htmlFor="user-id">{t("demoUser.formLabel")}</Label>
            <Input
              className="max-w-md"
              defaultValue={trimmed}
              id="user-id"
              name="id"
              placeholder="…"
              type="text"
            />
          </div>
          <Button className="sm:mb-0.5" type="submit" variant="secondary">
            {t("demoUser.submit")}
          </Button>
        </form>

        {errorPanel}

        {trimmed ? (
          resultSection
        ) : (
          <Alert>
            <AlertTitle>{t("demoUser.emptyStateTitle")}</AlertTitle>
            <AlertDescription className="space-y-2">
              <p>{t("demoUser.noIdHint")}</p>
              <p>{t("demoUser.demoScenarios")}</p>
            </AlertDescription>
          </Alert>
        )}
      </section>
    </div>
  );
}
