import React from "react";
import GridContainer from "./GridContainer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Paragraph from "./Paragraph";
import Head1 from "./Head1";
import MaxWidthWrapper from "./MaxWidthWrapper";
import FlexWrapper from "./FlexWrapper";

const FindDoctor = ({ reverse }: { reverse?: boolean }) => {
  return (
    <MaxWidthWrapper>
      <FlexWrapper className={`flex  lg:flex-row flex-col items-center gap-5 ${reverse ? "lg:flex-row-reverse" : ""} `}>
        <div className="flex flex-col items-start gap-10 justify-between  flex-1">
          <div className="flex flex-col items-start">
            <h3 className=" text-main2  uppercase font-medium my-1">Are you an employer?</h3>
            <Head1  headingClasses=" text-left " text="Why Join Sudia arabic" />
            <Paragraph
              description="The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design. Aenean tincidunt id mauris id auctor. Donec at ligula lacus. Nulla dignissim mi quis neque interdum, quis porta sem finibus. 
anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design. Aenean tincidunt id mauris id auctor. "
            />
          </div>
          <Button>GET STARTED</Button>
        </div>
        <GridContainer cols={2} className=" w-full h-full flex-1 ">
          <div className="flex flex-col gap-2 col-span-1">
            <div className=" rounded-2xl overflow-hidden aspect-square relative w-full h-full">
              <Image alt="image" fill className="object-contain " src={"/grid1.jpg"} />
            </div>
            <div className=" rounded-2xl overflow-hidden aspect-square relative w-full h-full">
              <Image alt="image" fill className="object-contain " src={"/grid2.jpg"} />
            </div>
          </div>
          <div className=" rounded-2xl overflow-hidden relative w-full h-full">
            <Image alt="image" fill className="object-contain " src={"/grid3.jpg"} />
          </div>
        </GridContainer>
      </FlexWrapper>
    </MaxWidthWrapper>
  );
};

export default FindDoctor;
