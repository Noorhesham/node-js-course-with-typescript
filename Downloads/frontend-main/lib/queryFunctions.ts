import { BASE_URL } from "@/app/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import cookie from "js-cookie";
export const useGetUser = async () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}Patient/${cookie.get("id")}`, {
        headers: { Authorization: `Bearer ${cookie.get("token")}` },
      });
      console.log(res.data);
      return res.data;
    },
  });
  return { data, isLoading };
};
