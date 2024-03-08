"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface LoginButtonProps {
  children: ReactNode;
  mode?: "redirect" | "model";
  asChild?: boolean;
}

const LoginButton = ({ children, mode = "redirect", asChild }: LoginButtonProps) => {
  const { push } = useRouter();
  if (mode === "model") {
    return null;
  }
  return <span onClick={() => push("auth/login")}>{children}</span>;
};

export default LoginButton;
