import { Link, useNavigate } from "react-router-dom";
import { Container, Logo, LogoutButton } from "../index.js";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
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
          <ul className="flex ml-auto md:gap-2 justify-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="flex justify-center items-center">
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-300 hover:bg-[#00cee6] rounded-3xl hover:text-black hover:font-semibold"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            { authStatus && (<li className="flex justify-center items-center"><LogoutButton/></li>)}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;