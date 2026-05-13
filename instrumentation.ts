import { analyticsServerRegister } from "@surgeteam/analytics/instrumentation";
import { observabilityServerRegister } from "@surgeteam/observability/instrumentation";

export const register = async () => {
  await analyticsServerRegister();

  await observabilityServerRegister();
};
