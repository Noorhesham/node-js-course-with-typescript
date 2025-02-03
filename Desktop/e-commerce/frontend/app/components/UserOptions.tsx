"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, LayoutDashboard, LogOutIcon, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { useGetMe } from "@/utils/QueryFunctions";

const UserOptions = ({ user, show = false }: { user: any; show?: boolean }) => {
  const router = useRouter();
  const { data, isLoading } = useGetMe();
  console.log(data?.data);
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-between space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.image || `${user.photo?.imgUrl}` || "/avatar.jpg"} />
          <AvatarFallback>{user.firstName}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 text-center">
          <Link
            href={`/profile/${user.id}`}
            className="text-sm font-semibold hover:underline duration-200 cursor-pointer"
          >
            {user.name}
          </Link>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>
    </>
  );
};

export default UserOptions;
