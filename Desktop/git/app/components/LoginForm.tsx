"use client";
import React, { useState, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LoginSchema } from "../schema";
import ButtonRounded from "./ButtonRounded";

const LoginForm = () => {
  //   const [error, setFormError] = useState<string | undefined>("");
  //   const [success, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, control, reset, getValues } = form;
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {};
  return (
    <section className="flex  flex-col items-center  justify-center gap-7 w-full ">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6 md:p-16 md:pb-5 md:pt-5">
          <div>
            <div className=" space-y-6">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className=" relative">
                    <FormLabel className=" text-gray-400">Email</FormLabel>
                    <FormControl>
                      <Input
                        className=" py-6 px-3  rounded-lg text-black"
                        disabled={isPending}
                        {...field}
                        placeholder="email@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem className=" relative ">
                    <FormLabel className=" text-gray-400">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 px-3 rounded-lg text-black"
                        disabled={isPending}
                        {...field}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" flex flex-col items-start">
                <Button size="lg" variant="link" asChild className="text-gray-500 hover:text-red-500 px-0 font-normal ">
                  <Link href="/auth/reset">Forgot password?</Link>
                </Button>

                <Link className="px-0 font-normal text-gray-500 pt-3 text-sm cursor-default" href="/signup">
                  Do not have an account ?{" "}
                  <span className=" hover:underline cursor-pointer text-red-500">Sign up now</span>
                </Link>
              </div>
            </div>
          </div>
          <ButtonRounded
            disabled={isPending}
            text="Login"
            className="w-fittext-xl  py-5 px-10 rounded-full shadow-md"
          />
        </form>
      </Form>
    </section>
  );
};

export default LoginForm;
