import { cookies } from "next/headers";
import { createAppContainer } from "@/library/di/container";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "MY-TOKEN";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  let isAuthenticated = false;

  if(token) {
    try {
    const container = createAppContainer();
      await container.services.getLoginService().checkToken({ data: { token } });
      isAuthenticated = true;
    } catch {
    }
  }

  if(isAuthenticated) {
    redirect("/todolists");
  }
  else {
    redirect("/login");
  }

  return (
    <></>
  );
}