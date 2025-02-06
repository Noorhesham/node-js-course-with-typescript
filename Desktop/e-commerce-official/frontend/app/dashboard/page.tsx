"use client";
import React from "react";
import { useAuth } from "../context/AuthProvider";
import MaxWidthWrapper from "../components/defaults/MaxWidthWrapper";

const page = () => {
  const { auth } = useAuth();
  return (
    <MaxWidthWrapper>
      <h2 className=" text-white font-bold text-4xl">welcome {auth?.user?.name}</h2>
    </MaxWidthWrapper>
  );
};
// /dashboard /dashboard/products /dashboard/orders
export default page;
