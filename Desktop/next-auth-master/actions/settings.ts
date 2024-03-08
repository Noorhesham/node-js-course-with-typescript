"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcrypt";
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use !" };
    }
    const verficationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(verficationToken.email, verficationToken.token);
    return { success: "verification email sent !" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password);
    if (!passwordMatch) return { error: "password incorrect!" };
    const hashedPassword = await bcrypt.hash(values.newPassword, 12);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }
  await db.user.update({ where: { id: dbUser.id }, data: { ...values } });
  return { success: "Settings updated !" };
};
