"use client";
import Image from "next/image";
import Intro from "./components/Intro";
import Snow from "./components/Snow";
import useLocoScroll from "./hooks/useLocoScroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
  useLocoScroll(true);

  return (
    <div className="relative w-full">
      <Snow />
    </div>
  );
}
