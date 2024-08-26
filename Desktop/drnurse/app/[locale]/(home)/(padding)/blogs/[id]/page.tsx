import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { Server } from "@/app/main/Server";
import { convertToHTML } from "@/lib/utils";
import { CalendarHeartIcon, LayoutDashboardIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = async ({ params }: { params: { locale: string; id: string } }) => {
  const data = await Server({ resourceName: "getSingleEntity", id: params.id, entityName: "blogs" });
  const item: any = data.item;
  const { main_gallery, title, content } = item;
  const contentHTML = convertToHTML(content);
  console.log(main_gallery);
  return (
    <section className=" min-h-screen  ">
      <MaxWidthWrapper className="flex flex-col items-start px-14  mt-5 justify-center">
        <div className=" relative w-full h-96 lg:h-[750px]">
          <Image src={main_gallery[0].sizes.large} alt="blog" className=" object-contain lg:object-cover" fill />
        </div>
        <div className=" flex items-start mr-auto my-10 gap-3">
          <div className=" flex items-center gap-2">
            <CalendarHeartIcon />
            <p className=" text-xs font-medium text-[#475156]">1 FEB,2025</p>
          </div>
          <div className=" flex items-center gap-2">
            <LayoutDashboardIcon />
            <p className=" text-xs font-medium text-[#475156]">Blog</p>
          </div>
        </div>
        <h1 className=" capitalize mb-4 text-4xl text-main2 text-left font-semibold max-w-5xl">{title}</h1>
        <div className=" font-[300] text-base" dangerouslySetInnerHTML={{ __html: contentHTML }} />
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
