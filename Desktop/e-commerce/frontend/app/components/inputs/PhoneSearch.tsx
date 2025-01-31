"use client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { PhoneProps } from "./FormInput";
import cookies from "js-cookie";
import ar from "react-phone-input-2/lang/ar.json";
import { useFormContext } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";

interface ExtendedPhoneProps extends PhoneProps {
  returnFullPhone?: boolean; // Boolean to control return format
  defaultValue?: any;
  disabled?:boolean
}

const PhoneSearch = ({ onChange, name, returnFullPhone = true, defaultValue,disabled }: ExtendedPhoneProps) => {
  const lang = useLocale();
  const form = useFormContext();
  const t = useTranslations();

  // Extract current value from the form state
  const currentValue = form.getValues(name) || {};
  const phoneValue = currentValue.phone || ""; // Default to empty string if undefined
  const dialCodeValue = currentValue.country_key || ""; // For object case

  // Combine dial code and phone number for the PhoneInput value
  const fullPhoneValue = dialCodeValue ? `${dialCodeValue}${phoneValue}` : defaultValue ? currentValue : "";
  return (
    <PhoneInput disabled={disabled}
      enableSearch
      localization={lang === "ar" ? ar : undefined}
      excludeCountries={["il"]}
      searchStyle={{ width: "80%" }}
      country="eg" // Default country
      value={`${dialCodeValue}${phoneValue}`} // Ensure value is a string (full phone value)
      onChange={(value, country) => {
        let phoneData;

        if (!returnFullPhone) {
          phoneData = {
            phone: value.slice(country?.dialCode.length || 0), // Extract the phone number part
            country_key: country?.dialCode || "", // Country dial code
          };
        } else {
          phoneData = `${value}`; // Full phone number with country code as a string
        }

        console.log(phoneData);
        onChange(phoneData); // Call onChange with the updated phone data
        form.setValue(name, phoneData); // Update form state with the selected format
      }}
      placeholder={t("phone")}
      searchPlaceholder="Search"
      inputProps={{
        style: {
          padding: "0.75rem 0.75rem",
          outline: "#E6007E",
          boxShadow: "0 0 0 1px #e4e4e7",
          direction: "ltr",
        },
      }}
    />
  );
};

export default PhoneSearch;
