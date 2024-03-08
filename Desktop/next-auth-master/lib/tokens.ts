import { v4 as uuid4 } from "uuid";
import { db } from "./db";
import { getVerificationTokenByEmail } from "@/data/verficationToken";
import { getPasswordResetEmail } from "@/data/passwordResetToken";
import crypto from "crypto";
import { getTwoFactorByEmail } from "@/data/twoFactorToken";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getTwoFactorByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({ where: { id: existingToken.id } });
  }
  const twoFactorToken = await db.twoFactorToken.create({ data: { expires, token, email } });
  return twoFactorToken;
};
export const generateVerificationToken = async (email: string) => {
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verficationToken.delete({ where: { id: existingToken.id } });
  }
  const verficationToken = await db.verficationToken.create({ data: { expires, token, email } });
  return verficationToken;
};
export const generatePasswordResetToken = async (email: string) => {
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordResetEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({ where: { id: existingToken.id } });
  }
  const passwordResetToken = await db.passwordResetToken.create({ data: { expires, token, email } });
  return passwordResetToken;
};
