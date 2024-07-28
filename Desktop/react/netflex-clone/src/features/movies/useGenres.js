import { useQuery } from "@tanstack/react-query";
import { getAllGenres } from "../../services/apiMovie";

export function useGenres(){
    const{data:genres,isLoading,error}=useQuery({queryFn:getAllGenres,queryKey:['genres']});
    return {genres,isLoading,error}
}