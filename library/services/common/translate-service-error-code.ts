import { ServiceErrorCodes } from "@/library/services/error-codes";

const SERVICE_ERROR_CODE_VALUES = new Set<string>(
  Object.values(ServiceErrorCodes)
);

/**
 * Maps a service / API error code to the matching `error.codes.*` message.
 * Unknown or missing codes resolve to `error.codes.UNKNOWN`.
 */
export function translateServiceErrorCode(
  t: (key: string) => string,
  code: string | undefined
): string {
  if (code != null && code !== "" && SERVICE_ERROR_CODE_VALUES.has(code)) {
    return t(`error.codes.${code}`);
  }
  return t("error.codes.UNKNOWN");
}
