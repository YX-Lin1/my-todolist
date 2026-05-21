import { router } from "../trpc";
import { usersRouter } from "./users/users-router";
import { todolistsRouter } from "./todolists/todolists-router";

export const appRouter = router({
  users: usersRouter,
  todolists: todolistsRouter,
});

export type AppRouter = typeof appRouter;
