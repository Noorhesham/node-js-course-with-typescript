"use client";
import React, { ReactNode, useState, useTransition } from "react";
import CustomForm, { InputProps } from "./CustomForm";
import { z, ZodSchema } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactUsSchema,
  forgotPasswordSchema2,
  notifictationsSchema,
  personalSchema,
  commentSchema,
  emailSchema,
  phoneSchema,
} from "../../schema";
import { useTranslations } from "next-intl";

interface FormContainerProps {
  formArray: InputProps[];
  schema:
    | "contact"
    | "forgotPassword"
    | "resetPassword"
    | "notifictations"
    | "personalInfo"
    | "commentSchema"
    | "email"
    | "phone";
  title?: string;
  cancel?: any;
  btnText?: string;
  btnStyles?: string;
  defaultValues?: any;
  children?: ReactNode;
  submit?: (
    data: z.infer<typeof ZodSchema | any>,
    setServerError: React.Dispatch<React.SetStateAction<string[] | null>>
  ) => void;
}

const FormContainer: React.FC<FormContainerProps> = ({
  formArray,
  schema,
  title,
  cancel,
  btnText,
  btnStyles,
  defaultValues,
  children,
  submit,
}) => {
  const schemaResolver = () => {
    switch (schema) {
      case "contact":
        return contactUsSchema;
      case "forgotPassword":
        return forgotPasswordSchema2;
      case "notifictations":
        return notifictationsSchema;
      case "personalInfo":
        return personalSchema;
      case "commentSchema":
        return commentSchema;
      case "email":
        return emailSchema;
      case "phone":
        return phoneSchema;
      default:
        throw new Error("Invalid schema type provided");
    }
  };
  const t = useTranslations();
  const form = useForm({
    resolver: zodResolver(schemaResolver()),
    mode: "onChange",
    defaultValues:
      {
        ...defaultValues,
        birth_day: defaultValues?.birthday || "",
        phone: ` ${defaultValues?.country_key}${defaultValues?.phone}` || "",
        avatar: defaultValues?.photo || "",
      } || {},
  });
  const [serverError, setServerError] = useState<string[] | null>(null);
  const [isPending, startTransition] = useTransition();
  //@ts-ignore
  const onSubmit = async (data: z.infer<typeof schemaResolver>) => {
    startTransition(() => {
      console.log(data);
      submit && submit(data, setServerError);
    });
  };
  console.log(form.formState.errors);
  return (
    <CustomForm
      serverError={serverError}
      btnText={btnText || t("Submit")}
      form={form}
      isPending={isPending}
      cancel={cancel}
      title={title || ""}
      btnStyles={btnStyles || "w-[40%] mr-auto "}
      inputs={formArray}
      onSubmit={onSubmit}
    >
      {children}
    </CustomForm>
  );
};

export default FormContainer;
