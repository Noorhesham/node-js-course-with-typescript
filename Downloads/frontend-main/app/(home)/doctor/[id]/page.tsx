import Head1 from "@/app/components/defaults/Head1";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Paragraph from "@/app/components/defaults/Paragraph";
import { Clock, Coins } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Import Tooltip components from shadcn
import GridContainer from "@/app/components/defaults/GridContainer";
import { Button } from "@/components/ui/button";
import ModalCustom from "@/app/components/defaults/ModalCustom";
import Container from "@/app/components/Container";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import AvailableSlots from "@/app/components/AvailabelSlots";
import MapContainer from "@/app/components/MapContainer";

const page = () => {
  return (
    <MaxWidthWrapper>
      {/* Doctor Header Image */}
      <div className="w-full h-64 relative">
        <Image src="/10558814.jpg" alt="doctor" fill className="object-cover" />
      </div>

      <div className="-mt-16 mx-5">
        {/* Doctor's Profile Picture */}
        <div className="w-40 h-40 rounded-full relative overflow-hidden">
          <Image src="/doctor2.png" alt="doctor" fill className="object-cover" />
        </div>

        {/* Doctor's Details */}
        <div className=" py-4  border-b border-input flex flex-col gap-4 ">
          <Head1 size="text-3xl" title="دكتورة ملهاش اي اسم خالص بجد  " />
          <div className="flex justify-between items-start ">
            <span>مستشفي المنصوررة الحكومي</span>
            <div className="flex gap-4 items-center  ">
              {/* Tooltip for Clock Icon */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <span>4ايام التواجد</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>عدد أيام التواجد بالمستشفي</span> {/* Tooltip content */}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Tooltip for Coins Icon */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                      <Coins className="w-5 h-5 text-yellow-500" />
                      <span> 200 جنيه</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>سعر الكشف</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-4 gap-3">
          <Head1 size="text-xl" title="المعلومات الشخصية" />
          <Paragraph description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, ipsa." />
        </div>
        <GridContainer className="" cols={2}>
          <div className="flex flex-col gap-4 col-span-1">
            <Container  className=" flex flex-col gap-3">
              <Head1 size="text-3xl" title="اسم العيادة" />
              <Paragraph description="هذا هو عنوان العيادة الاسطوري الذي لا يوجد منه في المجرة ولوريم ايبسوم" />
              <ModalCustom btn={<Button className=" w-full">احجز الان </Button>} content={<AvailableSlots />} />
            </Container>
          </div>
          <div className=" col-span-1">
            <MapContainer location={{ lat: 0, lng: 0 }} />
          </div>
        </GridContainer>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
