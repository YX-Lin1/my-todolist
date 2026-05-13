import "@/library/i18n/register";
import type { GlobalMiddlewareConfig, MiddlewareConfig } from "@rescale/nemo";
import { createNEMO } from "@rescale/nemo";
import { analyticsSecurityOptions } from "@surgeteam/analytics/proxy";
import { createI18nMiddleware } from "@surgeteam/i18n/proxy";
import { observabilitySecurityOptions } from "@surgeteam/observability/proxy";
import type { Source as noseconeSource } from "@surgeteam/security/adapters/nosecone";
import {
  createSecurityMiddleware,
  mergeSecurityOptions,
  type SecurityOptions,
} from "@surgeteam/security/proxy";
import { env } from "./env";

const I18N_PATHNAME_REGEX = /^\/((?!monitoring|api|trpc).*)$/;

// In dev, HTTP + LAN IP is not a secure context; omit COOP / Origin-Agent-Cluster to avoid noisy console warnings.
const devSecurityRelax: SecurityOptions =
  process.env.NODE_ENV === "development"
    ? {
        crossOriginOpenerPolicy: false,
        originAgentCluster: false,
      }
    : {};

// If you want to merge multiple security options, you can use the following code.
const securityOptions = mergeSecurityOptions(
  analyticsSecurityOptions,
  observabilitySecurityOptions,
  {
    contentSecurityPolicy: {
      directives: {
        connectSrc: [
          env.NEXT_PUBLIC_MAIN_API_URL as noseconeSource,
          env.NEXT_PUBLIC_JSONPLACEHOLDER_API_URL as noseconeSource,
        ],
      },
    },
  },
  devSecurityRelax
);

// Middleware configuration
const globalMiddleware: GlobalMiddlewareConfig = {
  before: [
    // security middleware
    async (request) => {
      const securityMiddleware = createSecurityMiddleware(securityOptions);
      return await securityMiddleware(request);
    },

    // i18n middleware
    async (request) => {
      if (I18N_PATHNAME_REGEX.test(request.nextUrl.pathname)) {
        const i18nMiddleware = createI18nMiddleware();
        return await i18nMiddleware(request);
      }
    },
  ],
};

const middlewares: MiddlewareConfig = {};

export default createNEMO(middlewares, globalMiddleware);

export const config = {
  matcher: ["/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)"],
};
