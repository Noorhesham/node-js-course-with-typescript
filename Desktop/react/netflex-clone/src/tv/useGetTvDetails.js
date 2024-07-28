import { useQuery } from "@tanstack/react-query";
import { getTvDetails } from "../services/apiMovie";
import { useParams } from "react-router";

export default function useGetTvDetails(bool) {
  const {showId}=useParams()
   const {
    data: show,
    error,
    isLoading,
  } = useQuery({ queryFn:()=>getTvDetails(showId,bool), queryKey: ["show",showId] });
  return { show, error, isLoading };
}
