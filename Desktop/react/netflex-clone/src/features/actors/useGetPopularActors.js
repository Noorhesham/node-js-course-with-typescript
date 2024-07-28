import {  useQuery } from "@tanstack/react-query";
import {  popularActor } from "../../services/apiMovie";

export function useGetPopularActors(page=1){
   const{data:featuredActors,isLoading,error}=useQuery({queryFn:()=>popularActor(page),queryKey:['actors',page]});
   return {featuredActors,isLoading,error}
}