import FormContainer from "@/app/components/FormContainer";
import Head1 from "@/app/components/Head1";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Section from "@/app/components/Section";
import SocialMedia from "@/app/components/Socials";
import { BookAIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Paragraph from "@/app/components/Paragraph";
import Address from "@/app/components/Address";
import ContactUsLocation from "@/app/components/ContactUsLocation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <MaxWidthWrapper>
        <div className=" flex flex-col  gap-2 md:grid items-stetch  md:grid-cols-4">
          <Section
            CustomePadding="px-0  lg:px-0"
            className="  w-full col-span-2 flex flex-col gap-4"
            heading={t("contact.title")}
          >
            <Paragraph description={t("contact.description")} />
            <Address />

            <div className=" flex flex-col items-start mt-2">
              <h1 className="  font-semibold text-main">{t("contact.contact")}</h1>
              <Paragraph description={t("contact.contactDescription")} />
              <SocialMedia />
            </div>
          </Section>
          <div className=" lg:mt-0 mt-2 w-full flex flex-col items-start col-span-2">
            <Head1 size="sm" text={t("contact.question")} />
            <FormContainer
              schema={"contact"}
              btnText={t("contact.send")}
              formArray={[
                { name: "name", placeholder: t("forms.name"), type: "text" },
                { name: "phone", placeholder: t("forms.phone"), type: "text", phone: true },
                { name: "email", placeholder: t("forms.email"), type: "email" },
                { name: "inquiry", placeholder: t("forms.inquiry"), type: "text", select: true },
                { name: "message", placeholder: t("forms.message"), type: "text", area: true },
              ]}
            />
          </div>
        </div>
      </MaxWidthWrapper>
      <ContactUsLocation />
    </>
  );
};

export default Page;
