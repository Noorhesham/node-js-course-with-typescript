import React from "react";
import { Server } from "../../Server";
import { toast } from "react-toastify";
import ModalCustom from "@/app/components/ModalCustom";
import { Lock } from "lucide-react";
import UpdateCard from "@/app/components/UpdateCard";
import FormContainer from "@/app/components/FormContainer";
import { useTranslations } from "next-intl";

const UpdatePassword = () => {
  const t = useTranslations();
  const updatePasswordInfo = async (data: any, setError: any) => {
    const res = await Server({ resourceName: "update_password", body: data });
    console.log(res);
    if (!res.status) setError(res.errors || res.message)();
    if (res) {
      toast.success(res.message);
      setError(null);
    }
  };
  const updatePassword = [
    { name: "password", placeholder: t("password"), type: "password", password: true, noProgress: false },
  ];
  return (
    <ModalCustom
      btn={
        <div>
          <UpdateCard
            text={t("updatePassword")}
            desc={t("personalDetails")}
            icon={<Lock className="w-10 h-10 text-main" />}
          />
        </div>
      }
      content={
        <div className=" px-5 lg:px-20 py-5">
          <FormContainer
            submit={updatePasswordInfo}
            cancel={true}
            btnStyles={"w-full"}
            btnText={t("confirm")}
            schema="forgotPassword"
            formArray={updatePassword}
            title={t("updatePassword")}
          />
        </div>
      }
    />
  );
};

export default UpdatePassword;
