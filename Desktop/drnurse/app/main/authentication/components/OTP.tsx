"use client";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import cookies from "js-cookie";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "@/app/components/FormInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/context/AuthContext";
import { Suspense, useState, useTransition } from "react";
import Spinner from "@/app/components/Spinner";
import { useDevice } from "@/app/context/DeviceContext";

import Paragraph from "@/app/components/Paragraph";
import { useTranslations } from "next-intl";
import { Server } from "../../Server";

export function InputOTPPattern({
  handleSend,
  sendType,
  setServerError,
  forgot = false,
  tfa,
  email,
  activate,
  revalidate,
  phone,
  country_key,
}: {
  handleSend: any;
  sendType: string;
  setServerError?: any;
  forgot?: boolean;
  tfa?: boolean;
  email?: boolean;
  activate?: boolean;
  revalidate?: any;
  phone?: boolean;
  country_key?: string;
}) {
  const { setLogin } = useAuth();
  const [timer, setTimer] = useState(true);
  const otpSchema = z.object({
    code: z.string().min(6).max(6),
    password: !forgot
      ? z.string().optional()
      : z
          .string()
          .min(8, "Password must be at least 8 characters")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
          .regex(/[0-9]/, "Password must contain at least one number")
          .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  });
  const form = useForm<z.infer<typeof otpSchema>>({ resolver: zodResolver(otpSchema) });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { deviceInfo } = useDevice();
  const t = useTranslations();
  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    startTransition(async () => {
      const res = await Server({
        resourceName: forgot
          ? "reset"
          : tfa
          ? "tfaValidate"
          : email || phone
          ? "update_profile"
          : activate
          ? "tfaActivate"
          : "validate",
        id: searchParams.get("uuid") || "",
        body: {
          send_type: sendType,
          send_by: sendType,
          code: data.code,
          uuid: searchParams.get("uuid"),
          username: searchParams.get("username"),
          type: activate ? "verify" : searchParams.get("level"),
          password: forgot && data.password,
          email_code: email && data.code,
          tfa: activate && "1",
          email_uuid: email && searchParams.get("uuid"),
          email: email && searchParams.get("email"),
          device_info: deviceInfo,
          phone: phone && searchParams.get("phone"),
          phone_uuid: phone && searchParams.get("uuid"),
          phone_code: phone && data.code,
          country_key: phone && country_key,
        },
      });
      console.log(res);
      if (!res.status) setServerError(res.message);
      if (res.status) {
        if (res.token) cookies.set("jwt", res.token);
        setLogin(true);
        toast.success(res.message);
        const updatedParams = new URLSearchParams(searchParams.toString());
        ["username", "uuid", "level", "email"].forEach((p) => updatedParams.delete(p));
        if (activate) return;
        if (email || phone) {
          setLogin((l: boolean) => !l);
          return router.push(`?${updatedParams.toString()}`, { scroll: false });
        }
        forgot ? router.push("/login") : router.push("/");
      }
    });
  };
  return (
    <Suspense>
      <div className="flex flex-col items-center mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("validation")}</FormLabel>
                  <FormControl>
                    <InputOTP pattern={REGEXP_ONLY_DIGITS} maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        {<InputOTPSlot index={5} />}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>{t("validation_code")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {forgot && <FormInput name="password" control={form.control} placeholder={t("password")} password />}
            <div className="mt-4 flex items-center gap-2">
              {!activate && (
                <Button
                  onClick={(e: any) => {
                    handleSend(sendType);
                    setTimer(true);
                  }}
                >
                  {t("resend_code")}
                </Button>
              )}
              <Button disabled={isPending} className=" rounded-full px-8" type="submit">
                {isPending ? <Spinner /> : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Suspense>
  );
}
