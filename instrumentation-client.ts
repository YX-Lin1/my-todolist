import { analyticsClientRegister } from "@surgeteam/analytics/instrumentation-client";
import {
  observabilityClientRegister,
  onObservabilityRouterTransitionStart,
} from "@surgeteam/observability/instrumentation-client";

await analyticsClientRegister();

await observabilityClientRegister();

export const onRouterTransitionStart = async (
  url: string,
  navigationType: string
) => {
  await onObservabilityRouterTransitionStart(url, navigationType);
};
