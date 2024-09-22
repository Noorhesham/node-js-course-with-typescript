"use client";
import React, { useState } from "react";
import Section from "./defaults/Section";
import Logo from "./Logo";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import RegisterDoctor from "./RegisterDoctor";
import RegisterPatient from "./ReigsterPateint";
import Head1 from "./defaults/Head1";

const Signup = () => {
  const [doctor, setDoctor] = useState(true);
  return (
    <Section CustomePadding="px-5 py-20" className="bg-gray-50 justify-center flex flex-1 flex-col items-center">
      <Head1 className=" text-center mt-4 " size="text-2xl" title={`تسجيل${doctor ? " طبيب" : " مريض"}`} />
      <div className=" flex mt-8 self-center items-center gap-4">
        <Label>سجل كطبيب</Label>
        <Switch noSwitch id="sale" className="" onCheckedChange={() => setDoctor(!doctor)} />
        <Label>سجل كمريض</Label>
      </div>
      {doctor ? <RegisterDoctor /> : <RegisterPatient />}
    </Section>
  );
};

export default Signup;
