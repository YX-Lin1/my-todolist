import { withAnalyticsConfig } from "@surgeteam/analytics/next-config";
import { withI18nConfig } from "@surgeteam/i18n/next-config";
import { baseConfig } from "@surgeteam/next-config";
import { withObservabilityConfig } from "@surgeteam/observability/next-config";

import "./env";

const createNextConfig = async () => {
  let nextConfig = baseConfig;
  // Ensure local @surgeteam packages are transpiled (they ship TS sources)
  nextConfig = {
    ...nextConfig,
    transpilePackages: [
      // preserve existing list if present
      ...(Array.isArray((nextConfig as any).transpilePackages)
        ? (nextConfig as any).transpilePackages
        : []),
      "@surgeteam/analytics",
      "@surgeteam/di",
      "@surgeteam/http-client",
      "@surgeteam/i18n",
      "@surgeteam/next-config",
      "@surgeteam/observability",
      "@surgeteam/security",
      "@surgeteam/seo",
      "@surgeteam/typescript-config",
    ],
  };

  nextConfig = await withObservabilityConfig(nextConfig);

  nextConfig = await withAnalyticsConfig(nextConfig);

  nextConfig = await withI18nConfig(nextConfig, "./library/i18n/request.ts");

  return nextConfig;
};

export default createNextConfig;
