import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp(){
    const{mutate:signUp,error,isPending}=useMutation({mutationFn:(data)=>signUpApi(data),mutationKey:['user'],
    onSuccess:()=>{
        toast.success(`Account successfully created!😸❤️,
        please verify the new account from user's email address.`)
    },onError:()=>{
        toast.error("an error occured during sign up")
    }})
    return{signUp,error,isPending}
}