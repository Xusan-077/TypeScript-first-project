import { useQuery } from "@tanstack/react-query";
import { API } from "../API";
import type { ApiResponse, IUser } from "../types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("default");

  const navigate = useNavigate();

  const { data: Users } = useQuery({
    queryFn: async () => {
      const res = await API.get<ApiResponse<IUser[]>>("/users");
      return res?.data;
    },
    queryKey: ["users"],
  });

  const Searched = Users?.filter((user: IUser) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const Sorted = Searched?.sort((a: IUser, b: IUser) =>
    sort === "default"
      ? 0
      : sort === "A-Z"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return (
    <section className="">
      <div className="container">
        <div className="">
          <h2 className="text-[24px] font-bold mb-4">Users</h2>
          <div className="flex items-center  mb-6">
            <div className="border border-[#979797] rounded-lg flex items-center">
              <div className="h-12 px-5 flex items-center">
                <i className="text-[20px] bi bi-funnel-fill"></i>
              </div>
              <div
                onClick={() => setSort("default")}
                className={`flex items-center justify-center border-l cursor-pointer border-l-[#979797] h-12 px-5 ${
                  sort === "default" ? "bg-[#979797] text-white" : ""
                }`}
              >
                Default
              </div>
              <div
                onClick={() => setSort("A-Z")}
                className={`flex items-center justify-center border-l cursor-pointer border-l-[#979797] h-12 px-5 ${
                  sort === "A-Z" ? "bg-[#979797] text-white" : ""
                }`}
              >
                A-Z
              </div>
              <div
                onClick={() => setSort("Z-A")}
                className={`flex items-center justify-center border-l cursor-pointer border-l-[#979797] rounded-r-lg h-12 px-5 ${
                  sort === "Z-A" ? "bg-[#979797] text-white" : ""
                }`}
              >
                Z-A
              </div>
            </div>
            <div className="flex gap-5 h-10 items-center border rounded-lg border-[#979797] rounded-r-lg px-5 ml-auto">
              <i className="text-[#979797] bi bi-search"></i>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="placeholder:text-[#979797] text-[#979797] outline-none"
                placeholder="search"
              />
            </div>
          </div>

          <ul className="grid grid-cols-4 gap-6">
            {search && Sorted?.length === 0 && (
              <p className="text-center col-span-4 text-[40px] text-red-500 mt-50">
                No users found.
              </p>
            )}
            {Sorted?.map((user: IUser) => (
              <li key={user.id} className="">
                <div className="bg-gray-200 flex items-center justify-center w-full h-50 mb-3">
                  <i className="text-[150px] text-gray-300 bi bi-person"></i>
                </div>
                <div className="flex items-center flex-col text-center">
                  <h3 className="text-[16px] font-bold">{user.name}</h3>
                  <span className="text-[14px] text-[#202224] mb-5">
                    {user.email}
                  </span>
                  <button
                    onClick={() => navigate(`/user/${user.id}`)}
                    className="border-[#979797] rounded-lg border p-[5px_25px] cursor-pointer text-[#979797]"
                  >
                    View Profile
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
