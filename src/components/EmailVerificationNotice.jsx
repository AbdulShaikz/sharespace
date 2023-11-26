/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./index";

import { setVerificationStatus } from "../store/emailVerificationSlice";
import useEmailVerification from "../hooks/useEmailVerification.js";

function EmailVerificationNotice({ onSendVerification }) {
  const dispatch = useDispatch();
  const { verificationStatus, cooldown, error } = useEmailVerification();

  useEffect(() => {
    if (verificationStatus) {
      const timeout = setTimeout(() => {
        dispatch(setVerificationStatus(false));
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [verificationStatus, dispatch]);

  return (
    <div className="p-2 w-full">
      <div
        className={`bg-${verificationStatus ? "green" : "red"}-100 border text-center border-${verificationStatus ? "green" : "red"}-400 w-full text-${verificationStatus ? "green" : "red"}-700 px-4 py-2 rounded relative`}
        role="alert"
      >
        <strong className="font-bold">
          {verificationStatus ? "Email Verified! " : "Verify Your Email! "}
        </strong>
        <span className="block sm:inline">
          {verificationStatus
            ? "You can now post on this website. Welcome!"
            : error
            ? `Error: ${error}`
            : cooldown > 0
            ? `Please wait ${cooldown} seconds before sending the email again.`
            : "You can post on this website only when you verify your email. Click "}
          {!verificationStatus && !error && (
            <Button onClick={onSendVerification} bgColor="bg-blue-500" disabled={cooldown > 0}>
              {cooldown > 0 ? `Resend Email (${cooldown}s)` : "Verify Email"}
            </Button>
          )}
        </span>
      </div>
    </div>
  );
}

export default EmailVerificationNotice;