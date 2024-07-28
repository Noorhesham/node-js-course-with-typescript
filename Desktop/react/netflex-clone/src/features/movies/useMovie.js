import { useQuery } from "@tanstack/react-query";
import { getMovieDetails} from "../../services/apiMovie";
import { useParams } from "react-router";

export function useMovie(){
   const {id}=useParams()
   const{data:movie,isLoading,error}=useQuery({queryKey:['movie',id],queryFn:()=>getMovieDetails(id),retry:false,})
   return { isLoading,movie,error}
}