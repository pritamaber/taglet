// /src/hooks/useRegister.js
import { ID, storage, account, databases } from "../appwrite/appwriteConfig";
import { useState } from "react";

export default function useRegister() {
  const [loading, setLoading] = useState(false);

  const registerUser = async ({ name, email, password, avatar }) => {
    setLoading(true);

    try {
      // 1. Upload avatar to Appwrite bucket
      const avatarUpload = await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID_AVATARS,
        ID.unique(),
        avatar
      );
      const avatarUrl = `https://cloud.appwrite.io/v1/storage/buckets/${
        import.meta.env.VITE_APPWRITE_BUCKET_ID_AVATARS
      }/files/${avatarUpload.$id}/preview?project=${
        import.meta.env.VITE_APPWRITE_PROJECT_ID
      }`;

      // 2. Create user account in Appwrite auth
      await account.create(ID.unique(), email, password, name);

      // 3. Store user in custom users collection
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
        ID.unique(),
        {
          name,
          email,
          avatarUrl,
          credits: 10, // Future payment support
        }
      );

      return { success: true };
    } catch (err) {
      console.error("❌ Registration failed:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading };
}
