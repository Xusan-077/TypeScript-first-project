import { useQuery } from "@tanstack/react-query";
import { API } from "../API";
import type { IUser } from "../types/user";
import { useState } from "react";
import UserItem from "../components/UserItem";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("default");
  const [open, setOpen] = useState<boolean>(false);

  const {
    data: Users,
    isLoading: UserIsLoading,
    error: UserError,
  } = useQuery({
    queryFn: async () => {
      const res = await API.get<IUser[]>("/users");
      return res?.data;
    },
    queryKey: ["users"],
  });

  console.log(Users);

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
      <div className="">
        <h2 className="text-[24px] font-bold mb-4">Users</h2>
        <div className="flex items-center mb-6 gap-10 max-[650px]:block">
          <div className="max-[425px]:hidden border border-[#979797] rounded-lg flex max-[650px]:grid max-[650px]:grid-cols-[60px_1fr_1fr_1fr] items-center">
            <div className="h-12 px-5 flex items-center">
              <i className="text-[20px] bi bi-funnel-fill"></i>
            </div>
            <div
              onClick={() => {
                setSort("default");
              }}
              className={`flex items-center justify-center border-l cursor-pointer border-l-[#979797] h-12 px-5 ${
                sort === "default" ? "bg-[#979797] text-white" : ""
              }`}
            >
              Default
            </div>
            <div
              onClick={() => {
                setSort("A-Z");
              }}
              className={`flex items-center justify-center border-l cursor-pointer border-l-[#979797] h-12 px-5 ${
                sort === "A-Z" ? "bg-[#979797] text-white" : ""
              }`}
            >
              A-Z
            </div>
            <div
              onClick={() => {
                setSort("Z-A");
              }}
              className={`flex items-center justify-center border-l cursor-pointer border-l-[#979797] rounded-r-lg h-12 px-5 ${
                sort === "Z-A" ? "bg-[#979797] text-white" : ""
              }`}
            >
              Z-A
            </div>
          </div>
          <div className="hidden relative max-[425px]:block">
            <div className="h-12 flex items-center border border-gray-300 rounded-2xl justify-between px-5">
              <i className="text-[20px] bi bi-funnel-fill"></i>

              <div className="">{sort}</div>

              <button onClick={() => (open ? setOpen(false) : setOpen(true))}>
                {open ? (
                  <i className="bi bi-caret-up-fill"></i>
                ) : (
                  <i className="bi bi-caret-down-fill"></i>
                )}
              </button>
            </div>
            {open ? (
              <div className="absolute top-12 z-10 left-0 w-full bg-white shadow-lg rounded-lg">
                <div
                  onClick={() => {
                    setSort("default");
                    setOpen(false);
                  }}
                  className={`flex rounded-t-lg items-center justify-center border-l cursor-pointer border-l-[#979797] h-12 px-5 ${
                    sort === "default" ? "bg-[#979797] text-white" : ""
                  }`}
                >
                  Default
                </div>
                <div
                  onClick={() => {
                    setSort("A-Z");
                    setOpen(false);
                  }}
                  className={`flex items-center justify-center border-l cursor-pointer border-l-[#979797] h-12 px-5 ${
                    sort === "A-Z" ? "bg-[#979797] text-white" : ""
                  }`}
                >
                  A-Z
                </div>
                <div
                  onClick={() => {
                    setSort("Z-A");
                    setOpen(false);
                  }}
                  className={`flex items-center justify-center rounded-b-lg border-l cursor-pointer border-l-[#979797] rounded-r-lg h-12 px-5 ${
                    sort === "Z-A" ? "bg-[#979797] text-white" : ""
                  }`}
                >
                  Z-A
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex gap-5 h-10 w-full max-[650px]:max-w-full max-[650px]:mt-2 max-w-62.5 items-center border rounded-lg border-[#979797] rounded-r-lg px-5 ml-auto">
            <i className="text-[#979797] bi bi-search"></i>
            <input
              onChange={(e) => setSearch(e.target.value.trim())}
              type="text"
              className="placeholder:text-[#979797] w-full text-[#979797] outline-none"
              placeholder="search"
            />
          </div>
        </div>

        {UserError ? (
          <p className="text-center col-span-4 text-[40px] text-red-500 mt-50">
            Users not found
          </p>
        ) : (
          <ul className="grid grid-cols-4 gap-6 max-[960px]:grid-cols-3 max-[425px]:grid-cols-1 max-[768px]:grid-cols-2">
            {search && Sorted?.length === 0 && (
              <p className="text-center col-span-4 text-[40px] text-red-500 mt-50">
                No users found.
              </p>
            )}
            {UserIsLoading &&
              Array.from({ length: 10 }).map((_, index) => (
                <li key={index} className="bg-white p-[0_0_16px_0] rounded-2xl">
                  <div className="bg-gray-200 rounded-t-2xl flex items-center justify-center w-full h-50 mb-3">
                    <i className="text-[150px] text-gray-300 bi bi-person"></i>
                  </div>
                  <div className="flex items-center flex-col text-center">
                    <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-5"></div>
                    <button className="border-[#979797] rounded-lg border p-[5px_25px] cursor-pointer text-[#979797]">
                      View Profile
                    </button>
                  </div>
                </li>
              ))}
            {Sorted?.map((user: IUser) => (
              <UserItem key={user.id} {...user} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
