import { Button } from "@/components/ui/button";
import React from "react";
import UpdateUserForm from "./UpdateUserForm";

import { FcApproval } from "react-icons/fc";
import ModalCustom from "./defaults/ModalCustom";

const UserCard = ({ user }: { user: any }) => {
  return (
    <div className="flex col-span-1 relative overflow-hidden w-full mb-auto h-full self-stretch flex-col items-center py-2 px-4  md:py-4 md:px-8 ">
      <div className=" z-10 p-1">
        <img src={user?.photo} className="w-[8rem] h-[8rem] rounded-full" />
      </div>
      <div className="flex z-5 py-5 px-10 w-full user rounded-3xl -mt-20 text-gray-800 items-center text-lg  flex-col gap-2">
        <div className=" mt-24 flex flex-col items-center">
          <h1 className=" font-bold flex items-center gap-2">
            {user.firstName} {user.lastName} <FcApproval />
          </h1>
          {<h4 className="">{user.phoneNumber}</h4>}
          <div className="grid grid-cols-3 gap-2 my-2 md:my-4 items-center "></div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
