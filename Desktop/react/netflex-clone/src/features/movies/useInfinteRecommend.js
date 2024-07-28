import { useInfiniteQuery } from "@tanstack/react-query";
import {   getRecommendations, getRecommendationsTv } from "../../services/apiMovie";

export function useInfinteRecommend(id,media){
    const {
        data, isSuccess,fetchNextPage,hasNextPage,isFetchingNextPage,isLoading,error,
      } = useInfiniteQuery({
        queryKey: [`movie`,id],
        queryFn:({pageParam})=>media==="tv"?getRecommendationsTv({pageParam,id}):getRecommendations({pageParam,id}),
        initialPageParam: 1,
        getNextPageParam: (lastPage,allPages,) => {
          const nextPage=lastPage.length?allPages.length+1:undefined
          if (nextPage===20) return undefined
          return nextPage 
        },
      });
      return { data,isLoading ,fetchNextPage,hasNextPage,isFetchingNextPage,error};
}