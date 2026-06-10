"use client";

import { useState } from "react"
import { Button } from "@surgeteam/design-system/components/ui/button";
import { Input } from "@surgeteam/design-system/components/ui/input";
import { useI18n } from "@surgeteam/i18n/use-i18n";
import { TrpcErrorPanel } from "@/app/components/trpc-error-panel";
import { trpc } from "@/library/trpc/client";
import { Link, useRouter } from "@surgeteam/i18n/navigation";

export default function LoginPage() {
  const {t} = useI18n();
  const router = useRouter();

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const loginMutation = trpc.login.login.useMutation({
    onSuccess: async (result) => {
      localStorage.setItem("loginAccount", result.user.account);

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: result.token }),
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      router.push("/todolists"); 
    },
  });

  const errorLabels = {
    title: t("login.errorTitle"),
    hint: t("login.errorHint"),
  }

  const handleLogin = async () => {
    if (!account || !password) {
      setValidationError(t("login.validationEmpty"));
      return;
    }

    setValidationError("");
    loginMutation.mutate({
      data: {
        account,
        password,
      },
    });
  };

  return (
    <>
      {validationError ? (
        <p className="mb-2 text-red-600 text-sm">{validationError}</p>
      ) : null}

      {loginMutation.isError ? (
        <div className="mb-4">
          <TrpcErrorPanel
            error={loginMutation.error}
            labels={{
              ...errorLabels,
              detailsLabel: t("login.errorDetailsLabel"),
            }}
            t={t}
          />
        </div>
      ) : null}

      <div className="mb-5">
        <span className="mb-2 block font-bold text-black text-sm">
          {t("login.account")}
        </span>
        <Input
          className="h-10 w-full rounded-md bg-white p-2 text-sm"
          disabled={loginMutation.isPending}
          placeholder={t("login.accountPlaceholder")}
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <span className="mb-2 block font-bold text-black text-sm">
          {t("login.password")}
        </span>
        <Input
          className="h-10 w-full rounded-md bg-white p-2 text-sm"
          disabled={loginMutation.isPending}
          placeholder={t("login.passwordPlaceholder")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
      </div>

      <Button
        className="w-full rounded bg-[#39bd46ff] px-4 py-2 text-base text-white hover:bg-[#32a03c]"
        disabled={loginMutation.isPending}
        onClick={handleLogin}
        size="lg"
        type="button"
      >
        {loginMutation.isPending ? t("login.submitting") : t("login.submit")}
      </Button>

      <div className="mt-[10px] flex items-center justify-between text-[14px]">
        <span className="text-black/50">{t("login.noAccount")}</span>
        <Link className="underline text-black/70" href="/">
          {t("login.goRegister")}
        </Link>
      </div>
    </>
  ); 
}