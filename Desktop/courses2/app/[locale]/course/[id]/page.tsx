import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Paragraph from "@/app/components/defaults/Paragraph";
import Head from "@/app/components/Head";
import { Button } from "@/components/ui/button";
import { CheckIcon, CodeIcon, Heading1 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { GrDocumentDownload } from "react-icons/gr";

const page = () => {
  return (
    <section className=" pt-32">
      <MaxWidthWrapper className=" text-gray-800">
        <GridContainer className=" gap-5" cols={5}>
          <div className=" col-span-3">
            <Head className=" text-black mb-4" text="The Complete Python Course From Zero To Hero" />
            <Paragraph
              className=" text-gray-900 text-muted-foreground"
              description="Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
            />
            <GridContainer cols={2}>
              <div className=" flex items-center gap-4">
                <CheckIcon className=" text-green-400" />
                <Paragraph
                  className=" text-gray-800"
                  size="sm"
                  description="You will master the Python programming language by building 100 unique projects over 100 days."
                />
              </div>
              <div className=" flex items-center gap-4">
                <CheckIcon className=" text-green-400" />
                <Paragraph
                  className=" text-gray-800"
                  size="sm"
                  description="You will learn automation, game, app and web development, data science and machine learning all using Python."
                />
              </div>
              <div className=" flex items-center gap-4">
                <CheckIcon className=" text-green-400" />
                <Paragraph
                  className=" text-gray-800"
                  size="sm"
                  description="You will be able to program in Python professionally"
                />
              </div>
              <div className=" flex items-center gap-4">
                <CheckIcon className=" text-green-400" />
                <Paragraph
                  className=" text-gray-800"
                  size="sm"
                  description="You will learn Selenium, Beautiful Soup, Request, Flask, Pandas, NumPy, Scikit Learn, Plotly, and Matplotlib."
                />
              </div>
            </GridContainer>
            <div className=" flex items-center gap-2">
              <Button>Enroll Now</Button>
              <Button>See Details</Button>
            </div>
          </div>
          <div className=" relative col-span-2">
            <Image className=" object-contain" src={"/2776760_f176_10.jpg"} alt="Python" fill />
          </div>
        </GridContainer>
      </MaxWidthWrapper>
      <MaxWidthWrapper className=" flex flex-col gap-5">
        <Head text="This course includes" className=" text-black" />
        <GridContainer cols={5}>
          <GridContainer className=" col-span-3" cols={2}>
            <div className=" text-gray-900 flex items-center gap-4">
              <CodeIcon />
              <span>52 hours on-demand video</span>
            </div>
            <div className=" text-gray-900 flex items-center gap-4">
              <GrDocumentDownload />
              <span>147 downloadable resources</span>
            </div>
            <div className=" text-gray-900 flex items-center gap-4">
              <CodeIcon />
              <span>52 hours on-demand video</span>
            </div>
            <div className=" text-gray-900 flex items-center gap-4">
              <GrDocumentDownload />
              <span>147 downloadable resources</span>
            </div>
            <div className=" text-gray-900 flex items-center gap-4">
              <CodeIcon />
              <span>52 hours on-demand video</span>
            </div>
            <div className=" text-gray-900 flex items-center gap-4">
              <GrDocumentDownload />
              <span>147 downloadable resources</span>
            </div>
          </GridContainer>
          <GridContainer cols={4} className=" flex flex-wrap col-span-2">
            <div className=" py-2 px-4 bg-blue-300 rounded-2xl border border-input ">In Japan</div>
            <div className=" py-2 px-4 bg-blue-300 rounded-2xl border border-input ">In Japan</div>
            <div className=" py-2 px-4 bg-blue-300 rounded-2xl border border-input ">In Japan</div>
            <div className=" py-2 px-4 bg-blue-300 rounded-2xl border border-input ">In Japan</div>
            <div className=" py-2 px-4 bg-blue-300 rounded-2xl border border-input ">In Japan</div>
            <div className=" py-2 px-4 bg-blue-300 rounded-2xl border border-input ">In Japan</div>
          </GridContainer>
        </GridContainer>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
