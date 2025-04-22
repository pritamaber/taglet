import { useEffect } from "react";
import useGoogleAuth from "../hooks/useGoogleAuth";

export default function OAuthCallback() {
  const { handleOAuthRedirect } = useGoogleAuth();

  useEffect(() => {
    handleOAuthRedirect();
  }, []);

  return <p className="text-center mt-20">Authenticating...</p>;
}
