import { useMutation } from "@tanstack/react-query";
import { UploadReview as UploadReviewApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUploadReview(){
    const {mutate:uploadReview,isPending,error}=useMutation({mutationFn:({review,id})=>UploadReviewApi({review,id}),onSuccess:()=>{
        toast.success('Review added successfully')
    },onError:(err)=>{
        console.error(err)
        toast.error("could not upload review ")}})
    return {uploadReview,isPending,error}
}