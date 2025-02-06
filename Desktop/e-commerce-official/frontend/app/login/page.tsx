"use client";
import React from "react";
import { z } from "zod";
import MaxWidthWrapper from "../components/defaults/MaxWidthWrapper";
import DynamicForm from "../components/DynamicForm";
import Image from "next/image";
import Logo from "../components/Logo";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchData } from "../actions/Server";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";
const loginArray = [
  {
    name: "email",
    validation: z.string().email(),
    label: "Email",
  },
  {
    name: "password",
    validation: z.string().min(8, { message: "password must be at least 8 characters" }),
    label: "Password",
  },
];
const page = () => {
  const { setAuth } = useAuth();
  const router = useRouter();
  const onSubmit = async (vals: any) => {
    const res = await fetchData({ resourceName: "auth/login", method: "POST", body: vals });
    if (res.token) {
      setAuth({ accessToken: res.token, user: res.data.user });
      router.push("/");
    }
    return res;
  };
  return (
    <div className=" justify-center items-center">
      <MaxWidthWrapper className="flex  w-full max-w-4xl items-center gap-2">
        <div className=" h-[80vh] lg:block hidden relative    flex-[60%]">
          <Image src="/signin.jpg" fill alt="login image" className="object-contain w-full h-full absolute" />
        </div>
        <div className="flex items-center  w-full flex-[40%] flex-col gap-5">
          <Logo />
          <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>

          <DynamicForm
            className="w-full flex flex-col gap-5"
            submitText="Login"
            onSubmit={onSubmit}
            arrayFields={loginArray}
          />

          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            href="/signup"
          >
            Don&apos;t have an account?
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
