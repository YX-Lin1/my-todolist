import "./register";
import type { getRequestConfig as getNextIntlRequestConfig } from "@surgeteam/i18n/adapters/next-intl/server";
import { getRequestConfig } from "@surgeteam/i18n/get-request-config";

const requestConfig: ReturnType<typeof getNextIntlRequestConfig> =
  getRequestConfig({
    loadMessages: async (locale: string): Promise<Record<string, string>> =>
      (await import(`@/config/locale/${locale}/index.ts`)).default,
  });

export default requestConfig;
