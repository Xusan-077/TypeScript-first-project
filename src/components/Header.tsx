import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-gray-300 bg-white max-[1150px]:w-full max-[1150px]:top-0 max-[1150px]:left-0 fixed top-0 shadow-bottom left-0 w-full z-110">
      <div className="flex items-center justify-between px-10 h-20">
        <Link className="text-[30px] font-semibold" to="/">
          Logo
        </Link>
      </div>
    </header>
  );
}
