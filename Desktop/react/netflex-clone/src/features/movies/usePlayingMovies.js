import {  useQuery } from "@tanstack/react-query";
import {  getPlayingMovies  } from "../../services/apiMovie";

export function usePlayingMovies(page=1){
   const{data:playingMovies,isLoading,error}=useQuery({queryFn:()=>getPlayingMovies(page),queryKey:['playing']});
   return {playingMovies,isLoading,error}
}