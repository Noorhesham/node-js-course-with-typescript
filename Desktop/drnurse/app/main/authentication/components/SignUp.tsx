"use client";
import Section from "@/app/components/Section";
import { useState, useTransition } from "react";
import CustomForm from "@/app/components/CustomForm";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/schema";
import { Server } from "../../Server";
import { useDevice } from "@/app/context/DeviceContext";
import Logo from "@/app/components/Logo";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { useLocalStorageState } from "@/app/hooks/useLocalStorageState";
const signupArray = [
  {
    name: "phone",
    placeholder: "Add Your Phone...",
    phone: true,
  },
  {
    name: "sms",
    label: "ACTIVE BY SMS",
    label2: "ACTIVE BY WHATSAPP",
    switchToggle: true,
  },
  {
    name: "password",
    type: "password",
    password: true,
    placeholder: "Add Your Password...",
  },
  {
    name: "name",
    placeholder: "Add Your Name...",
  },
  {
    name: "email",
    placeholder: "Add Your Email...",
    optional: true,
  },

  {
    name: "referealCode",
    optional: true,
    placeholder: "REFERRAL CODE ...",
  },
];

const Signup = () => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      useEmail: true,
      email: "",
      name: "",
      password: "",
      referealCode: "",
      sms: false,
      phone: "",
    },
    mode: "onChange",
  });
  const [serverError, setServerError] = useState<string[] | null>(null);
  const { deviceInfo } = useDevice();
  const [isPending, startTransition] = useTransition();
  const [methods, setMethods] = useLocalStorageState([], "methods");
  console.log(deviceInfo);
  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    startTransition(async () => {
      const res = await Server({
        resourceName: "signup",
        body: {
          ...data,
          device_info: deviceInfo,
        },
      });
      if (!res.status) setServerError(res.errors);
      if (res.status) {
        console.log(deviceInfo, data.phone, data.email, data.password);
        setServerError(null);
        const res = await Server({
          resourceName: "login",
          body: {
            username: data.phone || data.email,
            password: data.password,
            device_info: deviceInfo,
          },
          headers: {
            "device-unique-id": deviceInfo.device_unique_id,
            Accept: "application/json",
          },
        });
        if (res.activation_methods) {
          console.log(res);
          setMethods(res.activation_methods);
          toast.success(`${res.message} ...`);
          redirect(`/login?uuid=${res.activation_uuid}`);
        }
      }
    });
  };
  return (
    <Section CustomePadding="px-5 py-10 " className=" bg-gray-50 flex flex-1 justify-center  flex-col items-center">
      <div className=" mx-auto flex flex-col items-center justify-center  w-full  ">
        <Logo  isdark/>
        <h1 className=" text-center text-2xl  mt-5 font-bold text-main2">CREATE NEW ACCOUNT</h1>
        <div className=" w-full  px-5 md:px-14 flex flex-col ">
          <CustomForm
            btnStyles=" w-full"
            isPending={isPending}
            serverError={serverError}
            btnText="CREATE"
            form={form}
            inputs={signupArray}
            onSubmit={onSubmit}
          />
          <div className="  mt-4 text-sm flex items-center">
            <span className=" font-[400] text-main2 ">ALREADY ON ORIENT ?</span>
            <Link href={"/login"} className=" hover:underline duration-150 ml-1 text-main font-[700]">
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Signup;
