import { useQuery } from "@tanstack/react-query";
import { getCompany } from "../../services/apiMovie";

export function useGetCompany(id){
    const {
        data: companyDetails,
        error,
        isLoading,
      } = useQuery({ queryFn:()=>getCompany(id), queryKey: ["company",id] });
      return { companyDetails, error, isLoading };
}