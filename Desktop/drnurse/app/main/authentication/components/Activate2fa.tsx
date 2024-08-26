"use client";

import { toast } from "react-toastify";
import { Server } from "../../Server";
import { Checkbox } from "@/components/ui/checkbox";
import Head1 from "@/app/components/Head1";
import { useLocalStorageState } from "@/app/hooks/useLocalStorageState";
import QRCode from "qrcode";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InputOTPPattern } from "./OTP";
import { TbAuth2Fa } from "react-icons/tb";
import UpdateCard from "@/app/components/UpdateCard";
import ModalCustom from "@/app/components/ModalCustom";
import { useTranslations } from "next-intl";
import { useAuth } from "@/app/context/AuthContext";
import { SkeletonCard } from "@/app/components/SkeletonCard";
const Activate2fa = () => {
  const [serial, setSerial] = useLocalStorageState("serial", "");
  const [qrCode, setQrCode] = useLocalStorageState("qrCode", "");
  const { userSettings, loading, setLogin } = useAuth();
  const t = useTranslations();
  const [qr, setQr] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const isActivated = userSettings?.tfa;
  useEffect(() => {
    QRCode.toDataURL(qrCode).then(setQr);
  }, [qrCode]);
  const handleCheckTfa = async () => {
    const res = await Server({
      body: { tfa: isActivated === false ? 1 : 0, type: "activate" },
      resourceName: "tfaActivate",
    });
    console.log(res);
    if (!res.status) toast.error(res.message);
    if (res.status) {
      toast.success(res.message);
      setLogin((l: any) => !l);
      setSerial(res.serial);
      setQrCode(res.serial_qr);
    }
  };
  if (loading) return <SkeletonCard className="w-full" />;
  const secret = serial?.match(/secret=([^&]+)/)?.[1];

  return (
    <ModalCustom
      btn={
        <div>
          <UpdateCard desc={t("2fadesc")} text={t("2fa")} icon={<TbAuth2Fa className=" text-main w-10 h-10" />} />
        </div>
      }
      content={
        <section className=" flex flex-col items-center">
          <div className="flex mt-5 items-center space-x-2">
            <Checkbox defaultChecked={userSettings?.tfa} onCheckedChange={() => handleCheckTfa()} id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("2fadesc")}
            </label>
          </div>
          <div>
            {serial && isActivated && (
              <div className=" text-2xl items-center flex flex-col mt-5">
                <Head1 text="YOUR SERIAL" />
                <p className=" text-black text-lg">{secret||serial}</p>
                <Image alt="" src={`${qr}`} width={200} height={200} />
                <InputOTPPattern setServerError={setErr} sendType="" activate={true} handleSend={handleCheckTfa} />
              </div>
            )}
            {err && <p className=" hover:text-red-400 text-red-500 font-semibold ">{err}</p>}
          </div>
        </section>
      }
    />
  );
};

export default Activate2fa;
