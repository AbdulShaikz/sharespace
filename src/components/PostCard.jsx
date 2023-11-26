/* eslint-disable react/prop-types */

import appwriteStorage from "../appwrite/appwriteStorage.js";
import { Link } from "react-router-dom";

function PostCard({ $id, title, thumbnail, author, status }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-black rounded-xl p-4 h-full flex flex-col justify-center shadow-white shadow-md">
        <div className="w-full justify-center mb-4 overflow-hidden h-full border-white border-2 rounded-xl">
          <img
            src={appwriteStorage.getFilePreview(thumbnail)}
            alt={title}
            loading="lazy"
            className="rounded-xl h-full object-cover transform transition-transform hover:scale-95"
          />
        </div>
        <h2 className="text-sm text-orange-800 text-right italic">
          Published by <span>{author}</span>
        </h2>
        <h1 className="text-3xl font-semibold ">{title}</h1>
        <p className="text-green-800">
          Status:{" "}
          <span
            className={status === "active" ? "text-green-800" : "text-red-800"}
          >
            {status}
          </span>
        </p>
      </div>
    </Link>
  );
}
export default PostCard;
