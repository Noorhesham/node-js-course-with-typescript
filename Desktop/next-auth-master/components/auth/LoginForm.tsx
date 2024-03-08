"use client";
import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { sendVerification } from "@/actions/sendVerification";

//here we try to login we enter the credentials in the form and onsubmit we send them to an login api endpoint or server action

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";
  const [showTwoFactor, setShowTwoFactor] = useState(false); //state we get from the backend to show 2fa field 
  const [confirmEmail, setConfirmEmail] = useState(false);  //state we get from back to resend a confirmation email
  // setting the errors/success and pending states 
  const [error, setFormError] = useState<string | undefined>("");
  const [success, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });
  const { handleSubmit, control, reset, getValues } = form;
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setFormError("");
    setFormSuccess("");
    startTransition(async () => {
      await login(values)
        .then((data) => {
          if (data?.error) {
            reset();
            setFormError(data?.error);
          }
          if (data?.success) {
            reset();
            setFormSuccess(data?.success);
          }
          if (data?.confirmEmail) {
            setConfirmEmail(true);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setFormError("something went wrong !"));
    });
  };
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className=" space-y-4">
            {showTwoFactor && (
              <FormField
                control={control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" font-bold">Two Factor Code</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} placeholder="123456" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
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
                        <Button size="sm" variant="link" asChild className=" px-0 font-normal">
                          <Link href="/auth/reset">Forgot password?</Link>
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
          </div>

          <FormError message={error || urlError} />
          {confirmEmail && (
            <Button
              disabled={isPending}
              onClick={() => sendVerification(getValues("email")).then((res) => setFormSuccess(res.success))}
            >
              Send Verification Email
            </Button>
          )}
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
