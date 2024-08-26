import React from "react";
import GridContainer from "./GridContainer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Paragraph from "./Paragraph";
import Head1 from "./Head1";
import MaxWidthWrapper from "./MaxWidthWrapper";
import FlexWrapper from "./FlexWrapper";

const About = ({ nohead = false }: { nohead?: boolean }) => {
  return (
    <MaxWidthWrapper>
      <FlexWrapper >
        {!nohead && (
          <Head1
            paragraph="The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design. Aenean tincidunt id mauris id auctor. Donec at ligula lacus. Nulla dignissim mi quis neque interdum, quis porta sem finibus. "
            secondText="provided by Dr. Nurse"
            text="The most important services"
          />
        )}
        <GridContainer cols={3}>
          <div className="text-center flex flex-col items-center">
            <div className=" rounded-2xl overflow-hidden w-full h-40 relative">
              <Image alt="image" fill className="object-cover w-full h-full " src={"/grid5.jpg"} />
            </div>
            <Head1 className=" mt-2" size="sm" text="Job Listings" />
            <Paragraph description="Posting job vacancies in hospitals, clinics, and medical centers. Displaying job opportunities by specialty and geographic location." />
          </div>
          <div className="text-center flex flex-col items-center">
            <div className=" rounded-2xl overflow-hidden w-full h-40 relative">
              <Image alt="image" fill className="object-cover w-full h-full " src={"/grid4.jpg"} />
            </div>
            <Head1 className=" mt-2" size="sm" text="Search and Filtering" />
            <Paragraph description="Advanced search tools to filter jobs by specialty, experience, and location. The ability to search for suitable candidates for advertised positions." />
          </div>
          <div className="text-center flex flex-col items-center">
            <div className=" rounded-2xl overflow-hidden w-full h-40 relative">
              <Image alt="image" fill className="object-cover w-full h-full " src={"/grid6.jpg"} />
            </div>
            <Head1 className=" mt-2" size="sm" text="Application and Recruitment" />
            <Paragraph description="Facilitating online application processes. Managing and tracking recruitment and selection processes through the platform." />
          </div>
        </GridContainer>
      </FlexWrapper>
    </MaxWidthWrapper>
  );
};

export default About;
