import { useInfiniteQuery,  } from "@tanstack/react-query";
import {   getMoviesByCompany} from "../../services/apiMovie";

export function useMoviesByCompany(id){
    const {
        data:moviesByCompany,fetchNextPage,hasNextPage,isFetchingNextPage,isLoading,error,
      } = useInfiniteQuery({
        queryKey: [`movie`,id],
        queryFn:({pageParam})=>getMoviesByCompany({pageParam,id}),
        initialPageParam: 1,
        getNextPageParam: (lastPage,allPages,) => {
        const nextPage=lastPage.length?allPages.length+1:undefined
        if (nextPage===20) return undefined
        return nextPage 
        },
      });
      return { moviesByCompany,isLoading ,fetchNextPage,hasNextPage,isFetchingNextPage,error};
}