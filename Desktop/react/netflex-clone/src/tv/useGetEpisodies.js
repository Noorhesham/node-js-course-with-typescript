import { useMutation,  } from "@tanstack/react-query";
import { getEpisodiesSeason } from "../services/apiMovie";
import { useParams } from "react-router";

export default function useGetEpisodies(num) { 
    const {showId}=useParams()
    const {mutate:getEpisodies,isPending}=useMutation({mutationFn:()=>getEpisodiesSeason(showId,num)})
    return {getEpisodies,isPending,}

}
