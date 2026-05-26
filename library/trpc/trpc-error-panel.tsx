"use client";

import { isTRPCClientError } from "@trpc/react-query";
import { translateServiceErrorCode } from "@/library/i18n/translate-service-error-code";

function jsonStringifyValue(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

export interface TrpcErrorInfo {
  code?: string;
  details?: unknown;
  message: string;
}

/** Aligns with library/trpc/trpc.ts errorFormatter: data is { code, details }. */
export function parseTrpcError(err: unknown): TrpcErrorInfo {
  if (isTRPCClientError(err)) {
    const data = err.data as { code?: string; details?: unknown } | undefined;
    return {
      message: err.message,
      code: data?.code,
      details: data?.details,
    };
  }
  if (err instanceof Error) {
    return { message: err.message };
  }
  return { message: String(err) };
}

export interface TrpcErrorPanelLabels {
  title: string;
  hint: string;
  detailsLabel: string;
}

export function TrpcErrorPanel({
  error,
  t,
  labels,
}: {
  error: unknown;
  t: (key: string) => string;
  labels: TrpcErrorPanelLabels;
}) {
  const info = parseTrpcError(error);
  if (isTRPCClientError(error)) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-4 text-red-100/90">
        <p className="font-medium">{labels.title}</p>
        <p className="mt-2 text-red-100/70 text-sm leading-6">{labels.hint}</p>
        <p className="mt-3 text-red-100/85 text-sm leading-6">
          {translateServiceErrorCode(t, info.code)}
        </p>
        {info.details === undefined ? null : (
          <div className="mt-3">
            <p className="font-medium text-red-100/80 text-xs uppercase tracking-wide">
              {labels.detailsLabel}
            </p>
            <pre className="mt-1 overflow-x-auto rounded-lg border border-white/10 bg-slate-950/60 p-3 font-mono text-slate-300 text-xs leading-5">
              {jsonStringifyValue(info.details)}
            </pre>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-4 text-red-100/90">
      <p className="font-medium">{labels.title}</p>
      <p className="mt-2 text-red-100/70 text-sm leading-6">{labels.hint}</p>
      <pre className="mt-3 overflow-x-auto rounded-lg border border-white/10 bg-slate-950/60 p-3 font-mono text-slate-300 text-xs leading-5">
        {info.message}
      </pre>
    </div>
  );
}
