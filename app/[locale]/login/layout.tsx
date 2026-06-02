import type{ ReactNode } from "react"
import { getI18n } from "@surgeteam/i18n/get-i18n";

export default async function LoginLayout({children}: {children: ReactNode}) {
  const {t} = await getI18n();
  return (
      <div className="flex min-h-screen w-full justify-center items-center">
        <div className="block py-[40px] px-[60px] rounded-lg bg-[#FCF7B963]">
          <p className="text-black text-[14px]">{t("login.welcomeBack")}</p>
          <h2 className="font-bold mr-[20px] mb-[20px] text-black text-[20px]">{t("login.title")}</h2>
        </div>
          {children}
      </div>
  )
}