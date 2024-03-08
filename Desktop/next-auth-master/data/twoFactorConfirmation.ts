import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorToken = await db.twoFactorConfirmation.findUnique({ where: { userId } });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
