import { useMutation } from "@tanstack/react-query";
import { uploadAvatar as uploadAvatarApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateAvatar() {
  const {
    mutate: uploadAvatar,
    isPending,
  } = useMutation({
    mutationFn: (avatar) => {
        uploadAvatarApi(avatar)},
    onSuccess: () => {
      toast.success("User profile updated sucessfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { uploadAvatar, isPending };
}
