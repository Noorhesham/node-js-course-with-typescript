import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeWatchLater as removeWatchLaterApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useRemoveWatchLater(){
    const queryClient=useQueryClient();
    const {mutate:removeWatchLater,isPending,error}=useMutation({mutationFn:(id)=>removeWatchLaterApi(id),onSuccess:()=>{
        toast.success('movie removed successfully 😸❤️')
        queryClient.invalidateQueries({queryKey:['watchLater']})
    },onError:(err)=>{
        console.error(err)
        toast.error("could not remove movie ")}})
    return {removeWatchLater,isPending,error}
}