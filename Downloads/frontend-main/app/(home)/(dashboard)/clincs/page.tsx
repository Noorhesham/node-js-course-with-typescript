import { BASE_URL } from "@/app/constants";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const clincs = await fetch(`${BASE_URL}/Clinic/doctor/${cookies().get("id")}`);
  return <div></div>;
};

export default page;
