import React, { useState, useTransition } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "./forms/CustomForm";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { registerPatientSchema } from "../schemas";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants";

// Arabic form fields for patient registration
const registerPatientArray = [
  { name: "FirstName", placeholder: "الاسم الأول", label: "الاسم الأول" },
  { name: "LastName", placeholder: "اسم العائلة", label: "اسم العائلة" },
  { name: "PhoneNumber", placeholder: "رقم الهاتف", label: "رقم الهاتف" },
  { name: "Email", placeholder: "البريد الإلكتروني", label: "البريد الإلكتروني", type: "email" },
  { name: "Password", placeholder: "كلمة المرور", label: "كلمة المرور", type: "password", password: true },
  {
    name: "ConfirmPassword",
    placeholder: "تأكيد كلمة المرور",
    label: "تأكيد كلمة المرور",
    type: "password",
    password: true,
  },
  {
    name: "Age",
    placeholder: "العمر",
    label: "العمر",
    type: "number",
    password: false,
  },
  {
    name: "Gender",
    placeholder: "النوع",
    label: "النوع",

    select: true,
    options: [
      {
        label: "ذكر",
        value: "true",
      },
      {
        label: "انثى",
        value: "false",
      },
    ],
  },
];

const RegisterPatient = () => {
  const [serverError, setServerError] = useState();
  const form = useForm({
    resolver: zodResolver(registerPatientSchema),
    mode: "onChange",
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof registerPatientSchema>) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    startTransition(async () => {
      try {
        console.log(data);
        const res = await axios.post(`${BASE_URL}Authentication/RegisterPatient`, formData);
        console.log(res);
        if (res.success) toast.success("تم تسجيل المريض بنجاح");
        else setServerError(res.message);
      } catch (err: any) {
        console.log(err);
        setServerError(err.response.data||err.response.data.title);
      }
    });
  };

  return (
    <>
      <div className="w-full gap-3 mt-5 px-5 lg:px-14 flex flex-col">
        <CustomForm
          serverError={serverError}
          btnText="تسجيل"
          isPending={isPending}
          form={form}
          inputs={registerPatientArray}
          btnStyles="w-full"
          onSubmit={onSubmit}
        />
      </div>
      <Link
        href="/"
        className=" hover:underline  flex items-center mx-auto  duration-150 my-2 text-main  font-semibold"
      >
        <ArrowRight className=" h-5 w-5 arrow1" /> العودة للموقع
      </Link>
    </>
  );
};

export default RegisterPatient;
