import { Link, useNavigate } from "react-router-dom";
import { Container, Logo, LogoutButton } from "../index.js";
import { useSelector } from "react-redux";
import { useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleItemClick = (slug) => {
    navigate(slug);
    setIsDrawerOpen(false);
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow-md shadow-white bg-black">
      <Container>
        <nav className="md:flex">
          <div className="md:mr-4">
            <Link to="/">
              <Logo width="80px" />
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleDrawer} className="text-white focus:outline-none">
            <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
          <ul className={`${
              isDrawerOpen ? "block" : "hidden"
            } md:flex flex-col md:flex-row ml-auto md:gap-2 justify-center md:items-center transition-all duration-300 ease-in-out`}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="md:flex md:justify-center md:items-center">
                  <button
                    onClick={() => handleItemClick(item.slug)}
                    className="inline-bock px-6 py-2 duration-300 hover:bg-[#00cee6] rounded-3xl hover:text-black hover:font-semibold"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            { authStatus && (<li className="md:flex md:justify-center md:items-center"><LogoutButton closeDrawer={() => setIsDrawerOpen(false)} /></li>)}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;