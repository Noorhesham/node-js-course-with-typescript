import { useState } from "react";
import { useUpdateAvatar } from "../features/authentication/useUpdateAvatar";
import { useUser } from "../features/authentication/useUser";
import { format } from "date-fns";
import { MdCreateNewFolder, MdEmail } from "react-icons/md";
import Avatar from "../ui/Avatar";
import AccCard from "../ui/accounts/AccCard";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import Title from "../ui/components/Title";
import Footer from "../ui/Footer/Footer";

function Account() {
  const { uploadAvatar, isPending } = useUpdateAvatar();
  const [avatar, setAvatar] = useState("");

  const {
    user: {
      user_metadata: { avatar_url, full_name },
      created_at,
      email,
      last_sign_in_at,
    },
  } = useUser();

  const data = [
    {
      data: format(new Date(created_at), "MMM dd yyyy"),
      icon: <MdCreateNewFolder />,
      label: "Account was created At",
    },
    { data: email, icon: <MdEmail />, label: "my email" },
    {
      data: format(new Date(last_sign_in_at), "MMM dd yyyy"),
      icon: "",
      label: "last sign in",
    },
  ];
  return (
    <section className=" text-xl flex flex-col p-11 pt-[8rem]">
      <div className=" flex lg:flex-row flex-col items-center">
        <div className=" flex  flex-col justify-center items-center mr-10 flex-none border-r-2 border-gray-400 ">
          <Avatar avatarImg={avatar_url} />
          <h3 className=" font-bold text-5xl  text-gray-100 mt-7">
            {" "}
            {full_name}
          </h3>
        </div>
        <div className=" flex gap-4 flex-wrap m-auto ">
          {data.map((da, i) => (
            <AccCard key={i} data={da.data} label={da.label} icon={da.icon} />
          ))}
        </div>
      </div>

      <div className="m-auto">
        <h1 className=" text-5xl font-semibold mb-5 border-b-4 border-red-800 pb-4">
          Update your account
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div>
          <Title>Update user data</Title>
          <UpdateUserDataForm />
        </div>

        <div>
          <Title>Update password</Title>
          <UpdatePasswordForm />
        </div>
      </div>
      <Footer/>
    </section>
  );
}

export default Account;

// <div className=" pt-20">
//   <form
//     onSubmit={(e) => {
//       e.preventDefault();
//       uploadAvatar(avatar);
//     }}
//   >
//     <input
//       accept="image/*"
//       onChange={(e) => setAvatar(e.target.files[0])}
//       type="file"
//     />
//     <button>submit</button>
//   </form>
// </div>
