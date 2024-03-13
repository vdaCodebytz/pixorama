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

export const PostValidation = z.object({
  caption: z
    .string()
    .min(2, { message: "Caption must be at least 2 characters." })
    .max(2200, {
      message: "Caption must be less than 2200 characters.",
    }),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string().min(2).max(100),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});
