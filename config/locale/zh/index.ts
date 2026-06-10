import components from "./components";
import demoUser from "./demo-user";
import error from "./error";
import homepage from "./homepage";
import login from "./login";
import seo from "./seo";
import timezonesData, { regions } from "./timezones";
import todolists from "./todolists";
import trpc from "./trpc";

export default {
  homepage,
  demoUser,
  error,
  components,
  login,
  seo,
  timezones: {
    ...timezonesData,
    regions,
  },
  todolists,
  trpc,
};
