import {  useQuery } from "@tanstack/react-query";
import { getEpisodeDetails as getEpisodeDetailsApi } from "../services/apiMovie";

export default function useEpisodeDetails(id, seasonNum, episodeNum) {
  const { data: episodeDetails,isLoading } = useQuery({
    queryFn: () =>getEpisodeDetailsApi(id, seasonNum, episodeNum),queryKey:['episode']
  });
  return { episodeDetails, isLoading };
}
