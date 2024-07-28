import { useQuery } from "@tanstack/react-query";
import { getPerson } from "../../services/apiMovie";

export default function useGetPerson(id) {
  const {
    data: person,
    error,
    isLoading,
  } = useQuery({ queryFn:()=>getPerson(id), queryKey: ["person",id] });
  return { person, error, isLoading };
}
