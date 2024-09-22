"use client";
import { useZodForm } from "@/app/hooks/useZodForm";
import { useTranslations } from "next-intl";
import React from "react";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import CustomForm from "./CustomForm";
import FormInput from "../inputsForm/FormInput";
import FunctionalButton from "../FunctionalButton";
import { XIcon } from "lucide-react";
import FormSelect from "../inputsForm/FormSelect";
import MiniTitle from "../defaults/MiniTitle";
import FormFlexContainer from "./FormFlexContainer";
import { CURRENCY_OPTIONS } from "@/app/constants";

const offerSchema = z.object({
  employeeName: z.string().min(1, "Name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  startDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid start date",
  }),
  salary: z.union([z.number().min(1, "Salary is required"), z.string().min(1, "Salary is required")]),
  benefits: z.array(z.string().min(1, "Benefit is required")).optional(),
  currency: z.string().min(1, "Currency is required"),
});

type OfferFormValues = z.infer<typeof offerSchema>;

const SendOffer = () => {
  const t = useTranslations();
  const form = useZodForm({
    schema: offerSchema,
    defaultValues: {
      employeeName: "",
      jobTitle: "",
      startDate: new Date(),
      salary: 0,
      benefits: [" "],
      currency: "USD",
    },
  });

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    //@ts-ignore
    name: "benefits",
  });

  const onSubmit = (data: OfferFormValues) => {
    console.log("Form Submitted", data);
  };

  const offerArray = [
    {
      name: "employeeName",
      label: t("emoployeeName"),
      placeholder: t("employeeNameplaceholder"),
    },
    {
      name: "jobTitle",
      placeholder: t("jobtitle"),
      label: t("jobtitle"),
    },
    {
      name: "startDate",
      date: true,
      placeholder: t("startDatePlaceholder"),
      label: t("startdate"),
    },
    {
      name: "salary",
      type: "number",
      placeholder: t("salaryPlaceholder"),
      label: `${t("salary")} ${form.getValues("currency")}`,
      title: t("salary"),
      flex: true,
    },
    {
      name: "currency",
      label: t("currency"),
      select: true,
      options: CURRENCY_OPTIONS,
      flex: true,
    },
  ];

  return (
    <div className=" px-5 py-2.5">
      <MiniTitle text={t("addJobOffer")} boldness="bold" size="lg" />
      <CustomForm
        btnText={t("addJobOffer")}
        form={form}
        inputs={offerArray}
        btnStyles="w-fit mr-auto "
        onSubmit={onSubmit}
      >
        <div className="mt-4">
          {fields.map((field, index) => (
            <div className="flex mb-5 items-center gap-4 mt-2" key={field.id}>
              <FormInput control={form.control} name={`benefits.${index}`} placeholder={t("addBenefit")} />
              <button
                type="button"
                onClick={() => remove(index)}
                className="rounded-xl self-center border-2 border-gray-600 p-1 my-auto"
              >
                <XIcon className="w-4 h-4 " />
              </button>
            </div>
          ))}
          <div className="my-4">
            <FunctionalButton size="sm" btnText={t("addBenefit")} onClick={() => append("")} />
          </div>

          <FormFlexContainer className=" mt-8" title="ADDRESS">
            <FormSelect label="COUNTRY" name="country" />
            <FormSelect label="THE CITY" name="city" />
            <FormSelect label="AREA" name="area" />
          </FormFlexContainer>
          <FormInput control={form.control} name="address" placeholder="STREET" />
        </div>
      </CustomForm>
    </div>
  );
};

export default SendOffer;
