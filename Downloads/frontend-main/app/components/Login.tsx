"use client";
import React, { useState, useTransition } from "react";
import Logo from "./Logo";
import Section from "./defaults/Section";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "./forms/CustomForm";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { loginSchema } from "../schemas";
import { login } from "../actions/action";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useRouter } from "next/navigation";
const loginArray = [
  {
    name: "Email",
    placeholder: "البريد الالكتروني",
    label: "البريد الالكتروني",
  },
  {
    name: "Password",
    type: "password",
    password: true,
    noProgress: true,
    placeholder: "كلمة المرور",
    label: "كلمة المرور",
  },
];
const Login = () => {
  const [serverError, setServerError] = useState();
  const form = useForm({
    resolver: zodResolver(loginSchema),

    mode: "onChange",
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log(data);
    startTransition(async () => {
      try {
        // const res = await axios.post(`${BASE_URL}Authentication/Login`, data);
        const res = await login(data);
        console.log("Login Response:", res);
        if (res.isSucceeded) toast.success("تم تسجيل الدخول بنجاح");
        if (res.roles.includes("Patient")) return router.push("/");
        if (res.roles.includes("Doctor")) return router.push("/clincs");
      } catch (err: any) {
        console.error("Error:", err);
        setServerError(err.message);
      }
    });
  };
  return (
    <Section CustomePadding="px-5 py-20" className="bg-gray-50 justify-center flex flex-1 flex-col items-center">
      <div className="mx-auto flex flex-col items-center justify-center w-full">
        <Logo size="lg" />

        <h1 className="text-center text-xl md:text-2xl mt-8 font-bold text-main2">تسجيل الدخول </h1>
        <div className="w-full gap-3 mt-5 px-5 lg:px-14 flex flex-col">
          <CustomForm
            serverError={serverError}
            link="/forgot-password"
            linkText="نسيت كلمة المرور ؟"
            btnText="سجل الان"
            isPending={isPending}
            form={form}
            inputs={loginArray}
            btnStyles=" w-full"
            onSubmit={onSubmit}
          ></CustomForm>
        </div>
        <div className="mt-8 text-sm flex flex-col gap-2  md:flex-row items-center">
          <span className="font-[400] text-main2"> {"  "}ليس لديك حساب ؟</span>
          <Link href="/signup" className="  duration-150 ml-1 text-main font-[700]">
            {" "}
            أنشئ حساب
          </Link>
        </div>

        <Link href="/" className=" hover:underline  flex items-center  duration-150 my-2 text-main  font-semibold">
          <ArrowRight className=" h-5 w-5 arrow1" /> العودة للموقع
        </Link>
      </div>
    </Section>
  );
};

export default Login;
