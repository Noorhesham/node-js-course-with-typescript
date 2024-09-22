"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { userSchema } from "../schemas";
import { z } from "zod";
import { toast } from "react-toastify";
import { updateUser } from "../actions/action";
import CustomForm from "./forms/CustomForm";
const userArray = [
  {
    name: "firstName",
    placeholder: "الاسم الاول",
    label: " الاسم الاول",
  },
  {
    name: "lastName",
    placeholder: "الاسم الاخير",
    label: " الاسم الاخير",
  },
  {
    name: "phoneNumber",
    placeholder: "رقم الهاتف",
    label: "رقم الهاتف",
    phone: true,
  },
  {
    name: "age",
    placeholder: "العمر",
    label: "العمر",
    type: "number",
  },
  {
    name: "gender",
    placeholder: "النوع",
    label: "النوع",
    select: true,
    options: [
      { label: "ذكر", value: "male" },
      { label: "انثى", value: "female" },
    ],
  },
];
const UpdateUserForm = ({ user }: { user: z.infer<typeof userSchema> }) => {
  const [serverError, setServerError] = useState();
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phoneNumber: user.phoneNumber || "",
      age: user.age || "",
      gender: user.gender || "",
    },
    mode: "onChange",
  });
  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: z.infer<typeof userSchema>) => {
    console.log(data);
    startTransition(async () => {
      try {
        const res = await updateUser(data);
        console.log(res);
        if (res.success) toast.success("تم تسجيل الدخول بنجاح");
        else setServerError(res.message);
      } catch (err: any) {
        setServerError(err.message);
      }
    });
  };
  return (
    <div className=" col-span-2">
      <CustomForm
        serverError={serverError}
        btnText="تحديث "
        isPending={isPending}
        form={form}
        inputs={userArray}
        btnStyles=" w-full"
        onSubmit={onSubmit}
      ></CustomForm>
    </div>
  );
};

export default UpdateUserForm;
