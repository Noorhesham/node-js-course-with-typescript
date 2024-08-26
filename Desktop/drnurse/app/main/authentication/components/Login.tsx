"use client";
import React, { Suspense, useLayoutEffect, useState, useTransition } from "react";
import Section from "@/app/components/Section";
import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/schema";
import CustomForm from "@/app/components/CustomForm";
import Link from "next/link";
import { Server } from "../../Server";
import Logo from "@/app/components/Logo";
import { useDevice } from "@/app/context/DeviceContext";
import Socials from "@/app/components/Socials";
import { toast } from "react-toastify";
import cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "@/app/hooks/useParams";
import { useLocalStorageState } from "@/app/hooks/useLocalStorageState";
import Methods from "./Methods";
import { InputOTPPattern } from "./OTP";
import { useAuth } from "@/app/context/AuthContext";
import { useTranslations } from "next-intl";

const Login = () => {
  const t = useTranslations();
  const [useEmail, setUseEmail] = useState(false);
  const [activate, setActivate] = useState(false);
  const [methods, setMethods] = useLocalStorageState([], "methods");
  const [message, setMessage] = useLocalStorageState("", "message");
  const [isCode, setIsCode] = useState("");
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      useEmail: false,
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  const [param, handleParam] = useParams("uuid", "");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { deviceInfo } = useDevice();
  const [serverError, setServerError] = useState<string[] | string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { setLogin } = useAuth();
  useLayoutEffect(() => {
    if (param !== "") setActivate(true);
  }, [param]);
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      try {
        const res = await Server({
          resourceName: "login",
          body: {
            ...data,
            device_info: deviceInfo,
          },
          headers: {
            "device-unique-id": deviceInfo.device_unique_id,
            Accept: "application/json",
          },
        });
        console.log(res);
        if (!res.status) setServerError(res.errors?.length > 0 ? res.errors : res.message);
        if (res.status) {
          setServerError(null);
          toast.done(`${res.message} ...`);
          if (res.require_activation || res.tfa) {
            setActivate(true);
            if (res.require_activation) handleParam(res.activation_uuid, "uuid");
            setMethods(res.activation_methods || res.tfa_methods);
            if (res.tfa) {
              const updatedParams = new URLSearchParams(searchParams);
              updatedParams.set("tfa", "true");
              updatedParams.set("uuid", res.tfa_uuid);
              router.push(`?${updatedParams.toString()}`, { scroll: false });
            }
            setMessage(res.message);
          }
          if (!res.require_activation && !res.tfa) {
            cookies.set("jwt", res.token);
            setLogin(true);
            router.push(redirect || "/");
          }
        }
      } catch (error: any) {
        setServerError("Unexpected Error");
      }
    });
  };
  const handleSend = async (sendType?: string) => {
    const res = await Server({
      resourceName: searchParams.get("tfa") === "true" ? "tfaSend" : "verify",
      id: param,
      body: {
        send_by: sendType,
      },
    });
    console.log(res);
    if (!res.status)
      setServerError(
        Array.isArray(res.errors) && res.errors.length > 0 ? res.errors : res.errors.send_by || res.message
      );
    if (res.status) {
      setServerError(null);
      toast.success(res.message);
      setIsCode(sendType || "");
    }
  };
  const loginArray = [
    {
      name: "username",
      placeholder: useEmail ? t("email") : t("phone"),
      phone: !useEmail,
    },
    {
      name: "password",
      type: "password",
      password: true,
      noProgress: true,
      placeholder: t("password"),
    },
  ];
  return (
    <Section CustomePadding="px-5 py-20" className="bg-gray-50 justify-center flex flex-1 flex-col items-center">
      <div className="mx-auto flex flex-col items-center justify-center w-full">
        <Logo isdark />
        {!activate && (
          <>
            <h1 className="text-center text-xl md:text-2xl mt-8 font-bold text-main2">{t("login")}</h1>
            <div className="w-full mt-5 px-5 lg:px-14 flex flex-col">
              <div className="text-main2 self-center mx-auto text-base flex items-center gap-2">
                <p className="text-main2 font-medium text-sm">{t("loginWithPhone")}</p>
                <Switch
                  noSwitch={true}
                  checked={useEmail}
                  onCheckedChange={() => {
                    setUseEmail((e) => !e);
                    form.setValue("useEmail", !useEmail);
                  }}
                />
                <p className="text-main2 font-medium text-sm">{t("loginWithEmail")}</p>
              </div>
              <CustomForm
                serverError={serverError}
                link="/forgot-password?level=prepare"
                linkText={t("forgotPassword")}
                btnText="LOGIN"
                isPending={isPending}
                form={form}
                inputs={loginArray}
                btnStyles=" w-full"
                onSubmit={onSubmit}
              >
                <Controller
                  name="useEmail"
                  control={form.control}
                  //@ts-ignore
                  render={({ field }) => <input type="hidden" {...field} value={useEmail} />}
                />
              </CustomForm>

              <Socials />
            </div>
            <div className="mt-8 text-sm flex flex-col gap-2 md:gap-0 md:flex-row items-center">
              <span className="font-[400] text-main2">{t("dontHaveAccount")}</span>
              <Link href="/signup" className="hover:underline duration-150 ml-1 text-main font-[700]">
                {" "}
                {t("createAccount")}{" "}
              </Link>
            </div>
          </>
        )}{" "}
        <Suspense>
          {activate && !isCode && (
            <Methods tfa={searchParams.get("tfa") || ""} handleSend={handleSend} message={message} methods={methods} />
          )}
          {isCode !== "" && activate && (
            <InputOTPPattern
              forgot={false}
              tfa={Boolean(searchParams.get("tfa") === "true")}
              setServerError={setServerError}
              sendType={isCode}
              handleSend={handleSend}
            />
          )}
        </Suspense>
        {serverError && <p className="text-red-500 text-center mt-3 text-sm font-semibold">{serverError}</p>}
      </div>
    </Section>
  );
};

export default Login;
