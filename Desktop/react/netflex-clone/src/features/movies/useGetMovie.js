import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getTvDetails } from "../../services/apiMovie";
import { useParams } from "react-router";

export default function useGetMovie(id,publicMovie=false,media,url) {
  const { movieId } = useParams();
  const idd=movieId||id;
  const {
    data: movie,
    error,
    isLoading,
  } = useQuery({ queryFn:()=>media==="tv"?getTvDetails(id):getMovieDetails(idd,publicMovie), queryKey: ["movie",idd,url] });
  return { movie, error, isLoading };
}
