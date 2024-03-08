"use client";

import { UserRole } from "@prisma/client";
import FormError from "../FormError";
import { useUserRole } from "@/hooks/useUserRole";


interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
};

export const RoleGate = ({
  children,
  allowedRole,
}: RoleGateProps) => {
  const role = useUserRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    )
  }

  return (
    <>
      {children}
    </>
  );
};