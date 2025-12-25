import { useNavigate } from "react-router-dom";
import type { IUser } from "../types/user";

export default function UserItem(user: IUser) {
  const navigate = useNavigate();

  return (
    <li key={user.id} className="bg-white p-[0_0_16px_0] rounded-2xl">
      <div className="bg-gray-200 rounded-t-2xl flex items-center justify-center w-full h-50 mb-3">
        <i className="text-[150px] text-gray-300 bi bi-person"></i>
      </div>
      <div className="flex items-center flex-col text-center">
        <h3 className="text-[16px] font-bold">{user.name}</h3>
        <span className="text-[14px] text-[#202224] mb-5">{user.email}</span>
        <button
          onClick={() => navigate(`/user/${user.id}`)}
          className="border-[#979797] rounded-lg border p-[5px_25px] cursor-pointer text-[#979797]"
        >
          View Profile
        </button>
      </div>
    </li>
  );
}
