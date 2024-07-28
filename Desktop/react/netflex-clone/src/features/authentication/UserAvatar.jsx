import { useAvatar } from "../../context/useAvatar";
import { useUser } from "./useUser";

function UserAvatar() {
  const { avatar } = useAvatar();
  const { user } = useUser();
  const userAvatar = user.user_metadata.avatar_url;
 
  return (
    <img
      className=" w-[2rem] rounded-md"
      src={`${userAvatar || `/avatar${avatar}.jpg`}`}
    />
  );
}

export default UserAvatar;
