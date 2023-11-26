import { useSelector } from "react-redux";
import { Container, PostForm } from "../components";
import { Link } from "react-router-dom";
import useEmailVerification from "../hooks/useEmailVerification";

function AddPost() {
  const { verificationStatus } = useSelector(
    (state) => state.emailVerification
  );
  const { sendVerificationEmail } = useEmailVerification();
  return (
    <div className="py-8">
      <Container>
        {verificationStatus && <PostForm />}
        {!verificationStatus && (
          <div className="flex justify-center p-2 w-full">
            <h1 className="text-2xl text-red-500 font-bold hover:text-red-800">
              <strong className="font-bold">Verify your email! </strong>
              <span className="block sm:inline">
                to post on this website. Click{" "}
                <button onClick={sendVerificationEmail}>
                  <Link to="/check-email" className="text-blue-500 underline">
                    here
                  </Link>{" "}
                </button>{" "}
                to initiate the email verification process.
              </span>
            </h1>
          </div>
        )}
      </Container>
    </div>
  );
}
export default AddPost;