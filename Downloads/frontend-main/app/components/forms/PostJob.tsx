"use client";

import { useZodForm } from "@/app/hooks/useZodForm";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import FormInput from "../inputsForm/FormInput";
import FunctionalButton from "../FunctionalButton";
import { XIcon } from "lucide-react";
import FormSelect from "../inputsForm/FormSelect";
import { Form } from "@/components/ui/form";
import MiniTitle from "../defaults/MiniTitle";
import { RadioGroupForm } from "../inputsForm/RadioGroup";
import FormFlexContainer from "./FormFlexContainer";
import GridContainer from "../defaults/GridContainer";
import { AnimatePresence } from "framer-motion";
import MotionContainer from "../defaults/MotionContainer";
import ComboboxForm from "../inputsForm/ComboboxForm";
import MotionItem from "../defaults/MotionItem";
import { CURRENCY_OPTIONS } from "@/app/constants";

// Dynamic import for the nationalities library
const fetchLibrary = async (lang = "en") => {
  const { default: library } = await import("i18n-iso-countries");
  const localeImport =
    lang === "ar" ? await import("i18n-iso-countries/langs/ar.json") : await import("i18n-iso-countries/langs/en.json");
  library.registerLocale(localeImport);
  return library;
};

// Define Zod schema
const jobSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  careerType: z.string().min(1, "Career Type is required"),
  specialty: z.string().min(1, "Specialty is required"),
  careerLevel: z.string().min(1, "Career Level is required"),
  experienceFrom: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid start date",
  }),
  experienceTo: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid end date",
  }),
  branch: z.string().min(1, "Branch is required"),
  minSalary: z.union([z.string().min(1, "Min Salary is required"), z.number()]),
  maxSalary: z.union([z.string().min(1, "Max Salary is required"), z.number()]),
  hideSalary: z.string().min(1, "Hide Salary? is required"),
  nationality: z.string().min(1, "Nationality is required"),
  gender: z.string().min(1, "Gender is required"),
  familyStatus: z.string().min(1, "Family Status is required"),
  benefits: z.array(z.string().min(1, "Benefit is required")).optional(),
  description: z.string().min(20, "Description is too short"),
  responsibility: z.string().min(20, "Responsibility is too short"),
  type: z.string().optional(),
  email: z.string().optional(),
  currency: z.string(),
});

type JobFormValues = z.infer<typeof jobSchema>;

const PostJob = () => {
  const t = useTranslations();
  const locale = useLocale();

  const form = useZodForm({
    schema: jobSchema,
    defaultValues: {
      jobTitle: "",
      careerType: "",
      specialty: "",
      careerLevel: "",
      experienceFrom: new Date(),
      experienceTo: new Date(),
      branch: "",
      minSalary: 0,
      maxSalary: 0,
      hideSalary: "",
      nationality: "",
      gender: "",
      familyStatus: "",
      benefits: [" "],
      description: "",
      responsibility: "",
      currency: "USD",
    },
  });

  const [nationalities, setNationalities] = useState<{ value: string; label: string }[]>([]);
  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  const familyStatuses = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ];

  // Dynamically load nationalities
  useEffect(() => {
    fetchLibrary(locale).then((library) => {
      const countries = library.getNames(locale);
      const options = Object.entries(countries).map(([value, label]) => ({ value, label }));
      setNationalities(options);
    });
  }, []);

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    //@ts-ignore
    name: "benefits",
  });

  const onSubmit = (data: JobFormValues) => {
    console.log("Form Submitted", data);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col px-5 py-2.5 w-full items-stretch gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <MiniTitle size="md" boldness="bold" text={t("postJob")} />
        <div className=" flex flex-col gap-3 mt-3">
          {/* Job Title and Career Details */}
          <FormInput control={form.control} name="jobTitle" label={t("Job Title")} placeholder={t("Enter Job Title")} />
          <FormFlexContainer>
            <FormSelect label={t("Career Type")} name="careerType" />
            <FormSelect label={t("Specialty")} name="specialty" />
            <FormSelect label={t("Career Level")} name="careerLevel" />
          </FormFlexContainer>
          {/* Experience */}
          <GridContainer cols={3}>
            <FormInput control={form.control} name="experienceFrom" label={t("ExperienceFrom")} date />
            <FormInput control={form.control} name="experienceTo" label={t("ExperienceTo")} date />
          </GridContainer>
          {/* Branch */}
          <FormSelect label={t("Choose the Branch")} name="branch" className="mt-4" />
          {/* Salary */}
          <FormFlexContainer title={t("Salary")}>
            <FormInput control={form.control} name="minSalary" currency label={t("Min Salary (USD)")} type="number" />
            <FormInput control={form.control} name="maxSalary" currency label={t("Max Salary (USD)")} type="number" />
            <FormSelect label={t("Currency")} name="currency" options={CURRENCY_OPTIONS} />
            <FormSelect
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              label={t("Hide Salary?")}
              name="hideSalary"
            />
          </FormFlexContainer>
          {/* Personal Data */}
          <FormFlexContainer title={t("Personal Data")}>
            <ComboboxForm
              placeholder={t("Choose Nationality")}
              label={t("Nationality")}
              name="nationality"
              options={nationalities}
            />
            <FormSelect label={t("Gender")} name="gender" options={genders} />
            <FormSelect label={t("Family Status")} name="familyStatus" options={familyStatuses} />
          </FormFlexContainer>
          {/* Benefits */}
          <div className=" mt-5 flex flex-col">
            <MiniTitle size="md" boldness="bold" text={t("Benefits")} />
            <div className="">
              {fields.map((field, index) => (
                <div className="flex items-center gap-4 " key={field.id}>
                  <FormInput control={form.control} name={`benefits.${index}`} placeholder={t("Add Benefit")} />
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
                <FunctionalButton size="sm" btnText={t("Add Benefit")} onClick={() => append("")} />
              </div>
            </div>
          </div>
          {/* Description & Responsibility */}
          <MiniTitle size="md" boldness="bold" text={t("Description & Responsibility")} />
          <FormInput control={form.control} name="description" placeholder={t("Description")} area />
          <FormInput control={form.control} name="responsibility" placeholder={t("Responsibility")} area />
          <div className=" flex flex-col bg-gray-100 mt-4 rounded-md p-5">
            <RadioGroupForm
              name="type"
              options={[
                {
                  title: "No Send",
                  desc: "Candidate will apply job using jobpilot & all application will show on your dashboard.",
                },
                {
                  title: "Daily",
                  desc: "Candidate apply job on your website, all application on your own website.",
                },
                {
                  title: "Weekly",
                  desc: "Candidate apply job on your email address, and all application in your email.",
                },
              ]}
            />
          </div>
          <div className=" h-14">
            <AnimatePresence>
              {form.getValues("type") && form.getValues("type") !== "No Send" && (
                <MotionItem
                  initial={{ opacity: 0, height: 100 }}
                  animate={{ opacity: 1, height: 0 }}
                  exit={{ opacity: 0, height: 100 }}
                  transition={{ duration: 0.5 }}
                >
                  <FormInput control={form.control} name="email" placeholder={t("email")} />
                </MotionItem>
              )}
            </AnimatePresence>
          </div>
          <div className=" w-fit">
            <FunctionalButton className=" w-fit" btnText={t("postJob")} size="sm" />
          </div>{" "}
        </div>
      </form>
    </Form>
  );
};

export default PostJob;
