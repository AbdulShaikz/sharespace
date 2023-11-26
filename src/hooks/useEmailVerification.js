import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setVerificationStatus,
  setCooldown,
  setError,
  decrementCooldown,
} from "../store/emailVerificationSlice";
import appwriteAuthService from "../appwrite/appwriteAuth";

function useEmailVerification() {
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const intervalRef = useRef(null);

  // const verificationStatus = useSelector((state) => state.emailVerification.verificationStatus);
  const cooldown = useSelector((state) => state.emailVerification.cooldown);
  const error = useSelector((state) => state.emailVerification.error);

  const userData = useCallback(async () => await appwriteAuthService.getCurrentUser(), []);

  const sendVerificationEmail = async () => {
    try {
      if (cooldown > 0) {
        dispatch(setError(`Please wait ${cooldown} seconds before sending the email again.`));
        return;
      }

      await appwriteAuthService.sendVerificationEmail('http://localhost:5173/verify-email');

      const newCooldown = 58; // Set the initial cooldown value
      dispatch(setCooldown(newCooldown));

      const interval = setInterval(() => {
        dispatch(decrementCooldown());
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        dispatch(setCooldown(0));
      }, newCooldown * 1000);

    } catch (error) {
      console.error("Error sending verification email:", error);
      dispatch(setError("Error sending verification email. Please try again."));
    }
  };

  const fetchData = async () => {
    try {
      const currentUserData = await userData();
      
      // Check if currentUserData is available and has the expected properties
      if (currentUserData && currentUserData.emailVerification === true) {
        setIsVerified(true);
        dispatch(setVerificationStatus(true));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const fetchDataAndCheckVerification = async () => {
      fetchData(); // Fetch data immediately

      intervalRef.current = setInterval(() => {
        dispatch(decrementCooldown());
      }, 1000);

      setTimeout(() => {
        clearInterval(intervalRef.current);
        dispatch(setCooldown(0));

        // Only fetch data again if not already verified
        if (!isVerified) {
          fetchData();
        }
      }, cooldown * 1000);
    };

    fetchDataAndCheckVerification();

    return () => {
      // Clear any remaining intervals if the component unmounts
      clearInterval(intervalRef.current);
    };
  }, [dispatch, userData, cooldown, isVerified]);


  return {  verificationStatus: isVerified, cooldown, error, sendVerificationEmail };
}

export default useEmailVerification;