import { useQuery } from "@tanstack/react-query";
import { getMovieUpcoming } from "../../services/apiMovie";

export function useMovieUpcoming(page=1){
    const{data:upcomingMovies,isLoading,error}=useQuery({queryFn:()=>getMovieUpcoming(page),queryKey:['coming']});
    return {upcomingMovies,isLoading,error}
}