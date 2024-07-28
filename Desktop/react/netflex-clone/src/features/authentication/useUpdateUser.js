import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser(){
    const queryClient=useQueryClient();
    //i either destruct the object in the api function and do not pass anything here or destruct here and recieve args in the api
    const{mutate:updateUser,isLoading:isUpdating}=useMutation({mutationFn:updateCurrentUser,onSuccess:(data)=>{
        console.log(data)
        toast.success('user data was successfully updated ! 😸❤️');
        queryClient.invalidateQueries({queryKey:['user']})
    },onError:(err)=>toast.error(err.message)})
    return {updateUser,isUpdating}
}