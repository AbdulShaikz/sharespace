import { Link } from "react-router-dom";
import appwriteAuthService from "../appwrite/appwriteAuth.js";
import { useEffect, useState } from "react";

function VerifyEmail() {

  const [verifyStatus, setVerifyStatus] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const secret = urlParams.get("secret");
        const userId = urlParams.get("userId");

    const verify = async () => {
      await appwriteAuthService.confirmVerification(userId, secret)
        .then(() => setVerifyStatus(true))
        .catch(()=>setVerifyStatus(false))
    }
    if(userId)
      verify();
    } catch (error) {
        setError(error.message);
        setVerifyStatus(false);
    }
  },[]);
  return (
    <div className="flex justify-center items-center h-full text-xl p-8">
      {verifyStatus ? (
        <div className="text-green-500">
          Email verified! <Link to="/login" className="underline">Login now.</Link>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full text-xl p-8 text-red-500">
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <p>Failed to verify email. Please try again!</p>
          )}
        </div>
      )}
    </div>
  );
}
export default VerifyEmail;
