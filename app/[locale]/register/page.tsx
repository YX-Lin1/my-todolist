"use client";

import { useI18n } from "@surgeteam/i18n/use-i18n";
import { useRouter } from "@surgeteam/i18n/navigation";
import { trpc } from "@/library/trpc/client";
import { toast } from "sonner";
import { Input } from "@/library/surge/design-system/components/ui/input";
import { Button } from "@/library/surge/design-system/components/ui/button";
import { parseTrpcError } from "@/app/components/trpc-error-panel";
import { isTRPCClientError } from "@trpc/react-query";
import { translateServiceErrorCode } from "@/library/i18n/translate-service-error-code";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@surgeteam/design-system/components/ui/form";
import { useForm } from "react-hook-form";

function RegisterFormSchema() {
  const {t} = useI18n();
  
  return z.object({
    account: z.string().trim().min(2, t("register.validationAccount")),
    password: z.string().trim().min(6, t("register.validationPassword")),
    confirmPassword: z.string().trim().min(6, t("register.validationConfirmPassword")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: t("register.passwordNotMatch"),
    path: ["confirmPassword"],
  });
}
  type RegisterFormValues = z.infer<ReturnType<typeof RegisterFormSchema>>;

export default function RegisterPage() {
  const { t } = useI18n();
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema()),
    defaultValues: {
      account: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = trpc.register.register.useMutation({
    onSuccess: () => {
      toast.success(t("register.success"));
      router.push("/");
    },
    onError: (error) => {
      if(isTRPCClientError(error)) {
        const errorInfo = parseTrpcError(error);
        toast.error(translateServiceErrorCode(t, errorInfo.code));
        return;
      }
      toast.error(t("error.codes.UNKNOWN"));
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate({data: data});
  };

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="account"
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("register.account")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-10 w-full rounded-md bg-white p-2 text-sm"
                  disabled={registerMutation.isPending}
                  placeholder={t("register.accountPlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("register.password")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-10 w-full rounded-md bg-white p-2 text-sm"
                  disabled={registerMutation.isPending}
                  placeholder={t("register.passwordPlaceholder")}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("register.confirmPassword")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-10 w-full rounded-md bg-white p-2 text-sm"
                  disabled={registerMutation.isPending}
                  placeholder={t("register.confirmPasswordPlaceholder")}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full rounded bg-[#39bd46ff] px-4 py-2 text-base text-white hover:bg-[#32a03c]"
          disabled={registerMutation.isPending}
          type="submit"
        >
          {registerMutation.isPending ? t("register.submitting") : t("register.submit")}
        </Button>
      </form>
    </Form>
    </>
    )
  }