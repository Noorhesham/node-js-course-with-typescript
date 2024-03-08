"use server";

import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation";
import { getTwoFactorByEmail } from "@/data/twoFactorToken";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { defaultLoginRedirect } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  //validate on the backend
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) return { error: "invalid fields!" };
  //get validated data from the frontend
  const { email, password, code } = validateFields.data;
  //search a user by his unique email from the DB Data function
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials !" };
  }
  //we make sure he entered the password correctly so that we can keep going in the login process
  const pass = await bcrypt.compare(password, existingUser.password);
  if (!pass) {
    return { error: "Invalid credentials !" };
  }
  //id he has not yet confirmed his email we return this so that he asks for another code in the front using a button
  if (!existingUser?.emailVerified) {
    return { confirmEmail:true };
  }
  //we will see if he enabled 2FA if yes and the code is sent from the front end then we 
  //1)get the token by the email of the user and check if expired
  //2)we delete this token and we confirm the user 
  //3)before confirming it we check if it is already cofirmed we delete that old confirmation
  //4)we create a confir,ation usin the user id 

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const token = await getTwoFactorByEmail(existingUser.email);
      if (!token || token.token !== code) return { error: "Invalid code !" };
      const hasExpired = new Date(token.expires) < new Date();
      if (hasExpired) return { error: "Expired Code !" };
      await db.twoFactorToken.delete({ where: { id: token.id } });
      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({ where: { id: existingConfirmation.id } });
      }
      await db.twoFactorConfirmation.create({ data: { userId: existingUser.id } });
    } else {
      //if we did not send it yet (no code sent in the front) we generate a token of 6 digits and send it to the email
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", { email, password, redirectTo: defaultLoginRedirect });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credintials" };
        default:
          return { error: "something went wrong" };
      }
    }
    throw error;
  }
};
