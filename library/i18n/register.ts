import {
  registerCurrencyFormats,
  registerDateTimeFormats,
  registerListFormats,
  registerNumberFormats,
  registerRelativeTimeFormats,
  registerRoutingConfig,
  registerTimezoneConfig,
} from "@surgeteam/i18n/register-configs";
import { currencyFormats } from "@/config/formats/currency-formats";
import { dateTimeFormats } from "@/config/formats/date-time-formats";
import { listFormats } from "@/config/formats/list-formats";
import { numberFormats } from "@/config/formats/number-formats";
import { relativeTimeFormats } from "@/config/formats/relative-time-formats";
import { defaultLocale, locales } from "@/config/locale/locales";
import { defaultTimezone } from "@/config/timezone";
import { timezones } from "@/config/timezone/timezones";

registerCurrencyFormats(currencyFormats);
registerDateTimeFormats(dateTimeFormats);
registerListFormats(listFormats);
registerNumberFormats(numberFormats);
registerRelativeTimeFormats(relativeTimeFormats);
registerRoutingConfig({
  defaultLocale,
  locales,
  localePrefix: "as-needed",
  localeCookie: {},
  pathnames: {},
});
registerTimezoneConfig({ defaultTimezone, timezones, timezoneCookie: {} });
