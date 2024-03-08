"use client";
import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignupSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { signup } from "@/actions/signup";
import { useState, useTransition } from "react";

const SignUpForm = () => {
  const [error, setFormError] = useState<string | undefined>();
  const [success, setFormSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const { handleSubmit, control } = form;
  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    setFormError("");
    setFormSuccess("");
    startTransition(async () => {
      await signup(values).then((data) => {
        setFormError(data.error);
        setFormSuccess(data.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Create an account "
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className=" space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" font-bold">Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} type="text" {...field} placeholder="Noor Boi" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" space-y-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" font-bold">Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="meow@gmail.com" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" space-y-4">
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" font-bold">Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Create new Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignUpForm;
