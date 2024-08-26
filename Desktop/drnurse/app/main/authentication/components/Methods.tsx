import Head1 from "@/app/components/Head1";
import { ArrowRight } from "@/app/components/Icons";
import Link from "next/link";
import React, { Suspense } from "react";

const Methods = ({
  handleSend,
  message,
  methods,
  tfa,
}: {
  handleSend: (type: string) => void;
  message: string;
  methods: { email: string; sms: string; apps: any; auth_app: any };
  tfa?: string;
}) => {
  return (
    <Suspense>
      <h1 className=" text-center text-xl md:text-2xl mt-8 font-bold text-main2">{message}</h1>
      <div>
        {methods.email && (
          <div
            onClick={() => handleSend("email")}
            className=" flex cursor-pointer hover:border-main  hover:bg-gray-50 duration-100 flex-col gap-3 bg-white py-4 px-8 rounded-2xl border border-input items-center mt-5"
          >
            <Head1 text={tfa === "true" ? "SEND TFA CODE TO " : "SEND PASSWORD RESET EMAIL TO :"} />
            <p className=" text-main2 font-medium text-base">{methods.email}</p>
          </div>
        )}
        {methods.sms && (
          <div
            onClick={() => handleSend("sms")}
            className=" flex cursor-pointer hover:border-main  hover:bg-gray-50 duration-100 flex-col gap-3 bg-white py-4 px-8 rounded-2xl border border-input items-center mt-5"
          >
            <Head1 text={tfa === "true" ? "SEND TFA CODE TO " : "SEND PASSWORD RESET SMS TO :"} />
            <p className=" text-main2 font-medium text-base">{methods.sms}</p>
          </div>
        )}
        {methods.auth_app && (
          <div
            onClick={() => handleSend("auth_app")}
            className=" flex cursor-pointer hover:border-main  hover:bg-gray-50 duration-100 flex-col gap-3 bg-white py-4 px-8 rounded-2xl border border-input items-center mt-5"
          >
            <Head1 text={tfa === "true" ? "SEND TFA CODE TO " : "SEND PASSWORD RESET SMS TO :"} />
            <p className=" text-main2 font-medium text-base">Auth app</p>
          </div>
        )}
        <div className="  mt-8 text-sm flex items-center">
          <Link
            href={"/login"}
            className="flex text-center items-center gap-2 hover:underline duration-150 ml-1 text-main font-[700]"
          >
            BACK TO LOGIN <ArrowRight />
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

export default Methods;
