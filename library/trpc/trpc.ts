import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { isServiceError } from "../services/error";
import { ServiceErrorCodes } from "../services/error-codes";
import type { Context } from "./context";

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    if (
      error instanceof TRPCError &&
      error.cause !== undefined &&
      isServiceError(error.cause)
    ) {
      return {
        ...shape,
        data: {
          code: error.cause.code,
          message: error.cause.message,
          details: error.cause.details,
        },
      };
    }

    return {
      ...shape,
      data: {
        code: ServiceErrorCodes.INTERNAL_ERROR,
        message: undefined,
        details: undefined,
      },
    };
  },
});

// Base router and procedure helpers
export const { createCallerFactory, router, procedure } = t;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);