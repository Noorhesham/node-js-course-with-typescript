import BreadCrumb from "@/app/components/BreadCrumb";
import { Calender, DashBoard } from "@/app/components/Icons";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <BreadCrumb />
      <section className=" min-h-screen  ">
        <MaxWidthWrapper className="flex flex-col items-start px-14  mt-5 justify-center">
          <div className=" relative w-full h-[750px]">
            <Image src="/unsplash_FWoq_ldWlNQ.png" alt="blog" className=" object-cover" fill />
          </div>
          <div className=" flex items-start mr-auto my-10 gap-3">
            <div className=" flex items-center gap-2">
              <Calender />
              <p className=" text-xs font-medium text-[#475156]">1 FEB,2025</p>
            </div>
            <div className=" flex items-center gap-2">
              <DashBoard />
              <p className=" text-xs font-medium text-[#475156]">Blog</p>
            </div>
          </div>
          <h1 className=" capitalize mb-4 text-4xl text-main2 text-left font-semibold max-w-5xl">
            Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.{" "}
          </h1>
          <p className=" text-gray-800 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            <br />
            <br />
            software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at its layout. The point of using Lorem
            Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,
            content here', making it look like readable English. Many desktop publishing packages and web page editors
            now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites
            still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like).
          </p>
          <h1 className=" text-3xl font-semibold mb-5 text-main2/80 mt-10">
            Transform Your Idea Into Reality with Ether a Leading Digital Agency
          </h1>
          <p className=" max-w-lg">
            software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at its layout. The point of using Lorem
            Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,
            content here
          </p>

          <h1 className=" text-3xl font-semibold mb-5 text-main2/80 mt-10">
            Transform Your Idea Into Reality with Ether a Leading Digital Agency
          </h1>
          <p className=" max-w-lg">
            software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at its layout. The point of using Lorem
            Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,
            content here
          </p>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default page;
