import { useQuery } from "@tanstack/react-query";
import type { ApiResponse, IUser } from "../types/user";
import { useParams } from "react-router-dom";
import { API } from "../API";

export default function UserDetail() {
  const { userId } = useParams();

  const { data: user } = useQuery({
    queryFn: async () => {
      const res = await API.get<ApiResponse<IUser>>(`/users/${userId}`);
      return res?.data;
    },
    queryKey: ["user", userId],
  });

  console.log(user);

  return (
    <section className="">
      <div className="container">
        <div className=""></div>
      </div>
    </section>
  );
}
