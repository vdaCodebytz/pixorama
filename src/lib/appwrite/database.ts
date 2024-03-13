import { INewPost, IUpdatePost, IUpdateUser } from "@/types";
import { ID, Query, appwriteConfig, databases } from "./config";
import { deleteImage, getFilePreview, uploadImage } from "./storage";

export const createPost = async (post: INewPost) => {
  try {
    const tagsArr = post.tags?.replace(/ /g, "").split(",") || [];
    const newImg = await uploadImage(post.file[0]);

    if (!newImg) throw new Error("Image not uploaded.Please try again");

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageId: newImg.$id,
        imageUrl: newImg.imgUrl,
        location: post.location,
        tags: tagsArr,
      }
    );

    if (!newPost) {
      await deleteImage(newImg.$id);
      throw new Error("Post not created.Please try again");
    }
    return newPost;
  } catch (error) {
    console.log(error);
  }
};

export const getRecentPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw new Error("Posts not found");
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async ({
  postId,
  likesArray,
}: {
  postId: string;
  likesArray: string[];
}) => {
  try {
    const likedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );
    if (!likedPost) throw new Error("Post not updated.Please try again");
    return likedPost;
  } catch (error) {
    console.log(error);
  }
};

export const savePost = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  try {
    const savedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        post: postId,
        user: userId,
      }
    );

    if (!savedPost) throw new Error("Post not saved.Please try again");

    return savedPost;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSavedPost = async (postId: string) => {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      postId
    );
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (postId: string) => {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );
    if (!post) throw new Error("Post not found");
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (post: IUpdatePost) => {
  const hasUpdatedFile = post.file.length > 1;

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasUpdatedFile) {
      const newImg = await uploadImage(post.file[0]);
      if (!newImg) throw new Error("Image not uploaded.Please try again");

      image = { ...image, imageUrl: newImg.imgUrl, imageId: newImg.$id };
    }

    const tagsArr = post.tags?.replace(/ /g, "").split(",") || [];

    const updatePost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageId: image.imageId,
        imageUrl: image.imageUrl,
        location: post.location,
        tags: tagsArr,
      }
    );

    if (!updatePost) {
      await deleteImage(image.imageId);
      throw new Error("Post not created.Please try again");
    }
    return updatePost;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId: string, imageId: string) => {
  if (!postId || !imageId) throw new Error("Both fields are required");
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );

    await deleteImage(imageId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};

export async function searchPosts(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers(limit?: number) {
  const queries: any[] = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      queries
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(user: IUpdateUser) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadImage(user.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteImage(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    //  Update user
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    // Failed to update
    if (!updatedUser) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteImage(image.imageId);
      }
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (user.imageId && hasFileToUpdate) {
      await deleteImage(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}
