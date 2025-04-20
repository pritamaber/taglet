import { databases, ID } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
import { toast } from "react-hot-toast";

/**
 * Hook to handle saving, fetching, and deleting saved caption posts.
 * Supports imageUrl for previewing saved image content.
 */
export const useSaved = () => {
  /**
   * Save a post to Appwrite DB with optional image preview URL
   */
  const savePost = async ({
    userId,
    caption,
    hashtags,
    mood,
    style,
    imageUrl,
  }) => {
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
          imageUrl, // ✅ Save the compressed preview image URL
          createdAt,
        }
      );

      return { success: true };
    } catch (err) {
      console.error("❌ Failed to save post:", err.message);
      return { success: false, error: err.message };
    }
  };

  /**
   * Fetch saved posts for a specific user
   */
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

  /**
   * Delete a saved post by its ID
   */
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

  // Handle delete posts
  const handleDelete = async (id, setPosts) => {
    toast(
      (t) => (
        <span className="text-sm">
          Are you sure you want to delete?
          <button
            onClick={async () => {
              toast.dismiss(t.id); // Close the confirmation toast
              const result = await deletePost(id);
              if (result.success) {
                setPosts((prev) => prev.filter((post) => post.$id !== id));
                toast.success("✅ Deleted successfully!");
              } else {
                toast.error("❌ Failed to delete: " + result.error);
              }
            }}
            className="ml-3 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-full"
          >
            Yes, Delete
          </button>
        </span>
      ),
      {
        duration: 5000,
      }
    );
  };

  return { savePost, fetchSavedPosts, deletePost, handleDelete };
};
