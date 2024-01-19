import * as z from "zod";

export const SignupSchema = z.object({
  name: z.string().min(2, { message: "Too short" }),
  username: z.string().min(2, { message: "Too short" }),
  password: z
    .string()
    .min(8, { message: "Password should be of minimum 8 characters" }),
  email: z.string(),
});

export const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});
