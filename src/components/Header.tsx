import { Link, NavLink } from "react-router-dom";
import { NavLinks } from "../App";

export default function Header() {
  return (
    <header className="border-gray-300 bg-white  max-[425px]:p-5 max-[425px]:h-30 max-[1150px]:w-full max-[1150px]:top-0 max-[1150px]:left-0 fixed top-0 shadow-bottom left-0 w-full z-110">
      <div className="flex items-center max-[425px]:block  justify-between  max-[425px]:p-0 px-10 h-20">
        <Link className="text-[30px] font-semibold" to="/">
          Logo
        </Link>

        <nav className="hidden max-[1150px]:flex items-center">
          {NavLinks.map((item) => (
            <NavLink
              key={item.text}
              to={item.path}
              className={({ isActive }) =>
                `p-[10px_25px] rounded-lg transition-all  max-[425px]:w-full duration-200 flex gap-4 text-[16px] font-semibold w-full text-center ${
                  isActive
                    ? "bg-[#487fffc7] text-white"
                    : "bg-white text-[#202224] hover:bg-[#487fffc7] hover:text-white"
                }`
              }
            >
              <i className="bi bi-people-fill"></i>
              <span>{item.text}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
