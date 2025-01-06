"use client";
import React from "react";
import Image from "next/image";
import Loader from "./Loader";
import FirstScene from "./FirstScene";
import { useLoading } from "../context/LoadingContext";
const Main = () => {
  return (
    <div>
      <Loader />
      {<FirstScene />}
    </div>
  );
};

export default Main;
