import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  updatePass } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdatePass(){
    const queryClient=useQueryClient();
    //i either destruct the object in the api function and do not pass anything here or destruct here and recieve args in the api
    const{mutate:updatePassword,isLoading:isUpdating}=useMutation({mutationFn:updatePass,onSuccess:(data)=>{
        console.log(data)
        toast.success('user data was successfully updated ! 😸❤️');
        queryClient.invalidateQueries({queryKey:['user']})
    },onError:(err)=>toast.error(err.message)})
    return {updatePassword,isUpdating}
}