"use client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { PhoneProps } from "./FormInput";
import cookies from "js-cookie";
import ar from "react-phone-input-2/lang/ar.json";
import { useFormContext } from "react-hook-form";

const PhoneSearch = ({ onChange }: PhoneProps) => {
  const form = useFormContext();

  return (
    <PhoneInput
      enableSearch
      localization={ar}
      excludeCountries={["il"]}
      searchStyle={{ width: "80%" }}
      country="eg"
      value={`${form.getValues("phone")}`}
      onChange={onChange}
      placeholder={"رقم الهاتف"}
      searchPlaceholder="ابحث"
      inputProps={{
        style: { padding: "0.75rem 0.75rem", outline: "#E6007E", boxShadow: "0 0 0 1px #e4e4e7", direction: "ltr" },
      }}
    />
  );
};

export default PhoneSearch;
