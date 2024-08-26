"use client";
import Logo from "@/app/components/Logo";
import Section from "@/app/components/Section";
import { ArrowRight } from "@/app/components/Icons";
import React, { startTransition, Suspense, useEffect, useState } from "react";
import { useParams } from "@/app/hooks/useParams";
import Prepare from "./Prepare";
import Link from "next/link";
import { Server } from "../../Server";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Methods from "./Methods";
import { InputOTPPattern } from "./OTP";
import { useLocalStorageState } from "@/app/hooks/useLocalStorageState";
import Spinner from "@/app/components/Spinner";

const ResetPassword = () => {
  const [param, handleParam, deleteParam] = useParams("level", "prepare");
  const searchParams = useSearchParams();
  const [methods, setMethods] = useLocalStorageState("methods", ""); //local or not
  const [message, setMessage] = useState<string | null>(null);
  const [server, setServerError] = useState<string | null>(null);
  const [type, setType] = useState<string | null>("");
  useEffect(() => {
    if (!methods) {
      deleteParam("uuid");
      deleteParam("username");
      handleParam("prepare");
    }
  }, [methods]);
  const handleSend = async (sendType?: string) => {
    startTransition(async () => {
      const res = await Server({
        resourceName: "reset",
        body: {
          type: "forgot",
          uuid: searchParams.get("uuid"),
          username: searchParams.get("username"),
          send_type: sendType,
        },
      });
      handleParam("code");
      setType(sendType || "");
      console.log(res);
      if (!res.status) setServerError(res.message);
      if (res.status) toast.success(res.message);
    });
  };
  return (
    <Suspense fallback={<Spinner />}>
      <Section CustomePadding="px-5 py-40" className=" bg-gray-50 justify-center flex flex-1  flex-col items-center">
        <div className=" mx-auto flex flex-col items-center justify-center  w-full  ">
          <Logo size={{ width: 863, height: 338 }} type="blue" />
          <h1 className=" text-center text-2xl mt-8 font-bold text-main2">FORGOT PASSWORD</h1>
          {param === "prepare" && <Prepare setMessage={setMessage} handleParam={handleParam} setMethods={setMethods} />}
          {param === "forgot" && <Methods message={message || ""} handleSend={handleSend} methods={methods} />}
          {server && <p className="text-red-500  mx-auto text-center mt-5 text-sm font-semibold">{server}</p>}
          {param === "code" && (
            <InputOTPPattern
              forgot={true}
              sendType={type || ""}
              handleSend={handleSend}
              setServerError={setServerError}
            />
          )}
          <div className="  mt-8 text-sm flex items-center">
            <Link
              href={"/login"}
              className="flex items-center gap-2 hover:underline duration-150 ml-1 text-main font-[700]"
            >
              BACK TO LOGIN <ArrowRight />
            </Link>
          </div>
        </div>
      </Section>
    </Suspense>
  );
};

export default ResetPassword;
