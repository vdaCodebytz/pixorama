import { INewUser, INewUserDB } from "@/types";
import {
  ID,
  Query,
  account,
  appwriteConfig,
  avatars,
  databases,
} from "./config";

export const createNewAcc = async (user: INewUser) => {
  try {
    const newAcc = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAcc) throw new Error("Account not created");

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      name: newAcc.name,
      username: user.username,
      email: newAcc.email,
      accountId: newAcc.$id,
      imageUrl: avatarUrl,
    });

    if (newUser.status === "error") throw new Error(newUser.message);

    return newUser;
  } catch (error) {
    return { status: "error", message: error };
  }
};

export const saveUserToDB = async (user: INewUserDB) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    return { status: "error", message: error };
  }
};

export const signIn = async (user: { email: string; password: string }) => {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();

    if (!user) throw new Error("User not found");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", user.$id)]
    );

    if (currentUser.total === 0) throw new Error("User not found");

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    console.log(session);

    return session;
  } catch (error) {
    console.log(error);
  }
};
