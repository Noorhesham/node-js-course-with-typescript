import { useMutation } from "@tanstack/react-query";
import {  recoverPassword as recoverPasswordApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useRecover() {
  const navigate = useNavigate();
  const {
    mutate: recoverPassword,
    isPending,
    error,isSuccess
  } = useMutation({
    mutationFn: ( email) => recoverPasswordApi( email),
    onSuccess: () => {
    },
    onError: () => {
      toast.error("provided email or password are not correct 😢 ");
    },
  });
  return { recoverPassword, isPending,isSuccess, error };
}
