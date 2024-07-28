import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WatchLater as WatchLaterApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useWatchLater(){
    const queryClient=useQueryClient();
    const {mutate:addToWatchLater,isPending,error}=useMutation({mutationFn:({id,media})=>WatchLaterApi({id,media}),onSuccess:(data)=>{
        console.log(data)
        toast.success(`Added successfully to watch list  😊❤️`)
        queryClient.invalidateQueries({queryKey:['watchLater']})
    },onError:(err)=>{
        console.error(err)
        toast.error("could not add movie ")}})
    return {addToWatchLater,isPending,error}
}