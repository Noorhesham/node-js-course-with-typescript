"use client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { PhoneProps } from "./FormInput";
import cookies from "js-cookie";
import ar from "react-phone-input-2/lang/ar.json";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
const PhoneSearch = ({ onChange }: PhoneProps) => {
  const lang = cookies.get("NEXT_LOCALE");
  const form = useFormContext();
  console.log(form.getValues("phone"));
  const t = useTranslations();
  return (
    <PhoneInput
      enableSearch
      localization={lang === "ar" ? ar : undefined}
      excludeCountries={["il"]}
      searchStyle={{ width: "80%" }}
      country="eg"
      value={`${form.getValues("phone")}`}
      onChange={onChange}
      placeholder={t("phone")}
      searchPlaceholder="Search"
      inputProps={{
        style: { padding: "0.75rem 0.75rem", outline: "#E6007E", boxShadow: "0 0 0 1px #e4e4e7", direction: "ltr" },
      }}
    />
  );
};

export default PhoneSearch;
