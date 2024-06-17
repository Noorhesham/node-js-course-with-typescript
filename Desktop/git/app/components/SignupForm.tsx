"use client";
import React, { useState, useTransition } from "react";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ButtonRounded from "./ButtonRounded";
import { SignupSchema } from "../schema";
import InputField from "./InputField";

const SignupForm = () => {
//   const [error, setFormError] = useState<string | undefined>("");
//   const [success, setFormSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    },
  });
  const { handleSubmit, control, reset, getValues } = form;
  const onSubmit = (values: z.infer<typeof SignupSchema>) => {

    
  };
  return (
    <section className="flex flex-col items-center justify-center p-5 py-3 w-full ">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4 md:p-16 md:pb-0 md:pt-5">
            <div>
              <div className=" space-y-5">
                <InputField
                  name="name"
                  text="Name"
                  placeholder="Your Name"
                  type="text"
                  control={control}
                  disabled={isPending}
                />
                <InputField
                  name="email"
                  text="Email"
                  placeholder="Email@example.com"
                  type="email"
                  control={control}
                  disabled={isPending}
                />
                <InputField name="password" control={control} disabled={isPending} />
                <InputField text="Confirm Password" name="passwordConfirm" control={control} disabled={isPending} />
              </div>
            </div>

            <div>
              <Link className="px-0 font-normal text-gray-500 pt-3 text-sm cursor-default" href="/login">
                Already have an account ?{" "}
                <span className=" hover:underline cursor-pointer text-red-500">Log In now</span>
              </Link>
            </div>
            <ButtonRounded
            disabled={isPending}
            text="signup"
            className="w-fittext-xl  py-5 px-10 rounded-full shadow-md"
          />
          </form>
        </Form>
    </section>
  );
};

export default SignupForm;
