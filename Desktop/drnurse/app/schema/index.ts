import { z } from "zod";
const phoneRegex = /^[0-9]{10,14}$/; // Adjust this regex based on your specific phone number requirements
export const phoneSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});
export const loginSchema = z
  .object({
    useEmail: z.boolean(),
    username: z.string(),
    password: z.string().min(4, "Password must be at least 4 characters"),
  })
  .refine(
    (data) => {
      if (data.useEmail) {
        return z.string().email({ message: "Invalid email address" }).safeParse(data.username).success;
      } else {
        return phoneRegex.test(data.username);
      }
    },
    {
      message: "Invalid email address or phone number",
      path: ["username"],
    }
  );
export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  referealCode: z.string(),
});

export const resetPasswordSchemaPrepare = z
  .object({
    username: z.string(),
    useEmail: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.useEmail) {
        return z.string().email({ message: "Invalid email address" }).safeParse(data.username).success;
      } else {
        return phoneRegex.test(data.username);
      }
    },
    {
      message: "Invalid email address or phone number",
      path: ["username"],
    }
  );
export const resetPasswordForgot = z.object({
  code: z.string(),
});
export const contactUsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone number is too short"),
  email: z.string().email("Invalid email address"),
  inquiry: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters long"),
});
export const forgotPasswordSchema2 = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  // password:z.string().min(6, "Password must be at least 6 characters long"),
});

export const notifictationsSchema = z.object({
  active: z.boolean(),
});
export const personalSchema = z.object({
  name: z.string(),
  birth_day: z.any(),
  avatar: z.any().optional(),
});

export const commentSchema = z.object({
  comment: z.string(),
  name: z.string(),
  rate: z.number(),
});
export const emailSchema = z.object({
  email: z.string().email(),
});
