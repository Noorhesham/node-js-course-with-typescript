"use server";

import { getPasswordResetToken } from "@/data/passwordResetToken";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcrypt";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
  //we get the token from the url that we sent in the email of the user
  //we validate the field of the entered password (backend)
  //when we make a password reset token we make the token associated with the email and an expiration date
  //so we will search our data base for a reset password token of the token we got from the url
  //we also check for its expiration date
  //we get the user of that token using the email stored with that token
  //we hash the password
  //we update user data and we delete the access token
  if (!token) return { error: "missing token" };
  const validateFields = NewPasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }
  const { password } = validateFields.data;
  const existingToken = await getPasswordResetToken(token);
  if (!existingToken) {
    return { error: "could not find the token !" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist" };
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  await db.user.update({ where: { id: existingUser.id }, data: { password: hashedPassword } });
  await db.passwordResetToken.delete({ where: { id: existingToken.id } });
  return { success: "password updated" };
};
