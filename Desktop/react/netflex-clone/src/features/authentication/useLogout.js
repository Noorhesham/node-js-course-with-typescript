import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const querClient = useQueryClient();
  const { mutate: logout, isPending: isLogginOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      querClient.removeQueries();
      navigate("start/login", { replace: true });
    },
    onError: () => toast.error("Problem logging out from your account .."),
  });
  return { logout, isLogginOut };
}
