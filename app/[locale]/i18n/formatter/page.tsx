"use client";

import { Button } from "@surgeteam/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@surgeteam/design-system/components/ui/card";
import { Input } from "@surgeteam/design-system/components/ui/input";
import { Label } from "@surgeteam/design-system/components/ui/label";
import { useI18n } from "@surgeteam/i18n/use-i18n";
import { useEffect, useState } from "react";

function toDateInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function toTimeInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function parseReferenceDateTime(
  dateStr: string,
  timeStr: string,
  fallback: Date
): Date {
  if (!dateStr) {
    return fallback;
  }
  if (!timeStr) {
    return fallback;
  }
  const [h = 0, m = 0, s = 0] = timeStr.split(":").map(Number);
  const parsed = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return fallback;
  }
  parsed.setHours(h, m, s, 0);
  return parsed;
}

// Date/time cards use many conditional branches for null-safe rendering.
export default function FormatterDemoPage() {
  const {
    t,
    formatDateTime,
    formatNumber,
    formatCurrency,
    formatRelativeTime,
    formatSmartRelativeTime,
    formatDateTimeRange,
    formatList,
  } = useI18n();

  const [now, setNow] = useState<Date | null>(null);
  const [referenceNow, setReferenceNow] = useState<Date | null>(null);

  // Set current time after mount to avoid hydration mismatch (server vs client Date).
  useEffect(() => {
    const d = new Date();
    setNow(d);
    setReferenceNow(d);
  }, []);

  const price = 1234.56;
  const largeNumber = 1_234_567;
  const smallNumber = 0.1234;
  const negativeNumber = -1234.56;
  const percentValue = 0.856;
  const pastDate =
    now === null ? null : new Date(now.getTime() - 2 * 60 * 60 * 1000);
  const futureDate =
    now === null ? null : new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const oldDate =
    now === null ? null : new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const rangeStart =
    now === null ? null : new Date(now.getFullYear(), now.getMonth(), 10, 9, 0);
  const rangeEnd =
    now === null
      ? null
      : new Date(now.getFullYear(), now.getMonth(), 10, 17, 30);
  const listItems = ["Apple", "Banana", "Orange"];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 font-bold text-3xl text-white tracking-tight">
          {t("i18n.formatter.title")}
        </h1>
        <p className="mb-8 text-slate-400">{t("i18n.formatter.description")}</p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bento-card border-white/10 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">
                {t("i18n.formatter.dateTimeTitle")}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t("i18n.formatter.dateTimeDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {now === null ? (
                <p className="text-slate-400 text-sm">
                  {t("i18n.formatter.loading")}
                </p>
              ) : (
                <>
                  <div>
                    <p className="font-medium text-slate-400 text-sm">
                      {t("i18n.formatter.shortDate")}
                    </p>
                    <p className="text-lg">{formatDateTime(now, "short")}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-400 text-sm">
                      {t("i18n.formatter.shortDateWithTime")}
                    </p>
                    <p className="text-lg">
                      {formatDateTime(now, "shortTime")}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-400 text-sm">
                      {t("i18n.formatter.shortDateWithTimeSeconds")}
                    </p>
                    <p className="text-lg">
                      {formatDateTime(now, "shortTimeWithSeconds")}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-400 text-sm">
                      {t("i18n.formatter.longDate")}
                    </p>
                    <p className="text-lg">{formatDateTime(now, "long")}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-400 text-sm">
                      {t("i18n.formatter.longDateWithTime")}
                    </p>
                    <p className="text-lg">{formatDateTime(now, "longTime")}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-400 text-sm">
                      {t("i18n.formatter.longDateWithTimeSeconds")}
                    </p>
                    <p className="text-lg">
                      {formatDateTime(now, "longTimeWithSeconds")}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-400 text-sm">
                      {t("i18n.formatter.weekday")}
                    </p>
                    <p className="text-lg">{formatDateTime(now, "weekday")}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-400 text-sm">
                      {t("i18n.formatter.dateRangeExample")}
                    </p>
                    <p className="text-lg">
                      {rangeStart !== null &&
                        rangeEnd !== null &&
                        formatDateTimeRange(rangeStart, rangeEnd, "shortTime")}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bento-card border-white/10 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">
                {t("i18n.formatter.numberTitle")}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t("i18n.formatter.numberDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-slate-400 text-sm">
                  {t("i18n.formatter.decimalFormat")}
                </p>
                <p className="text-lg">{formatNumber(price, "decimal")}</p>
              </div>
              <div>
                <p className="font-medium text-slate-400 text-sm">
                  {t("i18n.formatter.compactFormat")}
                </p>
                <p className="text-lg">
                  {formatNumber(largeNumber, "compact")}
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-400 text-sm">
                  {t("i18n.formatter.currencyFormat")}
                </p>
                <p className="text-lg">
                  {formatCurrency(price, "standard", "USD")}
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-400 text-sm">
                  {t("i18n.formatter.compactCurrencyFormat")}
                </p>
                <p className="text-lg">
                  {formatCurrency(largeNumber, "compact", "USD")}
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-400 text-sm">
                  {t("i18n.formatter.decimalFormatSmall")}
                </p>
                <p className="text-lg">
                  {formatNumber(smallNumber, "decimal")}
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-400 text-sm">
                  {t("i18n.formatter.negativeCurrencyFormat")}
                </p>
                <p className="text-lg">
                  {formatCurrency(negativeNumber, "standard", "USD")}
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-400 text-sm">
                  {t("i18n.formatter.percentFormat")}
                </p>
                <p className="text-lg">
                  {formatNumber(percentValue, "percent")}
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-400 text-sm">
                  {t("i18n.formatter.accountingCurrencyFormat")}
                </p>
                <p className="text-lg">
                  {formatCurrency(negativeNumber, "accounting", "USD")}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card border-white/10 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">
                {t("i18n.formatter.relativeTimeTitle")}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t("i18n.formatter.relativeTimeDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {now === null || referenceNow === null ? (
                <p className="text-slate-400 text-sm">
                  {t("i18n.formatter.loading")}
                </p>
              ) : (
                <>
                  <div>
                    <p className="font-medium text-slate-400 text-sm">
                      {t("i18n.formatter.relativeTimePast")}
                    </p>
                    <p className="text-lg">
                      {pastDate !== null &&
                        formatRelativeTime(pastDate, "long")}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-400 text-sm">
                      {t("i18n.formatter.relativeTimeFuture")}
                    </p>
                    <p className="text-lg">
                      {futureDate !== null &&
                        formatRelativeTime(futureDate, "short")}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-400 text-sm">
                      {t("i18n.formatter.smartRelativeTime")}
                    </p>
                    <p className="mb-1 text-slate-400 text-xs">
                      {t("i18n.formatter.smartRelativeTimeRecent")}
                    </p>
                    <p className="text-lg">
                      {pastDate !== null &&
                        formatSmartRelativeTime(pastDate, {
                          relativeFormat: "long",
                          dateTimeFormat: "short",
                        })}
                    </p>
                    <p className="mt-3 mb-1 text-slate-400 text-xs">
                      {t("i18n.formatter.smartRelativeTimeOld")}
                    </p>
                    <p className="text-lg">
                      {oldDate !== null &&
                        formatSmartRelativeTime(oldDate, {
                          relativeFormat: "long",
                          dateTimeFormat: "short",
                        })}
                    </p>
                  </div>

                  <div className="rounded-md border border-white/10 bg-slate-900/50 p-3">
                    <p className="mb-2 font-medium text-slate-400 text-sm">
                      {t("i18n.formatter.referenceTimeLabel")}
                    </p>
                    <p className="mb-3 text-slate-400 text-xs">
                      {t("i18n.formatter.referenceTimeDescription")}
                    </p>
                    <div className="mb-3 flex flex-wrap items-end gap-3">
                      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <Label
                          className="text-slate-400 text-xs"
                          htmlFor="reference-date"
                        >
                          {t("i18n.formatter.referenceTimeDate")}
                        </Label>
                        <Input
                          id="reference-date"
                          onChange={(e) => {
                            setReferenceNow(
                              parseReferenceDateTime(
                                e.target.value,
                                toTimeInputValue(referenceNow),
                                referenceNow
                              )
                            );
                          }}
                          type="date"
                          value={toDateInputValue(referenceNow)}
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <Label
                          className="text-slate-400 text-xs"
                          htmlFor="reference-time"
                        >
                          {t("i18n.formatter.referenceTimeTime")}
                        </Label>
                        <Input
                          id="reference-time"
                          onChange={(e) => {
                            setReferenceNow(
                              parseReferenceDateTime(
                                toDateInputValue(referenceNow),
                                e.target.value,
                                referenceNow
                              )
                            );
                          }}
                          step="1"
                          type="time"
                          value={toTimeInputValue(referenceNow)}
                        />
                      </div>
                      <Button
                        onClick={() => {
                          const d = new Date();
                          setNow(d);
                          setReferenceNow(d);
                        }}
                        size="sm"
                        variant="secondary"
                      >
                        {t("i18n.formatter.referenceTimeReset")}
                      </Button>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-slate-400 text-xs">
                          {t("i18n.formatter.relativeTimePast")}
                        </p>
                        <p className="text-lg">
                          {pastDate !== null &&
                            formatRelativeTime(pastDate, "long", {
                              now: referenceNow,
                            })}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 text-slate-400 text-xs">
                          {t("i18n.formatter.smartRelativeTimeRecent")}
                        </p>
                        <p className="text-lg">
                          {pastDate !== null &&
                            formatSmartRelativeTime(pastDate, {
                              relativeFormat: "long",
                              dateTimeFormat: "short",
                              relativeOptions: { now: referenceNow },
                            })}
                        </p>
                        <p className="mt-2 mb-1 text-slate-400 text-xs">
                          {t("i18n.formatter.smartRelativeTimeOld")}
                        </p>
                        <p className="text-lg">
                          {oldDate !== null &&
                            formatSmartRelativeTime(oldDate, {
                              relativeFormat: "long",
                              dateTimeFormat: "short",
                              relativeOptions: { now: referenceNow },
                            })}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bento-card border-white/10 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">
                {t("i18n.formatter.listTitle")}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t("i18n.formatter.listDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-slate-400 text-sm">
                  {t("i18n.formatter.listConjunction")}
                </p>
                <p className="text-lg">
                  {formatList(listItems, "conjunction")}
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-400 text-sm">
                  {t("i18n.formatter.listDisjunction")}
                </p>
                <p className="text-lg">
                  {formatList(listItems, "disjunction")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
