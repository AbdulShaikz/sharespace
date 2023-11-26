import { useDispatch, useSelector } from "react-redux";
import { Container, EmailVerificationNotice, PostCard, Spinner } from "../components/index.js";
import { useEffect, useState } from "react";
import appwriteStorage from "../appwrite/appwriteStorage.js";
import useEmailVerification from "../hooks/useEmailVerification.js";
import { setVerificationStatus } from "../store/emailVerificationSlice";

function Home() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { verificationStatus, sendVerificationEmail } = useEmailVerification();

  useEffect(() => {
    if (authStatus) {
      if(userData && userData.emailVerification === true) dispatch(setVerificationStatus(true))
      appwriteStorage.getAllPosts().then((post) => {
        if (post) setPosts(post.documents);
        setLoading(false); 
      });
    }else{
      setLoading(false);
    }
  }, [authStatus, userData, dispatch]);

  if(loading){
    return <Spinner/>
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              {authStatus ? (
                <h1 className="text-2xl text-white font-bold hover:text-[#4E4FEB]">
                  No posts created
                </h1>
              ) : (
                <h1 className="text-2xl text-white font-bold hover:text-[#4E4FEB]">
                  Login to read posts
                </h1>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">

        {!verificationStatus && <EmailVerificationNotice onSendVerification={sendVerificationEmail} />}
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/4 flex-wrap">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
export default Home;
