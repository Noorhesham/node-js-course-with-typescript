import {  useQuery } from "@tanstack/react-query";
import {  getSuperHeroMovies  } from "../../services/apiMovie";

export function useSuperHeroMovies(page=1){
   const{data:superHeroMovies,isLoading,error}=useQuery({queryFn:()=>getSuperHeroMovies(page),queryKey:['superHero',page]});
   return {superHeroMovies,isLoading,error}
}