"use client";

import { useI18n } from "@surgeteam/i18n/use-i18n";
import { useRouter } from "@surgeteam/i18n/navigation";
import { trpc } from "@/library/trpc/client";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/library/surge/design-system/components/ui/input";
import { Button } from "@/library/surge/design-system/components/ui/button";

export default function RegisterPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerMutation = trpc.register.register.useMutation({
    onSuccess: () => {
      toast.success(t("register.success"));
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRegister = () => {
    if (password !== confirmPassword) {
      toast.error(t("register.passwordNotMatch"));
      return;
    }
    registerMutation.mutate({
      data: {
        account,
        password,
        confirmPassword,
      },
    });
  };

  return (
    <>
      <div className="mb-5">
        <span className="mb-2 block font-bold text-black text-sm">
          {t("register.account")}
        </span>
        <Input
          className="h-10 w-full rounded-md bg-white p-2 text-sm"
          disabled={registerMutation.isPending}
          placeholder={t("register.accountPlaceholder")}
          type="account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
        />
      </div>

      <div className="mb-5">
        <span className="mb-2 block font-bold text-black text-sm">
          {t("register.password")}
        </span>
        <Input
          className="h-10 w-full rounded-md bg-white p-2 text-sm"
          disabled={registerMutation.isPending}
          placeholder={t("register.passwordPlaceholder")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
        />
      </div>

      <div className="mb-5">
        <span className="mb-2 block font-bold text-black text-sm">
          {t("register.confirmPassword")}
        </span>
        <Input
          className="h-10 w-full rounded-md bg-white p-2 text-sm"
          disabled={registerMutation.isPending}
          placeholder={t("register.confirmPasswordPlaceholder")}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
        />
      </div>

      <Button
        className="w-full rounded bg-[#39bd46ff] px-4 py-2 text-base text-white hover:bg-[#32a03c]"
        disabled={registerMutation.isPending}
        onClick={handleRegister}
        size="lg"
        type="button"
      >
        {registerMutation.isPending ? t("register.submitting") : t("register.submit")}
      </Button>
    </>
    )
  }