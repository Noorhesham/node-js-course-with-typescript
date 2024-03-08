"use server";
import bcrypt from "bcrypt";
import { SignupSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
export const signup = async (values: z.infer<typeof SignupSchema>) => {
  //validate on the backend
  const validateFields = SignupSchema.safeParse(values);
  if (!validateFields.success) return { error: "invalid fields!" };
  const { password, email, name } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 12);
  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "Email already in use !" };
  await db.user.create({ data: { name, email, password: hashedPassword } });
  //send verfication mail
  const verficationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verficationToken.email, verficationToken.token);
  return { success: "Confirmation email sent !" };
};
