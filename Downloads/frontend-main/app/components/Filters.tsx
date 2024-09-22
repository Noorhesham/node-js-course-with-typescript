"use client";
import React, { ReactNode } from "react";
import Box from "./Box";

const Filters = ({ colseBtn }: { colseBtn?: ReactNode }) => {
  return (
    <div className="  max-h-screen  rounded-2xl border bg-white shadow-sm border-gray-400 overflow-y-auto lg:max-h-full col-span-full ">
      <div className="   flex flex-col py-4  px-3">
        {colseBtn}
        <Box
          filter="Career-type"
          btn
          text="Career type"
          options={["All Jobs", "NURSES", "DOCTORS", "HEALTHCARE SPECIALIST"]}
        />

        <Box
          btn
          filter="specialization"
          text="POPULAR TAGS"
          options={[
            "ALL JOBS",
            "DENSITY",
            "INTENSIVE CARE",
            "EMERGENCY",
            "PHYSICAL THRABY",
            "CHILD HEALTH",
            "SEE MORE",
          ]}
        />
        <Box
          filter="career-level"
          text="CAREER LEVEL"
          options={["ALL LEVELS", "RN1", "RN2", "RN3", "CHARGE", "HEAD NURSE", "SUPER F"]}
        />
        <Box
          filter="current-country"
          text="CURRENT COUNTRY"
          options={["EGYPT", "SAUDI ARABIA", "ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES"]}
        />
        <Box
          filter="experience"
          text="EXPERIENCE"
          options={["0 - 5 years", "5 - 10 years", "10 - 15 years", "MORE THAN 15 years"]}
        />
        <Box
          filter="available-for-employment"
          text="AVAILABLE FOR EMPLOYMENT"
          options={["AVAILABLE FROM NOW", "AVAILABLE FROM CUSTOM DATE"]}
        />
        <Box filter="gender" text="GENDER" options={["MALE", "FEMALE"]} />
        <Box
          filter="applicant-classifications"
          text="APPLICANT CLASSIFICATIONS"
          options={["GOOD", "POOR", "SHORTLIST", "REJECTED"]}
        />
      </div>
    </div>
  );
};

export default Filters;
