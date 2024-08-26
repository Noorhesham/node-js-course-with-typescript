import Signup from "@/app/main/authentication/components/SignUp";
import { Server } from "@/app/main/Server";
import Image from "next/image";
import React from "react";

const page = async () => {
  const res = Server({ method: "POST", resourceName: "MGS", body: { needed: ["general_settings"] }, cache: true });
  return (
    <section className="min-h-screen  flex items-stretch ">
      <div className=" hidden md:block md:w-[40%] lg:w-[60%]  min-h-full relative">
        <Image src="/signup.jpg" alt="login" className=" object-cover" fill />
      </div>
      <Signup />
    </section>
  );
};

export default page;
