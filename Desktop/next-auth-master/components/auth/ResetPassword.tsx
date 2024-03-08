"use client";

import { useState, useTransition } from "react";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { CardWrapper } from "./CardWrapper";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { newPassword } from "@/actions/newPassword";

const ResetPassword = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
  
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
  
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
      resolver: zodResolver(NewPasswordSchema),
      defaultValues: {
        password: "",
      },
    });
  
    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
      setError("");
      setSuccess("");
  
      startTransition(() => {
        newPassword(values, token)
          .then((data) => {
            setError(data?.error);
            setSuccess(data?.success);
          });
      });
    };
  
  return (
    <CardWrapper headerLabel="Enter a new password" backButtonLabel="Back to login" backButtonHref="/auth/login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetPassword;
