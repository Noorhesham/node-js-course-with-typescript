import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadReview } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useParams } from "react-router";

export function useUploadReview(){
  const queryClient=useQueryClient()
  const {movieId}=useParams()
    const {
        mutate: uploadReview,
        isPending,
      } = useMutation({
        mutationFn: ({review,movieId,rating}) => {
           return UploadReview({review,movieId,rating})},
        onSuccess: () => {
          queryClient.invalidateQueries()
          toast.success("Review uploaded sucessfully");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
      return { uploadReview, isPending };
}