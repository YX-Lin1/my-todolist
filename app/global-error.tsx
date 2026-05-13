"use client";

import { Button } from "@surgeteam/design-system/components/ui/button";
import Observability from "@surgeteam/observability";
import { useEffect } from "react";

import "./[locale]/styles.css";

const MESSAGE = "The server encountered an error. Please try again later.";
const RETRY = "Try again";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Observability.captureException(error);
  }, [error]);

  return (
    <html className="dark" lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
          <p className="font-mono text-muted-foreground text-sm tracking-[0.2em]">
            500
          </p>
          <h1 className="mt-4 font-bold text-2xl text-foreground tracking-tight sm:text-3xl">
            {MESSAGE}
          </h1>
          <Button className="mt-8" onClick={() => reset()} type="button" variant="secondary">
            {RETRY}
          </Button>
        </div>
      </body>
    </html>
  );
}
