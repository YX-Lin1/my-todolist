"use client";

import { Button } from "@surgeteam/design-system/components/ui/button";
import { Input } from "@surgeteam/design-system/components/ui/input";
import { useI18n } from "@surgeteam/i18n/use-i18n";
import { TrpcErrorPanel } from "@/app/components/trpc-error-panel";
import { trpc } from "@/library/trpc/client";
import { Link, useRouter } from "@surgeteam/i18n/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@surgeteam/design-system/components/ui/form";

function LoginFormSchema() {
  const {t} = useI18n();
  return z.object({
    account: z.string().trim().min(2, t("login.validationAccount")),
    password: z.string().trim().min(8, t("login.validationPassword")),
  });
}
type LoginFormValues = z.infer<ReturnType<typeof LoginFormSchema>>;

export default function LoginForm() {
  const {t} = useI18n();
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema()),
    defaultValues: {
      account: "",
      password: "",
    },
  });

  const loginMutation = trpc.login.login.useMutation({
    onSuccess: async (result) => {
      localStorage.setItem("loginAccount", result.user.account);
      router.push("/todolists"); 
    },
  });

  const errorLabels = {
    title: t("login.errorTitle"),
    hint: t("login.errorHint"),
  }

  const onSubmit = async (data: LoginFormValues) => {
    loginMutation.mutate({
      data: data,
    });
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <>
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

     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("login.account")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-10 w-full rounded-md bg-white p-2 text-sm"
                  disabled={loginMutation.isPending}
                  placeholder={t("login.accountPlaceholder")}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("login.password")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-10 w-full rounded-md bg-white p-2 text-sm"
                  disabled={loginMutation.isPending}
                  placeholder={t("login.passwordPlaceholder")}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full rounded bg-[#39bd46ff] px-4 py-2 text-base text-white hover:bg-[#32a03c]"
          disabled={loginMutation.isPending}
          type="submit"
        >
          {loginMutation.isPending ? t("login.submitting") : t("login.submit")}
        </Button>
      </form>
    </Form>

      <div className="mt-[10px] flex items-center justify-between text-[14px]">
        <span className="text-black/50">{t("login.noAccount")}</span>
        <Link className="underline text-black/70" href="/register" onClick={handleRegister}>
          {t("login.goRegister")}
        </Link>
      </div>
    </>
  ); 
}