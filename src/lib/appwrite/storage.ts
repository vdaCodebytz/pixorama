import { ID, appwriteConfig, storage } from "./config";

export const uploadImage = async (file: File) => {
  try {
    const response = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    const imgUrl = await storage.getFileView(
      // Can create a seperate fn for this
      appwriteConfig.storageId,
      response.$id
    );

    if (!imgUrl) {
      await deleteImage(response.$id);
      throw new Error("There was an error retrieving the image");
    }

    return { ...response, imgUrl };
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (fileId: string) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
  } catch (error) {
    console.log(error);
  }
};

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}
