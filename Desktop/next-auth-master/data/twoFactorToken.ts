import { db } from "@/lib/db";
export const getTwoFactorByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({ where: { token } });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
export const getTwoFactorByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({ where: { email } });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
