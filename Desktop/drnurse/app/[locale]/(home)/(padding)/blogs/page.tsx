import GridContainer from "@/app/components/GridContainer";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <MaxWidthWrapper className="flex flex-col justify-center  mb-16">
      <GridContainer cols={3}>
        <div className=" w-full  h-96 relative">
          <Image src={"/Image 1.png"} alt={"blog"} fill className={"object-cover rounded-2xl"} />
        </div>
        <div className=" w-full  h-96 relative">
          <Image src={"/Image 1 (1).png"} alt={"blog"} fill className={"object-cover rounded-2xl"} />
        </div>
        <div className=" w-full  h-96 relative">
          <Image src={"/Image 1 (2).png"} alt={"blog"} fill className={"object-cover rounded-2xl"} />
        </div>
        <div className=" w-full  h-96 relative">
          <Image src={"/Image 1 (3).png"} alt={"blog"} fill className={"object-cover rounded-2xl"} />
        </div>
        <div className=" w-full  h-96 relative">
          <Image src={"/Image 1 (4).png"} alt={"blog"} fill className={"object-cover rounded-2xl"} />
        </div>
        <div className=" w-full  h-96 relative">
          <Image src={"/Image 1 (5).png"} alt={"blog"} fill className={"object-cover rounded-2xl"} />
        </div>
      </GridContainer>
      <Button className=" self-center mx-auto mt-5">MORE OUR NEWS</Button>
    </MaxWidthWrapper>
  );
};

export default page;
