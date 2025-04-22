// ✅ useGoogleAuth.js
import { account, databases, ID } from "../appwrite/appwriteConfig";
import { useAuth } from "../context/AuthContext";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function useGoogleAuth() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      // Redirect to Google login
      await account.createOAuth2Session(
        "google",
        `${window.location.origin}/auth-callback`, // Success
        `${window.location.origin}/login` // Failure
      );
    } catch (err) {
      console.error("Google OAuth error:", err);
      toast.error("Google login failed");
    }
  };

  const handleOAuthRedirect = async () => {
    try {
      const sessionUser = await account.get();

      // Step 1: Check if user already exists
      const existingUsers = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
        [Query.equal("email", sessionUser.email)]
      );

      let userDoc;

      if (existingUsers.documents.length > 0) {
        userDoc = existingUsers.documents[0]; // ✅ Use first match
      } else {
        // Step 2: Create new user document
        const created = await databases.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
          ID.unique(),
          {
            name: sessionUser.name,
            email: sessionUser.email,
            avatarUrl: sessionUser.prefs?.avatar?.startsWith("http")
              ? sessionUser.prefs.avatar
              : "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(sessionUser.name),
            credits: 5,
            plan: "free",
            hasClaimedFreeTrial: true,
          }
        );

        userDoc = created;
      }

      // ✅ Set user in context
      setUser(userDoc);
      toast.success("Logged in successfully with Google");
      navigate("/create");
    } catch (err) {
      console.error("OAuth Callback Error:", err);
      toast.error("OAuth callback failed");
    }
  };

  return {
    loginWithGoogle,
    handleOAuthRedirect,
  };
}
