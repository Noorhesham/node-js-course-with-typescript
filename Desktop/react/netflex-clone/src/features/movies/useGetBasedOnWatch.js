import { useQuery } from "@tanstack/react-query";
import { getRelated } from "../../services/apiMovie";

export function useGetBasedOnWatch(){
  const {
    data: based,
    error,
    isLoading:isGettingBased,
  } = useQuery({ queryFn:getRelated, queryKey: ["basedonwatchlater"] });
  return { based, error, isGettingBased };
}