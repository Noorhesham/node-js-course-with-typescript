"use client";
import { Location, Phone } from "@/app/components/Icons";
import IconWidget from "@/app/components/IconWidget";
import { FaMailBulk } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import cookies from "js-cookie";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Address = () => {
  const t = useTranslations();
  const { generalSettings, loading } = useAuth();
  if (loading)
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    );
  const { company_contacts } = generalSettings;
  const local = cookies.get("NEXT_LOCALE");
  const address = company_contacts.address?.[local || "en"];
  console.log(address);
  return (
    <div>
      <IconWidget paragraph={address} header={t("address.title")} icon={<Location />} />
      <IconWidget
        paragraph={`${t("address.hotline")} 19842 ${company_contacts.phone}`}
        header={t("address.phone")}
        icon={<Phone />}
      />
      <Link href={`mailto:${company_contacts.email || "info@orient-paints.com"}`}>
        <IconWidget
          paragraph="info@orient-paints.com"
          header={t("address.email")}
          icon={<FaMailBulk className=" text-main" />}
        />
      </Link>
    </div>
  );
};

export default Address;
