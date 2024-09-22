"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import UserOptions from "./UserOptions";
import { useGetEntity } from "@/lib/QueryFunctions";
import { Skeleton } from "@/components/ui/skeleton";
export interface StudentProfile {
  avatar: string | null;
  average_level_percentage: string;
  balance: string;
  city_id: number;
  city_name: string;
  gender: "male" | "female";
  governorate_id: number;
  governorate_name: string;
  id: number;
  level_id: number;
  level_name: string;
  name: string;
  parent_phone: string;
  phone: string;
  type: "online" | "offline";
}
const User = ({ className, open, show }: { className?: string; open?: boolean; show?: boolean }) => {
  const { data, isLoading } = useGetEntity({ entityName: "students/me" });
  const user = data?.data;
  const [isOpen, setIsOpen] = useState(false);
  const handleTriggerClick = () => {
    if (open) return;
    setIsOpen(!isOpen);
  };
  console.log(user);
  if (isLoading) return <Skeleton className=" w-14  h-14 rounded-full" />;

  return (
    <HoverCard open={open ? false : isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger className="cursor-pointer" asChild>
        <div onClick={handleTriggerClick}>
          <Avatar className={` w-14  h-14`}>
            <AvatarImage src={user.avatar || "/avatarDefualt.jpg"} />
            <AvatarFallback>{user.firstName}</AvatarFallback>
          </Avatar>
        </div>
      </HoverCardTrigger>
      {
        <HoverCardContent className="w-80 z-[999999]">
          <UserOptions show={show} user={user} />
        </HoverCardContent>
      }
    </HoverCard>
  );
};

export default User;
