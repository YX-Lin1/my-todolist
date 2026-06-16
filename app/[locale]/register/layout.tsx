import type { ReactNode } from "react";
import { getI18n } from "@surgeteam/i18n/get-i18n";

export default async function RegisterLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { t } = await getI18n();
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-[#FCF7B963] px-[60px] py-[40px]">
        <h2 className="mb-5 font-bold text-[20px] text-black">
          {t("register.title")}
        </h2>
        {children}
      </div>
    </div>
  );
}