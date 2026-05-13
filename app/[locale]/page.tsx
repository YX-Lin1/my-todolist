import { Button } from "@surgeteam/design-system/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@surgeteam/design-system/components/ui/card";
import { getI18n } from "@surgeteam/i18n/get-i18n";
import { Link } from "@surgeteam/i18n/navigation";
import { createMetadata } from "@surgeteam/seo/metadata";
import { Globe, Layers, Palette } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return createMetadata({
    title: t("seo.home.title"),
    description: t("seo.home.description"),
  });
}

const featureIcons = {
  i18n: Globe,
  stack: Layers,
  tokens: Palette,
} as const;

export default async function HomePage() {
  const { t } = await getI18n();

  const featureKeys = ["i18n", "stack", "tokens"] as const;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="border-border border-b pb-10 lg:pb-14">
        <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.2em]">
          {t("homepage.title")}
        </p>
        <h1 className="mt-3 font-semibold text-3xl text-foreground tracking-tight sm:text-4xl lg:text-5xl">
          {t("homepage.hero.title")}
        </h1>
        <p className="mt-2 text-muted-foreground text-xl sm:text-2xl">
          {t("homepage.hero.subtitle")}
        </p>
        <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
          {t("homepage.hero.intro")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Button asChild size="lg">
            <Link href="/demo/user">{t("homepage.cta.demo")}</Link>
          </Button>
          <p className="font-mono text-muted-foreground text-sm">
            {t("homepage.cta.secondary")}
          </p>
        </div>
      </section>

      <section className="grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:py-14">
        {featureKeys.map((key) => {
          const Icon = featureIcons[key];
          return (
            <Card className="border-border/80" key={key}>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-primary">
                  <Icon aria-hidden className="size-5" />
                </div>
                <CardTitle className="text-lg">
                  {t(`homepage.features.${key}.title`)}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t(`homepage.features.${key}.description`)}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
