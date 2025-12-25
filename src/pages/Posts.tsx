import { useQuery } from "@tanstack/react-query";
import { API } from "../API";

export default function Posts() {
  const { data: posts } = useQuery({
    queryFn: async () => {
      const res = await API.get("/posts");

      return res?.data;
    },
    queryKey: ["posts"],
  });

  console.log(posts);

  return <div>Posts</div>;
}
