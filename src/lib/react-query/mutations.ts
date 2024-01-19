import { INewUser } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { createNewAcc, signIn, signOut } from "../appwrite/auth";

export const useCreateNewAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createNewAcc(user),
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => signIn(user),
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut,
  });
};
