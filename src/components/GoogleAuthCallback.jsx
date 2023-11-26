import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authSliceLogin } from "../store/authSlice";
import appwriteAuthService from "../appwrite/appwriteAuth";

function GoogleAuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const performOAuthCallback = async () => {
      try {
        const session = await appwriteAuthService.googleSession();

        if (session) {
          const userData = await appwriteAuthService.getCurrentUser();

          if (userData) {
            dispatch(authSliceLogin(userData));
          }

          navigate("/");
        } else {
          setError("Unable to complete Google OAuth authentication");
        }
      } catch (error) {
        console.error("Error in Google OAuth callback:", error);
        setError("Error in Google OAuth authentication");
      } finally {
        setLoading(false);
      }
    };

    performOAuthCallback();
  }, [dispatch, navigate]);

  return (
    <div>
      {loading ? (
        <p className="text-2xl text-gray-500 font-bold text-center m-8">
          Completing OAuth authentication...
        </p>
      ) : (
        <p
          className={`text-2xl font-bold text-center m-8 ${
            error ? "text-red-500" : "text-green-500"
          }`}
        >
          {error ? `Error: ${error}` : "Authentication completed successfully"}
        </p>
      )}
    </div>
  );
}

export default GoogleAuthCallback;