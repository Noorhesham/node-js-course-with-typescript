import {  useQuery } from "@tanstack/react-query";
import { getHomeMovies } from "../../services/apiMovie";

export function useHomeMovies(arr){
   const{data:homeMovies,isLoading,error}=useQuery({queryFn:()=>getHomeMovies(arr),queryKey:['home']});
   return {homeMovies,isLoading,error}
}