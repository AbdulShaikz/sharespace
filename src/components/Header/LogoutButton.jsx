import { useDispatch } from "react-redux";
import appwriteAuthService from "../../appwrite/appwriteAuth.js";
import {authSliceLogout} from "../../store/authSlice.js";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    appwriteAuthService
      .logout()
      .then(() => {
        dispatch(authSliceLogout());
        navigate('/login');
      })
      .catch((err) => console.log("logout Handler :: ", err));
  };

  return (
    <button
      className="inline-bock px-6 py-2 duration-300 hover:bg-red-800 rounded-3xl hover:text-white"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}
export default LogoutButton;
