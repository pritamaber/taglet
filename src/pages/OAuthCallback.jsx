import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useGoogleAuth from "../hooks/useGoogleAuth";

export default function AuthCallback() {
  const { handleOAuthRedirect } = useGoogleAuth();
  const location = useLocation();
  const hasHandledRedirect = useRef(false); // ✅ persist across renders

  useEffect(() => {
    if (!hasHandledRedirect.current) {
      handleOAuthRedirect();
      hasHandledRedirect.current = true;
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center text-purple-700 text-lg font-semibold">
      ✨ Finalizing login...
    </div>
  );
}
