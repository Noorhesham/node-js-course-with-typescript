"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { defaultLoginRedirect } from "@/routes";

const Social = () => {
  const searchParams = useSearchParams();
  //   const callbackUrl = searchParams.get("callbackUrl");
  //   const onClick = (provider: "google" | "github") =>{}
  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: defaultLoginRedirect });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button onClick={() => onClick("google")} size="lg" className="w-full" variant="outline">
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button onClick={() => onClick("github")} size="lg" className="w-full" variant="outline">
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
