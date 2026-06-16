import components from "./components";
import demoUser from "./demo-user";
import error from "./error";
import homepage from "./homepage";
import seo from "./seo";
import timezonesData, { regions } from "./timezones";
import trpc from "./trpc";
import register from "./register";

export default {
  homepage,
  demoUser,
  error,
  components,
  seo,
  timezones: {
    ...timezonesData,
    regions,
  },
  trpc,
  register,
};
