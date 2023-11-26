import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import appwriteAuthService from "../appwrite/appwriteAuth.js";
import { authSliceLogin } from "../store/authSlice.js";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit} = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");

    try {
      const session = await appwriteAuthService.login(data);
      if (session) {
        const userData = await appwriteAuthService.getCurrentUser();
        if (userData) dispatch(authSliceLogin(userData));
        navigate("/");
      }
    } catch (error) {
      console.log("Error in Login component: ", error);
      setError(error.message);
    }
  };

  const handleGoogleSignIn = () => {
    appwriteAuthService.siginWithGoogle('google', 'http://localhost:5173/google-auth-callback', 'http://localhost:5173/google-auth-callback')
      .then(() => {
        // After successful Google Sign-In, redirecting the user to the desired page
        navigate('/');
      })
      .catch(error => {
        console.error('Error during Google Sign-In:', error);
      });
  };

  return (
    <section className="flex justify-center py-8 ">
      <div className="grid grid-cols-1 w-3/4 sm:w-1/2 rounded-lg shadow-lg shadow-white bg-black">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Sign in
            </h2>
            <p className="mt-2 text-base text-gray-400">
              Dont&apos; have an account?{" "}
              <Link
                to="/signup"
                title=""
                className="font-medium text-[#00cee6] transition-all duration-200 hover:underline hover:text-white"
              >
                Create a free account
              </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            
            <form className="mt-8" onSubmit={handleSubmit(login)}>
              <div className="space-y-5">
                <Input
                  label={"Email address"}
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                />
                <Input
                  label={"Password"}
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: {
                      value: true,
                    },
                  })}
                />
                
                <Link
                  to="/forgot-password"
                  title=""
                  className="text-sm font-semibold text-[#3f7cb3] transition-all duration-200 hover:underline hover:text-white"
                >
                  Forgot password?{" "}
                </Link>
                <Button
                  type="submit"
                  bgColor="bg-black"
                  className="inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-black px-3.5 py-2.5 font-semibold leading-8 text-white hover:bg-white hover:text-black duration-300"
                >
                  Let&apos;s go &rarr;
                </Button>
              </div>
            </form>
            <div className="inline-flex items-center justify-center w-full mt-3">
              <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                or
              </span>
            </div>
            <div className="mt-3 space-y-3">
              <Button
                type="button"
                bgColor="bg-black"
                onClick ={handleGoogleSignIn}
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-black px-3.5 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;
