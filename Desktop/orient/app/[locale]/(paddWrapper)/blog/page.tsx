import React from "react";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import Heading from "../../../components/Heading";
import CardHuge from "../../../components/CardHuge";
import BreadCrumb from "../../../components/BreadCrumb";

const page = () => {
  return (
    <>
      <BreadCrumb />
      <section className=" min-h-screen  ">
        <MaxWidthWrapper className="flex flex-col items-center  mt-5 justify-center">
          <Heading
            mainText="discover the most important"
            subText="articles about paints"
            paragraph=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ipsam cum quam ullam, nulla iure nesciunt a, tempora, obcaecati excepturi eos rem tenetur dolor. Ducimus praesentium sapiente provident voluptates officia?"
          />
          <section className=" gap-4 grid grid-cols-3">
            <CardHuge href="/blog/1" />
            <CardHuge />
            <CardHuge />
            <CardHuge />
            <CardHuge />
            <CardHuge />
            <CardHuge />
            <CardHuge />
            <CardHuge />
          </section>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default page;
