import { useInfiniteQuery } from "@tanstack/react-query";
import {  getAnime, getPopularMovies } from "../../services/apiMovie";

export function useInfinteMain(max=20,media="movie"){
    const {
        data, isSuccess,fetchNextPage,hasNextPage,isFetchingNextPage,isLoading,error,isFetching
      } = useInfiniteQuery({
        queryKey: [`featuredMovScroll`],
        queryFn:({pageParam})=>media==="tv"?getAnime(pageParam):getPopularMovies(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage,allPages,) => {
          const nextPage=lastPage.length?allPages.length+1:undefined
          if (nextPage===max) return undefined
          return nextPage 
        },
      });
      return { data,isLoading ,fetchNextPage,hasNextPage,isFetchingNextPage,error,isFetching};
}