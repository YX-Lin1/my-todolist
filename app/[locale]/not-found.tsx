import { Button } from "@surgeteam/design-system/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@surgeteam/design-system/components/ui/card";
import { getI18n } from "@surgeteam/i18n/get-i18n";
import { Link } from "@surgeteam/i18n/navigation";

export default async function LocaleNotFound() {
  const { t } = await getI18n();

  return (
    <div className="mx-auto flex min-h-[min(60vh,calc(100dvh-8rem))] max-w-lg flex-col justify-center px-4 py-12 sm:px-6">
      <Card className="border-border">
        <CardHeader className="space-y-2">
          <p className="font-mono text-muted-foreground text-sm tracking-[0.2em]">
            404
          </p>
          <CardTitle className="text-balance">{t("error.notFound.title")}</CardTitle>
          <CardDescription className="text-base leading-relaxed">
            {t("error.notFound.lead")}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild variant="secondary">
            <Link href="/">{t("error.notFound.backHome")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
