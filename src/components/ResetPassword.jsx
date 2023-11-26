import { useCallback, useEffect, useState } from "react";
import appwriteAuthService from "../appwrite/appwriteAuth";
import { Input, Button } from "../components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const { register, handleSubmit, setValue, watch, setError } = useForm();
  const [error, setErrorState] = useState("");
  const navigate = useNavigate();

  const password = watch("password", "");
  const confirm_password = watch("confirm_password", "");

  const passwordMatch = useCallback(() => {
    if (password !== confirm_password) {
      setErrorState("Passwords do not match");
    } else {
      setErrorState("");
    }
  }, [password, confirm_password]);

  useEffect(() => {
    passwordMatch();
  }, [passwordMatch]);

  const resetPassword = async (data) => {
    setError("");
    setErrorState(""); // Clear error message before proceeding

    try {
      // console.log("Im in try");
      const urlParams = new URLSearchParams(window.location.search);
      const secret = urlParams.get("secret");
      const userId = urlParams.get("userId");

      // Validation logic
      if (!data.password || !data.confirm_password) {
        setError("Please fill in both password fields");
        return;
      } else if (data.password !== data.confirm_password) {
        setError("Passwords do not match");
        return;
      } else if (data.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      } else {
        await appwriteAuthService.resetPassword(
          userId,
          secret,
          data.password,
          data.password
        );
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="flex justify-center py-8">
      <div className="grid grid-cols-1 w-1/2 rounded-lg shadow-lg shadow-white bg-black">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Reset Password
            </h2>
            <form className="mt-8" onSubmit={handleSubmit(resetPassword)}>
              <div className="space-y-5">
                <Input
                  label={"New Password"}
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  onInput={(e) => {
                    setValue("password", e.target.value);
                  }}
                />
                <Input
                  label={"Confirm Password"}
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirm_password")}
                  onInput={(e) => {
                    setValue("confirm_password", e.target.value);
                  }}
                />

                {error !== "" && (
                  <p className="text-red-500 mt-8 text-center">{error}</p>
                )}

                <Button
                  type="submit"
                  bgColor="bg-black"
                  className="inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-black px-3.5 py-2.5 font-semibold leading-8 text-white hover:bg-white hover:text-black duration-300"
                >
                  Reset Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
