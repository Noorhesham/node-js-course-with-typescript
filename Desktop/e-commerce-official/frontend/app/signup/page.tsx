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
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";
const singupArray = [
  {
    name: "name",
    validation: z.string().min(3, { message: "Name must be at least 3 characters" }),
    label: "Name",
  },
  {
    name: "email",
    validation: z.string().email(),
    label: "Email",
  },
  {
    name: "password",
    validation: z.string().min(8, { message: "Password must be at least 8 characters" }),
    label: "Password",
    password: true,
  },
  {
    name: "passwordConfirm",
    validation: z.string().min(8, { message: "Password must be at least 8 characters" }),
    label: "Password Confirm",
    password: true,
  },
  {
    superRefine: (values, ctx) => {
      if (values.password !== values.passwordConfirm) {
        ctx.addIssue({
          path: ["passwordConfirm"],
          message: "Passwords do not match",
        });
      }
    },
    component: "array",
  },
  {
    name: "image",
    component: "photo",
    label: "Image",
    validation: z
    .array(z.object({
      secure_url: z.string(),
      publicId: z.string(),
    })),
  },
];

const page = () => {
  const router = useRouter();
  const { setAuth } = useAuth();
  const onSubmit = async (vals: any) => {
    console.log(vals);
    const res = await fetchData({ resourceName: "auth/signup", method: "POST", body: {...vals,image:vals.image[0]} });
    if (res.token) {
      setAuth({ accessToken: res.token, user: res.data.user });
      router.push("/");
    }
    return res;
  };
  return (
    <div className=" justify-center items-center">
      <MaxWidthWrapper className="flex  w-full  items-center gap-10">
        <div className=" h-[80vh] lg:block hidden relative  rounded-2xl overflow-hidden   flex-[55%]">
          <Image src="/login.jpg" fill alt="login image" className="object-cover w-full h-full absolute" />
        </div>
        <div className="flex items-center  w-full flex-[50%] flex-col gap-5">
          <Logo />
          <h1 className="text-2xl font-semibold tracking-tight">Sign Up to your account</h1>

          <DynamicForm
            className="w-full flex flex-col gap-5"
            submitText="Sign up"
            onSubmit={onSubmit}
            arrayFields={singupArray}
          />

          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            href="/login"
          >
            Already have an account?
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
