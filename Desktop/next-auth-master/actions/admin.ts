"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const adminAction = async () => {
  const role = await currentRole();
  if (role === UserRole.ADMIN) return { sucess: "You are allowed To Access thisAdmin Action" };
  else return { error: "Forbidden server action for normal users!" };
};
