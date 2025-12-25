import { Link, NavLink } from "react-router-dom";

interface INav {
  path: string;
  text: string;
}

const nav: INav[] = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/about",
    text: "About",
  },
  {
    path: "/contact",
    text: "Contact",
  },
];

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="flex items-center justify-between py-5 border-b border-b-[#E0E0E0] mb-5">
          <Link className="text-[30px] font-semibold" to="/">
            Logo
          </Link>

          <nav className="flex items-center">
            {nav.map((el: INav, index) => (
              <NavLink
                to={el.path}
                key={index}
                className={({ isActive }) =>
                  `block p-[10px_20px] text-[#009] hover:underline transition-all duration-300 text-[18px] ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                {el.text}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
