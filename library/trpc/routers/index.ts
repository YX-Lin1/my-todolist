import { router } from "../trpc";
import { todolistsRouter } from "./todolists/todolists-router";
import { loginRouter } from "./login/login-router";
import { registerRouter } from "./register/register";

export const appRouter = router({
  todolists: todolistsRouter,
  login: loginRouter,
  register: registerRouter,
});

export type AppRouter = typeof appRouter;
