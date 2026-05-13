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

function parseDateTime(dateStr: string, timeStr: string, fallback: Date): Date {
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

const demoListItems = ["Apple", "Banana", "Orange"];

/** Raw ICU message strings for display only (not parsed). */
const MESSAGE_SOURCES = {
  plural: "{count, plural, =0 {No items} one {# item} other {# items}}",
  select: "{gender, select, male {He} female {She} other {They}}",
  parameter: "Hello, {name}!",
  complex:
    "{count, plural, =0 {No items} one {# item} other {# items}} — {gender, select, male {He} female {She} other {They}}",
  dateInMessage: "Event on {eventDate, date, ::yyyyMMMdHHmmss}",
  listInMessage: "You selected: {items}",
} as const;

export default function IcuDemoPage() {
  const { t, formatList } = useI18n();
  const [count, setCount] = useState(0);
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [name, setName] = useState("World");
  const [eventDate, setEventDate] = useState<Date | null>(null);

  // Set current time after mount to avoid hydration mismatch (server vs client Date).
  useEffect(() => {
    setEventDate(new Date());
  }, []);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 font-bold text-3xl text-white tracking-tight">
          {t("i18n.icu.title")}
        </h1>
        <p className="mb-8 text-slate-400">{t("i18n.icu.description")}</p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bento-card border-white/10 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">
                {t("i18n.icu.pluralTitle")}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t("i18n.icu.pluralDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium text-sm text-white">
                  {t("i18n.icu.countLabel")}: {count}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setCount(Math.max(0, count - 1))}
                    size="sm"
                    variant="outline"
                  >
                    -
                  </Button>
                  <Button
                    onClick={() => setCount(count + 1)}
                    size="sm"
                    variant="outline"
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => setCount(0)}
                    size="sm"
                    variant="outline"
                  >
                    {t("i18n.icu.resetButton")}
                  </Button>
                </div>
              </div>
              <p className="font-medium text-slate-400 text-xs">
                {t("i18n.icu.messageSourceLabel")}:
              </p>
              <pre className="mb-4 overflow-x-auto rounded border border-white/10 bg-slate-900/50 px-3 py-2 font-mono text-slate-300 text-xs">
                {MESSAGE_SOURCES.plural}
              </pre>
              <div className="rounded-lg bg-slate-900/50 p-4">
                <p className="font-medium text-white">
                  {t("i18n.icu.itemsZero", { count })}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card border-white/10 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">
                {t("i18n.icu.selectTitle")}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t("i18n.icu.selectDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium text-sm text-white">
                  {t("i18n.icu.genderLabel")}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setGender("male")}
                    size="sm"
                    variant={gender === "male" ? "default" : "outline"}
                  >
                    {t("i18n.icu.genderMaleLabel")}
                  </Button>
                  <Button
                    onClick={() => setGender("female")}
                    size="sm"
                    variant={gender === "female" ? "default" : "outline"}
                  >
                    {t("i18n.icu.genderFemaleLabel")}
                  </Button>
                  <Button
                    onClick={() => setGender("other")}
                    size="sm"
                    variant={gender === "other" ? "default" : "outline"}
                  >
                    {t("i18n.icu.genderOtherLabel")}
                  </Button>
                </div>
              </div>
              <p className="font-medium text-slate-400 text-xs">
                {t("i18n.icu.messageSourceLabel")}:
              </p>
              <pre className="mb-4 overflow-x-auto rounded border border-white/10 bg-slate-900/50 px-3 py-2 font-mono text-slate-300 text-xs">
                {MESSAGE_SOURCES.select}
              </pre>
              <div className="rounded-lg bg-slate-900/50 p-4">
                <p className="font-medium text-white">
                  {t("i18n.icu.genderMale", { gender })}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card border-white/10 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">
                {t("i18n.icu.parameterTitle")}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t("i18n.icu.parameterDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label
                  className="font-medium text-sm text-white"
                  htmlFor="name-input"
                >
                  {t("i18n.icu.nameLabel")}
                </label>
                <Input
                  id="name-input"
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("i18n.icu.namePlaceholder")}
                  value={name}
                />
              </div>
              <p className="font-medium text-slate-400 text-xs">
                {t("i18n.icu.messageSourceLabel")}:
              </p>
              <pre className="mb-4 overflow-x-auto rounded border border-white/10 bg-slate-900/50 px-3 py-2 font-mono text-slate-300 text-xs">
                {MESSAGE_SOURCES.parameter}
              </pre>
              <div className="rounded-lg bg-slate-900/50 p-4">
                <p className="font-medium text-white">
                  {t("i18n.icu.greeting", { name })}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card border-white/10 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">
                {t("i18n.icu.complexTitle")}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t("i18n.icu.complexDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-slate-400 text-xs">
                {t("i18n.icu.messageSourceLabel")}:
              </p>
              <pre className="mb-4 overflow-x-auto rounded border border-white/10 bg-slate-900/50 px-3 py-2 font-mono text-slate-300 text-xs">
                {MESSAGE_SOURCES.complex}
              </pre>
              <div className="rounded-lg bg-slate-900/50 p-4">
                <p className="font-medium text-white">
                  {t("i18n.icu.complexMessage", { count, gender })}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card border-white/10 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">
                {t("i18n.icu.dateInMessageTitle")}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t("i18n.icu.dateInMessageDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {eventDate === null ? (
                <p className="text-slate-400 text-sm">
                  {t("i18n.icu.loading")}
                </p>
              ) : (
                <>
                  <div className="flex flex-wrap items-end gap-3">
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <Label
                        className="text-slate-400 text-xs"
                        htmlFor="event-date"
                      >
                        {t("i18n.icu.dateInMessageDateLabel")}
                      </Label>
                      <Input
                        id="event-date"
                        onChange={(e) => {
                          setEventDate(
                            parseDateTime(
                              e.target.value,
                              toTimeInputValue(eventDate),
                              eventDate
                            )
                          );
                        }}
                        type="date"
                        value={toDateInputValue(eventDate)}
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <Label
                        className="text-slate-400 text-xs"
                        htmlFor="event-time"
                      >
                        {t("i18n.icu.dateInMessageTimeLabel")}
                      </Label>
                      <Input
                        id="event-time"
                        onChange={(e) => {
                          setEventDate(
                            parseDateTime(
                              toDateInputValue(eventDate),
                              e.target.value,
                              eventDate
                            )
                          );
                        }}
                        step="1"
                        type="time"
                        value={toTimeInputValue(eventDate)}
                      />
                    </div>
                    <Button
                      onClick={() => setEventDate(new Date())}
                      size="sm"
                      variant="secondary"
                    >
                      {t("i18n.icu.dateInMessageReset")}
                    </Button>
                  </div>
                  <p className="font-medium text-slate-400 text-xs">
                    {t("i18n.icu.messageSourceLabel")}:
                  </p>
                  <pre className="mb-4 overflow-x-auto rounded border border-white/10 bg-slate-900/50 px-3 py-2 font-mono text-slate-300 text-xs">
                    {MESSAGE_SOURCES.dateInMessage}
                  </pre>
                  <div className="rounded-lg bg-slate-900/50 p-4">
                    <p className="font-medium text-white">
                      {t("i18n.icu.dateInMessageExample", { eventDate })}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bento-card border-white/10 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">
                {t("i18n.icu.listInMessageTitle")}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t("i18n.icu.listInMessageDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-slate-400 text-xs">
                {t("i18n.icu.messageSourceLabel")}:
              </p>
              <pre className="mb-4 overflow-x-auto rounded border border-white/10 bg-slate-900/50 px-3 py-2 font-mono text-slate-300 text-xs">
                {MESSAGE_SOURCES.listInMessage}
              </pre>
              <div className="rounded-lg bg-slate-900/50 p-4">
                <p className="font-medium text-white">
                  {t("i18n.icu.listInMessageExample", {
                    items: formatList(demoListItems, "conjunction"),
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
