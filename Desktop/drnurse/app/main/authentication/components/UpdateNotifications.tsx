import FormContainer from "@/app/components/FormContainer";
import { Notifications } from "@/app/components/Icons";
import ModalCustom from "@/app/components/ModalCustom";
import UpdateCard from "@/app/components/UpdateCard";
import React from "react";
const notifications = [{ name: "active", label: "DEACTIVATE", label2: "ACTIVATE", switchToggle: true }];

const UpdateNotifications = () => {
  return (
    <ModalCustom
      btn={
        <div>
          <UpdateCard
            text="CUSTOMIZE NOTIFICATIONS"
            desc="CONFIGURE CUSTOM SETTINGS"
            icon={<Notifications color="#E6007E" />}
          />
        </div>
      }
      content={
        <div className=" px-5 lg:px-20 py-5">
          <FormContainer
            cancel={true}
            btnStyles={"w-full"}
            btnText="SAVE CHANGES"
            schema="notifictations"
            formArray={notifications}
            title="CUSTOMIZE  NOTIFICATIONS"
          />
        </div>
      }
    />
  );
};

export default UpdateNotifications;
