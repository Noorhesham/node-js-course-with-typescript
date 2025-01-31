"use client";
import { z, ZodObject, ZodTypeAny } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import CustomForm from "./CustomForm";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { CheckIcon } from "lucide-react";
import { Server } from "@/app/main/Server";
import MotionItem from "../defaults/MotionItem";
import { DialogClose } from "@/components/ui/dialog";

const generateSchemaFromFields = (fields: any[], t: any): ZodObject<any> => {
  const schemaShape: Record<string, ZodTypeAny> = {};
  fields.forEach((field) => {
    if (!field) return;

    if (field.country) {
      schemaShape[field.countryName] = z.union([z.string(), z.number()]);
      schemaShape[field.stateName] = z.union([z.string(), z.number()]);
      if (field.cityName) schemaShape[field.cityName] = z.union([z.string(), z.number()]);
      return;
    }

    let fieldSchema: ZodTypeAny;

    switch (field.type) {
      case "text":
      case "textarea":
        fieldSchema = z.string().min(field.required ? 1 : 0, { message: t("is required") });
        break;
      case "email":
        if (field.required)
          fieldSchema = z
            .string()
            .min(1, { message: t("is required") })
            .email(`${t("must be a valid email")}`);
        else fieldSchema = z.string().email(`${t("must be a valid email")}`);
        break;
      case "phoneNumber":
        if (field.returnFullPhone) fieldSchema = z.string().min(9, `${t("must be a valid phone number")}`);
        else
          fieldSchema = z
            .object({
              phone: z.string(),
              country_key: z.string(),
            })
            .refine(
              (data) => {
                return data.phone.length >= 10 && data.country_key.length > 0;
              },
              {
                message: t("must be a valid phone number"),
                path: [],
              }
            );
        break;
      case "number":
        if (field.required) fieldSchema = z.number().min(0, `${t("must be a valid number")}`);
        else fieldSchema = z.number().min(0, `${t("must be a valid number")}`);
        break;
      default:
        fieldSchema = z.any();
        break;
    }

    if (field.required) {
      if (fieldSchema instanceof z.ZodString) {
        fieldSchema = fieldSchema.min(1, { message: `${t("is required")}` }); // Apply "required" for strings
      } else if (fieldSchema instanceof z.ZodNumber) {
        fieldSchema = fieldSchema.refine((val) => val !== null && val !== undefined, {
          message: `${t("is required")}`, // Apply "required" for numbers
        });
      }
    } else {
      fieldSchema = fieldSchema.optional();
    }

    schemaShape[field.name] = fieldSchema;
  });

  return z.object(schemaShape);
};

interface Formcontainer {
  formArray: any[];
  title?: string;
  cancel?: any;
  btnText?: string;
  btnStyles?: string;
  defaultValues?: any;
  submit?: any;
  server?: boolean;
  children?: React.ReactNode;
  id?: string;
  closeAfter?: boolean;
}

const FormContainer: React.FC<Formcontainer> = ({
  formArray,
  title,
  cancel,
  btnText,
  btnStyles,
  defaultValues,
  children,
  submit,
  server,
  id,
  closeAfter,
}) => {
  const t = useTranslations("form");

  const dynamicSchema = useMemo(() => generateSchemaFromFields(formArray, t), [formArray, t]);

  const form = useForm({
    resolver: zodResolver(dynamicSchema),
    mode: "onChange",
    defaultValues:
      //@ts-ignore
      {
        ...defaultValues,
        birth_day: defaultValues?.birthday || "",
        phone: {
          phone: `${defaultValues?.phone}` || "",
          country_key: defaultValues?.country_key || "",
        },
        avatar: defaultValues?.photo || "",
      } || {},
    shouldUnregister: true,
  });
  console.log(form.formState.errors);
  const [serverError, setServerError] = useState<string[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const [resetFormData, setResetFormData] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const onSubmit = async (data: z.infer<typeof dynamicSchema>) => {
    startTransition(async () => {
      if (server) {
        try {
          console.log(data);
          const res = await Server({ resourceName: "submitForm", body: data, id: id || "contact-us" });
          console.log(res);
          if (res.status) {
            toast.success(res.message, { autoClose: 5000 });
            setResetFormData(true); // Trigger reset
            setServerError(null);
            setTimeout(() => setResetFormData(false), 0);
          }
          if (!res.status) setServerError(res.message);
        } catch (error) {
          console.log(error);
        }
      } else if (submit) {
        submit(data, setServerError);
        setServerError(null);
      }
    });
  };
  useEffect(() => {
    if (resetFormData) {
      form.reset({});
    }
  }, [resetFormData, form]);

  return (
    <div className="  w-full min-h-[20vh]">
      {!resetFormData ? (
        <CustomForm
          serverError={serverError}
          btnText={btnText || t("Submit")}
          form={form}
          isPending={isPending}
          title={title || ""}
          btnStyles={btnStyles || "w-[40%] mr-auto "}
          inputs={formArray}
          onSubmit={onSubmit}
        >
          {children}
        </CustomForm>
      ) : (
        <MotionItem nohover initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }}>
          <p>
            <CheckIcon className=" text-gray-400" />
            {t("success")}
          </p>
          <span>{t("backtoform")}</span>
        </MotionItem>
      )}
    </div>
  );
};

export default FormContainer;
