import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteStorage from "../appwrite/appwriteStorage";
import { Container, PostForm, Spinner } from "../components";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (slug) {
          await appwriteStorage.getPost(slug).then((post) => {
            if (post) setPost(post);
          });
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug, navigate]);
  return loading ? (
    <Spinner />
  ) : post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}
export default EditPost;
