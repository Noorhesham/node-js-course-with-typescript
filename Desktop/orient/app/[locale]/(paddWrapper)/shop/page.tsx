import Box from "@/app/components/Box";
import BreadCrumb from "@/app/components/BreadCrumb";
import Card from "@/app/components/Card";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MotionContainer from "@/app/components/MotionContainer";
import PriceFilter from "@/app/components/PriceFilter";
import Sort from "@/app/components/Sort";
import React from "react";

const page = () => {
  return (
    <main className=" bg-gray-50">
      <section className=" min-h-screen  ">
        <BreadCrumb />
        <div className=" flex justify-center">
          {" "}
          <MaxWidthWrapper className=" grid gap-10 grid-cols-9  mt-5 justify-center">
            <div className="col-span-3">
              <div className="rounded-2xl border border-gray-400  bg-white flex flex-col py-3  px-3">
                <Box filter="filters" text="Category" options={["All", "Paints", "Accessories", "Tools"]} />
                <PriceFilter />
                <Box
                  filter="colors"
                  text="Popular Colors"
                  options={[
                    "#3F3F46",
                    "#F43F5E",
                    "#FECDD3",
                    "#DB2777",
                    "#A21CAF",
                    "#7E22CE",
                    "#1D4ED8",
                    "#0369A1",
                    "#99F6E4",
                    "#2DD4BF",
                    "#854D0E",
                    "#713F12",
                    "#FDE68A",
                    "#B91C1C",
                    "#7F1D1D",
                    "#1E293B",
                  ]}
                />
                <Box
                  filter="tags"
                  text="POPULAR TAGS"
                  options={[
                    "Color Trend",
                    "wall paints",
                    "paints",
                    "master paints",
                    "colors",
                    "trends",
                    "color trends",
                    "paints",
                  ]}
                />
              </div>
            </div>
            <div className=" col-span-6 grid-cols-3">
              <div className=" flex  flex-grow justify-between">
                <div className="flex  items-center">
                  <h1 className=" text-black font-semibold">65,867</h1>{" "}
                  <p className=" text-muted-foreground ml-2">Results Found</p>
                </div>
                <Sort options={["Price: Low to High", "Price: High to Low"]} />
              </div>
              <MotionContainer className="sm:grid flex flex-col px-5  sm:grid-cols-2 lg:grid-cols-3 items-center gap-3 mt-[38px] justify-center">
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
                <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
              </MotionContainer>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
    </main>
  );
};

export default page;
