import { NavLink } from "react-router-dom";

export default function LeftComponent() {
  interface INav {
    path: string;
    text: string;
  }

  const nav: INav[] = [
    {
      path: "/",
      text: "Users",
    },
  ];

  return (
    <aside className=" bg-white max-[1150px]:hidden fixed top-18.75 left-0 h-screen w-60 z-20">
      <aside className="">
        <div className="p-[24px_0]">
          <div className="p-[0_24px]">
            {nav.map((item) => (
              <NavLink
                key={item.text}
                to={item.path}
                className={({ isActive }) =>
                  `py-5 px-4 rounded-lg transition-all duration-200 flex gap-4 text-[16px] font-semibold mb-2 w-full text-center ${
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
          </div>
        </div>
      </aside>
    </aside>
  );
}
