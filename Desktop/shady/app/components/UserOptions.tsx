"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, LayoutDashboard, LogOutIcon, Settings } from "lucide-react";
import Link from "next/link";
import { FaPhone, FaWallet, FaGraduationCap, FaUser } from "react-icons/fa";
import React from "react";
import ModelCustom from "./ModelCustom";
import UserUpdateForm from "./UserUpdateForm";
import { StudentProfile } from "./User";
import Info from "./Info";
import { MdPassword } from "react-icons/md";
import ResetPassword from "./ResetPassword";
export const formattedDate = (date: Date) => date.toLocaleString("en-US", { month: "long", year: "numeric" });

const UserOptions = ({ user, show = false }: { user: StudentProfile; show?: boolean }) => {
  return (
    <>
      <div dir="rtl" className="flex flex-col gap-4 items-center justify-between space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.avatar || "/avatarDefualt.jpg"} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 flex flex-col  text-center">
          <Info title="رقم الهاتف" desc={user.phone} icon={<FaPhone />} />
          <Info title="قيمة حسابي" desc={`${user.balance} ج`} icon={<FaWallet />} />
          <Info title="المرحلة الدراسية" desc={user.level_name} icon={<FaGraduationCap />} />
          <Info title="النوع" desc={user.type} icon={<FaUser />} />
        </div>

        <div dir="rtl" className="flex w-full items-start flex-col mt-5 text-right">
          <ModelCustom
            title="الاعدادات"
            text="تعديل الملف الشخصي"
            btn={
              <div
                dir="rtl"
                className="flex items-center flex-row-reverse duration-200  py-2 px-4 rounded-xl cursor-pointer gap-3"
              >
                <p className="">اعدادات المستخدم</p>
                <Settings />
              </div>
            }
            content={<UserUpdateForm userData={user} />}
          />
          <ModelCustom
            title=" تغيير كلمة المرور "
            text=""
            btn={
              <div dir="rtl" className="flex  w-full  flex-row duration-200  py-2 px-4 rounded-xl cursor-pointer gap-3">
                <MdPassword />
                <p className=""> تغيير كلمة المرور</p>
              </div>
            }
            content={<ResetPassword />}
          />
        </div>
      </div>
    </>
  );
};

export default UserOptions;
