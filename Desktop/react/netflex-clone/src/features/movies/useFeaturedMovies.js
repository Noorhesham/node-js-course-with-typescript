import {  useQuery } from "@tanstack/react-query";
import { getFeaturedMovies as getFeaturedMoviesApi } from "../../services/apiMovie";

export function useFeaturedMovies(page=1){
   const{data:featuredMovies,isLoading,error}=useQuery({queryFn:()=>getFeaturedMoviesApi(page),queryKey:['featured',page]});
   return {featuredMovies,isLoading,error}
}