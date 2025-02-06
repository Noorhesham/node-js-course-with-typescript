import React, { use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import useLogout from "../hooks/useLogout";
const User = ({ user }: { user: { name: string; image: { secure_url: string; publicId: string }; email: string } }) => {
  const logout = useLogout();
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className="cursor-pointer !w-12 !h-12 relative rounded-full">
          <AvatarImage className="  " src={user.image?.secure_url || "/avatarDefualt.jpg"} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className=" justify-between space-x-4">
          <div className="space-y-1 flex flex-col gap-5">
            <h4 className="text-sm font-semibold">{user.name}</h4>
            <p className="text-sm">{user.email}</p>
            <Button onClick={() => logout()} variant={"outline"}>
              Log out
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default User;
