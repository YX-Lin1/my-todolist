import { keys as analytics } from "@surgeteam/analytics/keys";
import { keys as i18n } from "@surgeteam/i18n/keys";
// import { keys as auth } from "@surgeteam/auth/keys";
import { keys as core } from "@surgeteam/next-config/keys";
import { keys as observability } from "@surgeteam/observability/keys";
import { keys as security } from "@surgeteam/security/keys";
import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
  extends: [analytics(), core(), observability(), security(), i18n()],
  server: {},
  client: {
    NEXT_PUBLIC_MAIN_API_URL: z.url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_MAIN_API_URL: process.env.NEXT_PUBLIC_MAIN_API_URL,
  },
});
