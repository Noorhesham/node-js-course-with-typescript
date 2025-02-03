import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const usePrefetchPages = ({
  data,
  page,
  baseUrl,
  limit = 10,key
}: {
  data: any;
  page: number;
  baseUrl: string;
  limit?: number;key:string
}) => {
  const queryClient = useQueryClient();
  const axios=useAxiosPrivate()
  useEffect(() => {
    if (data && data.data.totalPages > page) {
      // Prefetch the next page
      queryClient.prefetchQuery({
        queryKey: [`${key}${page+1}`],
        queryFn: async () => await axios.get(`/${baseUrl}?page=${page + 1}&limit=${limit}`),
      });

      // Prefetch the page after next if it exists
      if (data.data.totalPages > page + 1) {
        queryClient.prefetchQuery({
          queryKey: [`${key}${page+2}`],
          queryFn: async () => await axios.get(`/${baseUrl}?page=${page + 2}&limit=${limit}`),
        });
      }
    }
  }, [ page, data, queryClient ]);
};

export default usePrefetchPages;
