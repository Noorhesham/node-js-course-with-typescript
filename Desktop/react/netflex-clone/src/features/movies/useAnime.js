import { useQuery } from "@tanstack/react-query";
import { getAnime } from "../../services/apiMovie";

export function useAnime(page=1){
    const{data:anime,isLoading,error}=useQuery({queryFn:()=>getAnime(page),queryKey:['anime',page]});
    return {anime,isLoading,error}
}