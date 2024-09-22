"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "@/app/components/CustomForm";
import { motion, useAnimate } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { BASE_URL } from "@/lib/QueryFunctions";
import { axiosPrivate } from "@/lib/axiosInestance";

const resetPasswordSchema = z
  .object({
    old_password: z.string().min(1, { message: "كلمة المرور القديمة مطلوبة" }),
    password: z.string().min(6, { message: "كلمة المرور الجديدة يجب أن تكون على الأقل 6 أحرف" }),
    password_confirmation: z.string().min(1, { message: "تأكيد كلمة المرور مطلوب" }),
  })
  .refine(
    (values) => {
      return values.password === values.password_confirmation;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );
const ResetPassword = () => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const [serverError, setServerError] = useState<string[] | string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Animation logic
  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };
  const chars = "تغيير كلمة المرور".split("");

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    startTransition(async () => {
      try {
        console.log(data);
        const res = await axiosPrivate.post(`students/me/reset-password`, data);
        console.log(res);
        if (res.status === 200) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.error);
      }
    });
  };

  const resetPasswordArray = [
    {
      name: "old_password",
      type: "password",
      placeholder: "ادخل كلمة المرور القديمة",
      label: "كلمة المرور القديمة",
      password: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "ادخل كلمة المرور الجديدة",
      label: "كلمة المرور الجديدة",
      password: true,
    },
    {
      name: "password_confirmation",
      type: "password",
      placeholder: "تأكيد كلمة المرور الجديدة",
      label: "تأكيد كلمة المرور الجديدة",
      password: true,
    },
  ];

  return (
    <section className="overflow-x-hidden justify-center flex flex-1 flex-col items-center">
      <div className="mx-auto flex flex-col items-center justify-center w-full">
        {
          <>
            <div className="w-full mt-5 items-start px-5 lg:px-14 flex flex-col">
              <div className="flex items-start text-right my-4 gap-2">
                <motion.h1
                  initial="hidden"
                  animate="reveal"
                  transition={{ duration: 0.2, staggerChildren: 0.2, delay: 0.2 }}
                  className="font-bold text-3xl leading-relaxed"
                >
                  {chars.map((char, index) => (
                    <motion.span variants={charVariants} key={index}>
                      {char}
                    </motion.span>
                  ))}
                </motion.h1>
              </div>
              <CustomForm
                serverError={serverError}
                btnText="تغيير كلمة المرور"
                isPending={isPending}
                form={form}
                inputs={resetPasswordArray}
                btnStyles="w-full"
                onSubmit={onSubmit}
              />
            </div>
          </>
        }
        {serverError && <p className="text-red-500 text-center mt-3 text-sm font-semibold">{serverError}</p>}
      </div>
    </section>
  );
};

export default ResetPassword;
