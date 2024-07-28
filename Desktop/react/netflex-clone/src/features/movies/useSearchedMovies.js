import { useQuery } from "@tanstack/react-query";
import { searchForMovie } from "../../services/apiMovie";

export function useSearchedMovies(query,genre=""){
    const{data:searchedMovieTitle,isLoading,error}=useQuery({queryFn:()=>searchForMovie(query,genre,1,true),queryKey:[`search,${query},${genre}`],});
    return {searchedMovieTitle,isLoading,error}
}