import { Models } from "appwrite";

export interface INewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface INewUserDB {
  name: string;
  username: string;
  email: string;
  accountId: string;
  imageUrl: URL;
  bio?: string;
}

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type IContextType = {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuth: () => Promise<boolean>;
};

// new types

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type FileUploaderProps = {
  fieldChange: (file: File[]) => void;
  mediaUrl: string;
};

export type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};
