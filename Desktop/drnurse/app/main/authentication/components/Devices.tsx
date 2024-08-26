"use client";
import ModalCustom from "@/app/components/ModalCustom";
import Spinner from "@/app/components/Spinner";
import UpdateCard from "@/app/components/UpdateCard";
import { useGetEntity } from "@/lib/queries";
import { format } from "date-fns";
import React from "react";
import { FaPhone } from "react-icons/fa";
import { MdOutlineDevices } from "react-icons/md";
import { HiComputerDesktop } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Server } from "../../Server";
import { useTranslations } from "next-intl";

const Devices = () => {
  const { data, isLoading } = useGetEntity("getDevices");
  const t = useTranslations();
  const filteredResult = Object.keys(data || {})
    .filter((key) => typeof data[key] === "object")
    .map((key) => data[key]);
  console.log(data, filteredResult);
  return (
    <ModalCustom
      btn={
        <div>
          <UpdateCard
            desc={t("devicesDesc")}
            text={t("devices")}
            icon={<MdOutlineDevices className=" text-main w-10 h-10" />}
          />
        </div>
      }
      content={
        isLoading ? (
          <Spinner />
        ) : (
          <div className=" px-5 lg:px-20 py-5">
            {filteredResult.map((val, i) => (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2" key={i}>
                  {val.device_type.toLowerCase() === "desktop" && (
                    <HiComputerDesktop className=" mb-auto text-main w-10 h-10 md:w-14 md:h-14" />
                  )}
                  {val.device_type === "mobile" && <FaPhone className=" text-main w-10 h-10 md:w-14 md:h-14" />}
                  <div className=" flex  items-start gap-2">
                    <h1 className=" font-semibold text-gray-900">{val.device_type}</h1>
                    <span className="text-muted-foreground">{format(val.created_at, "dd/MM/yyyy")}</span>
                    <span className="text-muted-foreground">{val.device_id}</span>
                    <div className=" flex  items-center gap-2">
                      <p>{val.os}</p> <p>{val.version}</p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={async () => {
                    const res = await Server({ resourceName: "deviceLogout", body: { device_id: val.device_id } });
                    console.log(res);
                  }}
                  className=" self-end mt-2"
                  variant={"outline"}
                >
                  {t("logoutDevice")}
                </Button>
              </div>
            ))}
          </div>
        )
      }
    />
  );
};

export default Devices;
