import React from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import ImageGrid from "../../../components/ImageGrid";
import Tabing from "../../../components/Tabing";

const page = () => {
  const tabs = [
    {
      label: "All",
      content: (
        <>
          <ImageGrid
            images={[
              "/Rectangle 156409.svg",
              "/Rectangle 156410.svg",
              "/Rectangle 156411.svg",
              "/Rectangle 156412.svg",
              "/Rectangle 156413.svg",
            ]}
          />
          <ImageGrid
            reverse={true}
            images={[
              "/Rectangle 156409.svg",
              "/Rectangle 156410.svg",
              "/Rectangle 156411.svg",
              "/Rectangle 156412.svg",
              "/Rectangle 156413.svg",
            ]}
          />
          <ImageGrid
            separate={true}
            images={[
              "/Rectangle 156409.svg",
              "/Rectangle 156410.svg",
              "/Rectangle 156411.svg",
              "/Rectangle 156412.svg",
              "/Rectangle 156413.svg",
              "/Rectangle 156411.svg",
              "/Rectangle 156412.svg",
              "/Rectangle 156413.svg",
            ]}
          />
        </>
      ),
      href: "all",
    },
    {
      label: "Living Room",
      content: (
        <>
          <ImageGrid
            images={[
              "/Rectangle 156409.svg",
              "/Rectangle 156410.svg",
              "/Rectangle 156411.svg",
              "/Rectangle 156412.svg",
              "/Rectangle 156413.svg",
            ]}
          />
          <ImageGrid
            reverse={true}
            images={[
              "/Rectangle 156409.svg",
              "/Rectangle 156410.svg",
              "/Rectangle 156411.svg",
              "/Rectangle 156412.svg",
              "/Rectangle 156413.svg",
            ]}
          />
          <ImageGrid
            separate={true}
            images={[
              "/Rectangle 156409.svg",
              "/Rectangle 156410.svg",
              "/Rectangle 156411.svg",
              "/Rectangle 156412.svg",
              "/Rectangle 156413.svg",
              "/Rectangle 156411.svg",
              "/Rectangle 156412.svg",
              "/Rectangle 156413.svg",
            ]}
          />
        </>
      ),
      href: "Living-room",
    },
    {
      content: (
        <>
          <ImageGrid
            images={[
              "/Rectangle 156409.svg",
              "/Rectangle 156410.svg",
              "/Rectangle 156411.svg",
              "/Rectangle 156412.svg",
              "/Rectangle 156413.svg",
            ]}
          />
          <ImageGrid
            reverse={true}
            images={[
              "/Rectangle 156409.svg",
              "/Rectangle 156410.svg",
              "/Rectangle 156411.svg",
              "/Rectangle 156412.svg",
              "/Rectangle 156413.svg",
            ]}
          />
          <ImageGrid
            separate={true}
            images={[
              "/Rectangle 156409.svg",
              "/Rectangle 156410.svg",
              "/Rectangle 156411.svg",
              "/Rectangle 156412.svg",
              "/Rectangle 156413.svg",
              "/Rectangle 156411.svg",
              "/Rectangle 156412.svg",
              "/Rectangle 156413.svg",
            ]}
          />
        </>
      ),
      href: "bedroom",
      label: "Bed room",
    },
    { href: "kitchen", label: "Kitchen", content: <></> },
    { href: "kidsroom", label: "Kids room", content: <></> },
    { href: "kidsroom", label: "Kids room", content: <></> },
  ];
  return (
    <>
      <BreadCrumb />
      <MaxWidthWrapper className=" mt-5">
        <p className=" text-[14px] text-black max-w-[1259px] text-center">
          SEO Content s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.Lorem Ipsum{" "}
        </p>
        <Tabing defaultValue="all" options={tabs} />
      </MaxWidthWrapper>
    </>
  );
};

export default page;
