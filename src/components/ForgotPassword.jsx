import { useState } from "react";
import appwriteAuthService from "../appwrite/appwriteAuth";
import { Input, Button } from "../components";
import { useForm } from "react-hook-form";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const resetPassword = async (data) => {
    setMessage("");
    try {
      const emailSent = await appwriteAuthService.resetPasswordLink(
        data.email,
        "http://localhost:5173/reset-password"
      );
      if (emailSent) {
        setMessage("Password Reset link has been sent to your email!");
      } else {
        setError("email", {
          type: "manual",
          message: "Failed to send reset instructions. Please try again later.",
        });
      }
    } catch (error) {
      // setMessage(error.message);
      setError("email", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <section className="flex justify-center py-8">
      <div className="grid grid-cols-1 w-1/2 rounded-lg shadow-lg shadow-white bg-black">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Find Your Account
            </h2>

            {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}
            <form className="mt-8" onSubmit={handleSubmit(resetPassword)}>
              <div className="space-y-5">
                <Input
                  label={"Email address"}
                  type="email"
                  placeholder="Email Address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Email address must be a valid address",
                    },
                  })}
                />

                <Button
                  type="submit"
                  bgColor="bg-black"
                  className="inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-black px-3.5 py-2.5 font-semibold leading-8 text-white hover:bg-white hover:text-black duration-300"
                >
                  Reset
                </Button>
                {errors.email && (
                  <p className="text-red-500 mt-2 text-center">
                    {errors.email.message}
                  </p>
                )}
                {message && (
                  <p
                    className={`mt-8 text-center ${
                      message.includes("sent")
                        ? "text-green-500"
                        : "text-red-800"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;