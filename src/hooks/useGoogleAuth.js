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
      // Redirects to Google login page
      await account.createOAuth2Session(
        "google",
        `${window.location.origin}/auth-callback`, // Success redirect
        `${window.location.origin}/login` // Failure redirect
      );
    } catch (err) {
      console.error("Google OAuth error:", err);
      toast.error("Google login failed");
    }
  };

  // Called on /auth-callback route after OAuth login
  const handleOAuthRedirect = async () => {
    try {
      const sessionUser = await account.get();

      // Check if user already exists in DB
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
        [Query.equal("email", sessionUser.email)]
      );

      if (res.documents.length === 0) {
        // ✅ First-time user → create user doc
        await databases.createDocument(
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
      }

      // ✅ Set user context
      setUser(res.documents[0] || sessionUser);
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
