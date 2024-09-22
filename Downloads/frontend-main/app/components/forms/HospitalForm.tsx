"use client";
import { useZodForm } from "@/app/hooks/useZodForm";
import { useTranslations } from "next-intl";
import React from "react";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import FormInput from "../inputsForm/FormInput";
import FunctionalButton from "../FunctionalButton";
import { XIcon, CloudIcon } from "lucide-react";
import FormSelect from "../inputsForm/FormSelect";
import { Form } from "@/components/ui/form";
import MiniTitle from "../defaults/MiniTitle";
import FileUpload from "../inputsForm/FileUpload";
import FlexWrapper from "../defaults/FlexWrapper";

const hospitalSchema = z.object({
  hospitalType: z.string().min(1, "Hospital Type is required"),
  healthServiceProvider: z.string().min(1, "Health Service Provider is required"),
  specialities: z.string().min(1, "Specialities are required"),
  jobKeywords: z.string().min(1, "Job Keywords are required"),
  youFounded: z.string().min(1, "You Founded is required"),
  hospitalSize: z.string().min(1, "Hospital Size is required"),
  branches: z.array(
    z.object({
      branchName: z.string().min(1, "Branch Name is required"),
      country: z.string().min(1, "Country is required"),
      city: z.string().min(1, "City is required"),
      area: z.string().min(1, "Area is required"),
      bedCapacity: z.number().min(1, "Bed Capacity is required"),
    })
  ),
  hospitalPhoneNumber: z.string().min(1, "Phone Number is required"),
  hospitalEmail: z.string().email("Invalid email format"),
  socialMedia: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
  }),
  logo: z.any().optional(),
  banner: z.any().optional(),
  video: z.any().optional(),
  hospitalDescription: z.string().min(20, "Description is too short"),
  documents: z.any().optional(),
});

type HospitalFormValues = z.infer<typeof hospitalSchema>;

const HospitalProfileSettings = () => {
  const t = useTranslations();
  const form = useZodForm({
    schema: hospitalSchema,
    defaultValues: {
      hospitalType: "",
      healthServiceProvider: "",
      specialities: "",
      jobKeywords: "",
      youFounded: "",
      hospitalSize: "",
      branches: [{ branchName: "", country: "", city: "", area: "", bedCapacity: 0 }],
      hospitalPhoneNumber: "",
      hospitalEmail: "",
      socialMedia: { facebook: "", instagram: "", twitter: "", linkedin: "" },
      logo: null,
      banner: null,
      video: null,
      hospitalDescription: "",
      documents: null,
    },
  });

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: "branches",
  });

  const onSubmit = (data: HospitalFormValues) => {
    const formData = new FormData();

    // Append each field to FormData
    Object.keys(data).forEach((key) => {
      if (key === "logo" || key === "banner" || key === "video" || key === "documents") {
        if (data[key]) {
          if (data[key] instanceof FileList) {
            Array.from(data[key]).forEach((file) => formData.append(key, file));
          } else {
            formData.append(key, data[key]);
          }
        }
      } else {
        formData.append(key, JSON.stringify(data[key]));
      }
    });

    // You can now send formData via an API call, e.g., using fetch or axios
    console.log("FormData", formData);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col px-5 py-2.5 w-full items-stretch gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <MiniTitle className=" uppercase" boldness="bold" color={"text-black"} text={t("hospitalprofilesettings")} />
        {/* Hospital Info */}
        <FlexWrapper max={false}>
          <FormSelect label={t("Hospital Type")} name="hospitalType" />
          <FormInput control={form.control} name="healthServiceProvider" label={t("Health Service Provider")} />
        </FlexWrapper>

        <FormInput control={form.control} name="specialities" label={t("Specialities")} />

        <FlexWrapper max={false}>
          <FormSelect label={t("You Founded")} name="youFounded" />
          <FormSelect label={t("Hospital Size")} name="hospitalSize" />
        </FlexWrapper>

        {/* Branches */}
        <MiniTitle size="md" boldness="bold" text={t("Branches")} />
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 ">
            <FormInput control={form.control} name={`branches.${index}.branchName`} label={t("Branch Name")} />
            <FormSelect label={t("Country")} name={`branches.${index}.country`} />
            <FormSelect label={t("City")} name={`branches.${index}.city`} />
            <FormSelect label={t("Area")} name={`branches.${index}.area`} />
            <FormInput
              control={form.control}
              name={`branches.${index}.bedCapacity`}
              label={t("Bed Capacity")}
              type="number"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="rounded-xl self-center border-2 border-gray-600 p-1 my-auto"
            >
              <XIcon className="w-4 h-4 " />
            </button>
          </div>
        ))}
        <FunctionalButton
          size="sm"
          btnText={t("Add Branch")}
          className=" w-fit"
          onClick={() => append({ branchName: "", country: "", city: "", area: "", bedCapacity: 0 })}
        />

        {/* Contact Info */}

        <div className="  flex flex-col gap-4">
          <MiniTitle className=" uppercase" boldness="bold" color={"text-black"} text={t("Contact Info")} />

          <FlexWrapper max={false}>
            <FormInput control={form.control} name="hospitalPhoneNumber" label={t("Hospital Phone Number")} />
            <FormInput control={form.control} name="hospitalEmail" label={t("Hospital Email")} type="email" />
          </FlexWrapper>
        </div>

        {/* Social Media */}
        <div className="  flex flex-col gap-4">
          <MiniTitle className=" uppercase" boldness="bold" color={"text-black"} text={t("Social Media")} />
          {["facebook", "instagram", "twitter", "linkedin"].map((platform) => (
            <FormInput key={platform} control={form.control} name={`socialMedia.${platform}`} label={t(platform)} />
          ))}
        </div>
        {/* Logo, Banner, Video */}
        <h4 className=" font-semibold">{t("Media")}</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className=" col-span-1">
            <FileUpload label={t("Upload Logo")} name="logo" />
          </div>

          <div className=" col-span-2">
            <FileUpload label={t("Upload Video")} name="video" />
          </div>
        </div>

        {/* Hospital Description */}

        <FormInput control={form.control} name="hospitalDescription" label={t("Description about Hospital")} area />

        {/* Document Upload */}

        <div className=" w-[40%]">
          <FileUpload label={t("Upload Documents")} name="documents" multiple />
        </div>

        {/* Submit Button */}
        <div className=" w-fit">
          <FunctionalButton
            onClick={form.handleSubmit(onSubmit)}
            size="lg"
            btnText={t("Save Settings")}
            type="submit"
            className="w-full"
          />
        </div>
      </form>
    </Form>
  );
};

export default HospitalProfileSettings;
