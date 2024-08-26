"use client";
import FormContainer from "@/app/components/FormContainer";
import ModalCustom from "@/app/components/ModalCustom";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";
import { Server } from "../../Server";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const DeleteAccount = () => {
  const router = useRouter();
  const t = useTranslations();
  const { handleLogout } = useAuth();
  const removeAccount = async (data: any, setError: any) => {
    const res = await Server({ resourceName: "remove_account", body: data });
    if (!res.status) setError(res.errors?.length > 0 ? res.errors : res.message)();
    if (res.status) {
      toast.success(res.message);
      router.push("/");
      handleLogout();
    }
  };
  return (
    <ModalCustom
      btn={
        <p className=" cursor-pointer z-10  mt-5 ml-3 font-semibold text-red-500 hover:text-red-400 duration-150">
          {t('deleteAccount')}
        </p>
      }
      content={
        <div className=" px-5 lg:px-20 py-5">
          <p>{t("deleteAccount")}</p>
          <p>{t("confirmDelete")}</p>
          <FormContainer
            btnText={t("delete")}
            schema="forgotPassword"
            submit={removeAccount}
            formArray={[
              {
                name: "password",
                type: "password",
                placeholder: t("password"),
              },
            ]}
          />
        </div>
      }
    />
  );
};

export default DeleteAccount;
