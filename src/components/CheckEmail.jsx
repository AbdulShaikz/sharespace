import { Link } from "react-router-dom";

function CheckEmail() {
  return (
    <div className="py-8 text-center flex flex-col h-full w-full justify-center">
      <p className="text-lg text-white">
        A verification email has been sent. Please check your inbox and follow
        the instructions to complete the registration.
      </p>
      <Link to="/" className="text-blue-500 underline mt-4 inline-block">
        Back to Home
      </Link>
    </div>
  );
}

export default CheckEmail;
