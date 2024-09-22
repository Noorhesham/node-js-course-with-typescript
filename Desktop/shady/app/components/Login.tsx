"use client";
import React, { useEffect, useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomForm from "@/app/components/CustomForm";
import Link from "next/link";
import { motion, useAnimate } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { splitStringUsingRegex } from "@/lib/utils";
import axios from "axios";
import { BASE_URL } from "@/lib/QueryFunctions";
import cookies from "js-cookie";
const egyptPhoneRegex = /^(010|011|012|015)\d{8}$/;

const loginSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "رقم الهاتف مطلوب" }) // Arabic message for required field
    .regex(egyptPhoneRegex, { message: "رقم الهاتف غير صالح" }), // Arabic message for invalid format
  password: z.string().min(1, { message: "كلمة المرور مطلوبة" }), // Arabic message for required password
});

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
    mode: "onChange",
  });
  const router = useRouter();

  const [serverError, setServerError] = useState<string[] | string | null>(null);
  const [isPending, startTransition] = useTransition();

  //animation logic
  const [scope, animate] = useAnimate();
  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };
  const chars = splitStringUsingRegex("سجل الدخول");
  const handleAnimate = async () => {
    await animate("#logo", { x: [500, 0], opacity: [0, 1] }, { duration: 1 });
    await animate("#logo", { rotate: [0, 0, 360] }, { duration: 0.5 });
  };
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      try {
        console.log(data);
        const res = await axios.post(`${BASE_URL}login`, data);
        console.log(res);
        if (res.status === 200) {
          toast.success(res.data.message);
          cookies.set("token", res.data.data.token);
          router.push("/");
        } else {
          toast.error(res.data.message);
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.error);
      }
    });
  };
  useEffect(() => {
    handleAnimate();
  }, []);
  const loginArray = [
    {
      name: "phone",
      placeholder: " قم بادخال رقم الهاتف ",
      label: "رقم الهاتف ",
    },
    {
      name: "password",
      type: "password",
      password: true,
      noProgress: true,
      placeholder: " قم بادخال كلمة المرور ",
      label: "كلمة المرور",
    },
  ];
  console.log(form.formState.errors);
  return (
    <section ref={scope} className=" overflow-x-hidden justify-center flex flex-1 flex-col items-center">
      <div className="mx-auto flex flex-col items-center justify-center w-full">
        <div className=" w-40 h-40 relative" id="logo">
          <Image className="rounded-full" src={"/channels4_profile (1).jpg"} alt="logo" fill />
        </div>
        {!serverError && (
          <>
            <div className="w-full mt-5 items-end px-5 lg:px-14 flex flex-col">
              <div className=" flex items-center text-right  my-4 gap-2">
                <motion.h1
                  initial="hidden"
                  animate="reveal"
                  transition={{ duration: 0.4, staggerChildren: 0.2, delay: 1 }}
                  className={`font-bold  text-3xl  leading-relaxed   `}
                >
                  {chars.map((char, index) => (
                    <motion.span variants={charVariants} key={index}>
                      {char}
                    </motion.span>
                  ))}
                </motion.h1>
                <Image src={"/book.png"} className=" w-10 h-10 aspect-square" width={200} height={200} alt={"book"} />
              </div>
              <CustomForm
                serverError={serverError}
                link="/forgot-password?level=prepare"
                btnText="سجل الدخول "
                isPending={isPending}
                form={form}
                inputs={loginArray}
                btnStyles=" w-full"
                onSubmit={onSubmit}
              />
            </div>
            <div className="mt-8 text-sm flex flex-col gap-2  md:flex-row items-center">
              <Link href="/signup" className="hover:underline duration-150 ml-1 text-violet-700 font-[700]">
                اعمل اكونت دلوقتي !
              </Link>
              <span className="font-[400] text-main2"> لسا معملتش حساب ؟ </span>
            </div>
          </>
        )}{" "}
        {serverError && <p className="text-red-500 text-center mt-3 text-sm font-semibold">{serverError}</p>}
      </div>
    </section>
  );
};

export default Login;
