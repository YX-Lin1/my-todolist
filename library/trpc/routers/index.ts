import { router } from "../trpc";
import { usersRouter } from "./users/users-router";
import { todolistsRouter } from "./todolists/todolists-router";
import { loginRouter } from "./login/login-router";

export const appRouter = router({
  users: usersRouter,
  todolists: todolistsRouter,
  login: loginRouter,
});

export type AppRouter = typeof appRouter;
