import { databases, ID } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";

export const useSaved = () => {
  const savePost = async ({ userId, caption, hashtags, mood, style }) => {
    try {
      const createdAt = new Date().toISOString();

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_SAVED,
        ID.unique(),
        {
          userId,
          caption,
          hashtags,
          mood,
          style,
          createdAt,
        }
      );

      return { success: true };
    } catch (err) {
      console.error("❌ Failed to save post:", err.message);
      return { success: false, error: err.message };
    }
  };

  const fetchSavedPosts = async (userId) => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_SAVED,
        [Query.equal("userId", userId), Query.orderDesc("createdAt")]
      );

      return response.documents;
    } catch (err) {
      console.error("❌ Failed to fetch saved posts:", err.message);
      return [];
    }
  };
  const deletePost = async (postId) => {
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_SAVED,
        postId
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return { savePost, fetchSavedPosts, deletePost };
};
