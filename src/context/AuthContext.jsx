import { createContext, useContext, useEffect, useState } from "react";
import { account, databases } from "../appwrite/appwriteConfig";
import { Query } from "appwrite"; // ✅ Add this line

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      // ✅ First try getting session user
      const sessionUser = await account.get();
      // user = await account.get();

      // ✅ Now fetch custom profile by email
      const result = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
        [Query.equal("email", sessionUser.email)]
      );

      setUser(result.documents[0]);
    } catch (err) {
      console.warn("❌ Failed to fetch user profile", err.message);
      setUser(null); // ✅ Reset user to null if not authenticated
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
