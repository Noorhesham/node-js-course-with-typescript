import { GridBackgroundDemo } from "@/app/components/BackGrid";
import GridContainer from "@/app/components/defaults/GridContainer";
import Paragraph from "@/app/components/defaults/Paragraph";
import Head from "@/app/components/Head";
import { MessageCircleIcon, MapPinIcon, MailIcon, PhoneIcon } from "lucide-react";
import React from "react";
import AboutCard from "@/app/components/AboutCard";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { getTranslations } from "next-intl/server";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GrEmoji } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Page = async () => {
  const t = await getTranslations();

  const cards = [
    {
      icon: MessageCircleIcon,
      title: t("contact.salesTitle"),
      description: t("contact.salesDescription"),
      link: "mailto:sales@dummy.com",
    },
    {
      icon: MapPinIcon,
      title: t("contact.visitTitle"),
      description: t("contact.visitDescription"),
      link: "https://www.google.com/maps",
    },
    {
      icon: MailIcon,
      title: t("contact.emailTitle"),
      description: t("contact.emailDescription"),
      link: "mailto:info@dummy.com",
    },
    {
      icon: PhoneIcon,
      title: t("contact.phoneTitle"),
      description: t("contact.phoneDescription"),
      link: "tel:+1234567890",
    },
  ];

  return (
    <section>
      <GridBackgroundDemo>
        <div className="flex items-center flex-col gap-4">
          <Head text={t("contact.headline")} className="text-7xl font-bold" />
          <Paragraph className=" text-gray-800" size="lg" description={t("contact.subText")} />
          <MaxWidthWrapper>
            <GridContainer cols={4}>
              {cards.map((card, index) => (
                <AboutCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  link={card.link}
                />
              ))}
            </GridContainer>
          </MaxWidthWrapper>
        </div>
      </GridBackgroundDemo>
      <MaxWidthWrapper className=" flex items-center flex-col gap-3">
        <Head text={t("questions")} className="text-7xl font-bold" />
        <Accordion type="single" collapsible className="w-full md:w-[60%] flex-col items-center">
          <AccordionItem className="" value="item-1">
            <AccordionTrigger className=" text-xl font-semibold flex justify-start gap-2 items-start">
              <div className=" flex items-center gap-2">
                <div className=" p-2 w-fit rounded-xl border border-input">
                  <GrEmoji size={24} />
                </div>
                <p>Is it accessible?</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className=" text-base font-medium">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="" value="item-2">
            <AccordionTrigger className=" text-xl font-semibold flex justify-start gap-2 items-start">
              <div className=" flex items-center gap-2">
                <div className=" p-2 w-fit rounded-xl border border-input">
                  <GrEmoji size={24} />
                </div>
                <p>Is it accessible?</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className=" text-base font-medium">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="" value="item-3">
            <AccordionTrigger className=" text-xl font-semibold flex justify-start gap-2 items-start">
              <div className=" flex items-center gap-2">
                <div className=" p-2 w-fit rounded-xl border border-input">
                  <GrEmoji size={24} />
                </div>
                <p>Is it accessible?</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className=" text-base font-medium">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className=" flex flex-col gap-2 items-center">
          <Head text={t("questions")} className="text-7xl font-bold" />
          <Paragraph className=" text-gray-800" size="lg" description={t("contact.subText")} />
          <div className="flex  items-center gap-4">
            <Button className=" rounded-full">
              <Link href={"/courses"}>شاهد الكورسات</Link>
            </Button>
            <Button className=" rounded-full">
              <Link href={"/"}>الرئيسية</Link>{" "}
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Page;
