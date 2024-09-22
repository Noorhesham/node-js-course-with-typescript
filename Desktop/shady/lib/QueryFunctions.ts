import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
export const BASE_URL = `https://platform.smart-center-system.com/api/`;
import cookies from "js-cookie";
import axios from "axios";

export const useGetCountries = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: async () =>
      await fetch(`${BASE_URL}registration-data`, {
        cache: "force-cache",
      }).then((res) => res.json()),
    queryKey: ["countries"],
  });
  return { data, isLoading, error };
};
export const useGetEntity = ({ entityName }: { entityName: string }) => {
  const { data, isLoading, error } = useQuery({
    queryFn: async () =>
      await fetch(`${BASE_URL}${entityName}`, { headers: { Authorization: `Bearer ${cookies.get("token")}` } }).then(
        (res) => res.json()
      ),
    queryKey: ["me"],
  });
  return { data, isLoading, error };
};
export const useGetCities = (governorateId: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: ["cities", governorateId],
    queryFn: async () => {
      const res = await fetch(`/api/cities?governorate_id=${governorateId}`);
      const data = await res.json();
      return data.data;
    },
  });
  return { data, isLoading };
};
//without the custome hook
// useEffect(() => {
//   if (data && data.data.totalPages > page) {
//     queryClient.prefetchQuery({
//       queryKey: [`products ${page + 1}`],
//       queryFn: async () => await axios.get(`/products?page=${page}&limit=10`),
//     });

//     if (data.data.totalPages > page + 1) {
//       queryClient.prefetchQuery({
//         queryKey: [`products ${page + 2}`],
//         queryFn: async () => await axios.get(`/products?page=${page}&limit=10`),
//       });
//     }
//   }
// }, [data, page, queryClient]);
