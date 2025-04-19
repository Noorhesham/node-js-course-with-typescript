"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import FormInput from "../inputs/FormInput";

const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen grid grid-cols-2">
      {" "}
      {/* Left Side - Form */}
      <div className="flex flex-col items-center justify-center p-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-right">
            <h2 className="text-3xl font-bold mb-2">تسجيل الدخول</h2>
            <p className="text-gray-500 text-sm">ليس لديك حساب؟ · إنشاء حساب جديد</p>
          </div>

          {/* Google Sign In Button */}
          <button className="w-full flex items-center justify-center gap-3 border rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <img src="/google.svg" alt="Google" width={20} height={20} />
            <span>Google</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">أدخل بريدك الإلكتروني أو الهاتف</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <FormInput
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني أو الهاتف"
                    label="البريد الإلكتروني"
                    name="email"
                  />
                </div>

                <div className="relative">
                  <Input
                    type="password"
                    placeholder="أدخل كلمة المرور الخاصة بك"
                    {...form.register("password")}
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none text-right"
                  />
                  <button type="button" className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Eye className="w-5 h-5 text-gray-400" />
                  </button>
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  نسيت كلمة السر
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#4A6FA1] hover:bg-[#3e5d89] text-white py-3 rounded-lg transition-colors"
              >
                تسجيل الدخول
              </Button>
            </form>
          </Form>
        </div>
      </div>
      {/* Right Side - Image */}
      <div className="relative bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <span className="text-6xl font-serif text-[#4A6FA1]">A</span>
          </div>
        </div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-4xl font-serif mb-2">A'atene</h1>
          <p className="text-xl text-gray-600 font-arabic">أتيني</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
