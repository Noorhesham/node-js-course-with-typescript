import { useQuery } from "@tanstack/react-query";
import { getCollection } from "../../services/apiMovie";

export default function useGetCollection(id) {

  const {
    data: collection,
    error,
    isLoading,
  } = useQuery({ queryFn:()=>getCollection(id), queryKey: ["collection",id] });
  return { collection, error, isLoading };
}
