import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import appwriteStorage from "../appwrite/appwriteStorage";
import { Button, Container, Spinner } from "../components";
import parse from "html-react-parser";

function Post() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData || !userData.$id) {
          navigate("/login");
          return;
        }
        if (slug) {
          await appwriteStorage.getPost(slug).then((post) => {
            if (post) setPost(post);
            else navigate("/");
          });
        } else {
          navigate("/");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, navigate, userData]);

  const deletePost = async () => {
    try {
      await appwriteStorage.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteStorage.deleteFile(post.thumbnail);
          navigate("/");
        }
      });
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return post ? (
    <div className="py-8">
      <Container className="flex flex-col justify-center items-center">
        <div className="w-full md:w-1/2 flex justify-center mb-4 relative border rounded-xl p-2 h-1/2">
          <img
            src={appwriteStorage.getFilePreview(post.thumbnail)}
            alt={post.title}
            className="rounded-xl h-full object-cover"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-center">{post.title}</h1>
        </div>
        <div className="w-full leading-8">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
export default Post;