import { useQuery } from "@tanstack/react-query";
import { getCompaniesSpcific } from "../../services/apiMovie";
import { MAIN_COMPANIES } from "../../utils/Constans";

export default function useGetCompanies() {

  const {
    data: mainCompanies,
    error,
    isLoading,
  } = useQuery({queryFn:()=>getCompaniesSpcific(MAIN_COMPANIES), queryKey: ["companies"] });
  return { mainCompanies, error, isLoading };
}
