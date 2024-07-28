import { useQuery } from "@tanstack/react-query";
import {  getWatchLater } from "../../services/apiMovie";

export default function useGetWatchLater() {
  const {
    data: watchLater,
    error,
    isLoading:isGettingWatchLater,
  } = useQuery({ queryFn:getWatchLater, queryKey: ["watchLater"] });
  return { watchLater, error, isGettingWatchLater };
}
