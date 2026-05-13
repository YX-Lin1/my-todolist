"use client";

import { Button } from "@surgeteam/design-system/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@surgeteam/design-system/components/ui/card";
import { useI18n } from "@surgeteam/i18n/use-i18n";
import Observability from "@surgeteam/observability";
import { useEffect } from "react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    Observability.captureException(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[min(60vh,calc(100dvh-8rem))] max-w-lg flex-col justify-center px-4 py-12 sm:px-6">
      <Card className="border-border">
        <CardHeader className="space-y-2">
          <p className="font-mono text-muted-foreground text-sm tracking-[0.2em]">
            500
          </p>
          <CardTitle className="text-balance">
            {t("error.boundary.unexpectedServer")}
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => reset()} type="button" variant="secondary">
            {t("error.boundary.retry")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
