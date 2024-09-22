import Filters from "@/app/components/Filters";
import GridContainer from "@/app/components/defaults/GridContainer";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import Sort from "@/app/components/Sort";
import React, { Suspense } from "react";
import FilterMobile from "@/app/components/FilterPhone";
import Doctor from "@/app/components/Doctor";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Head1 from "@/app/components/defaults/Head1";
import { PaginationDemo } from "@/app/components/Pagination";
import Search from "@/app/components/Search";
import { MultiSelect } from "@/app/components/inputsForm/MultiSelect";
const doctors = [
  {
    name: "Mohamed M.",
    image: "/doctor1.png",
    speciality: "Dentist",
    address: "Nairobi, Kenya",
    duration: "in 7 days",
  },
  { name: "Dr. Maria", image: "/doctor2.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor3.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor4.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor6.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
];
const page = () => {
  return (
    <section className=" py-32">
      <MaxWidthWrapper className="flex gap-5 flex-col ">
        <Head1 title="هنا ستجد افضل الدكاترة بمصر !" color="text-main" />

        <Search />

        <div className="">
          <div className="flex flex-col gap-3 col-span-2 lg:col-span-6">
            <GridContainer cols={3}>
              {doctors.map((doc) => (
                <Doctor doctor={doc} />
              ))}
            </GridContainer>
            <PaginationDemo />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
