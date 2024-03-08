"use server";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const sendVerification = async (email: string) => {
  const verficationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verficationToken.email, verficationToken.token);
  return {success:"Email sent successfully !"}
};
