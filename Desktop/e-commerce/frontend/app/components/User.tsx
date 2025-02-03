"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import UserOptions from "./UserOptions";

const User = ({ user, className, open, show }: { user: any; className?: string; open?: boolean; show?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleTriggerClick = () => {
    if (open) return;
    setIsOpen(!isOpen);
  };
  return (
    <HoverCard open={open ? false : isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger className="cursor-pointer" asChild>
        <div onClick={handleTriggerClick}>
          <Avatar className={`${className || ""}`}>
            <AvatarImage src={user.image || `${user.photo?.imgUrl}` || "/avatarDefualt.jpg"} />
            <AvatarFallback>{user.name}</AvatarFallback>
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
