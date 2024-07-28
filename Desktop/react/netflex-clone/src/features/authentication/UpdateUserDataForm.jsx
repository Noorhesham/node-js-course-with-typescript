import { useState } from "react";

import OasisButton from "../../ui/components/OasisButton.jsx";
import FormRow from "../../ui/accounts/FormRow.jsx";
import miniLoader from "../../ui/loading/miniLoader.jsx";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { MdAddAPhoto } from "react-icons/md";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { full_name: currentFullName },
    },
  } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { full_name: fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }
  function cancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }
  return (
    <form
      className={` text-[1.4rem]    py-5 px-10   border-gray-100 rounded-md"}`}
      onSubmit={handleSubmit}
    >
      <FormRow label="Email address">
        <input
          className=" border-gray-300  rounded-md py-3 px-6 shadow-md"
          value={email}
          disabled
        />
      </FormRow>
      <FormRow label="Full name">
        <input
          className=" border-gray-300 bg-[#575757] rounded-md py-3 px-6 shadow-md"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="full_name"
          disabled={isUpdating}
        />
      </FormRow>


        
      <div className="flex items-center justify-center p-1 mt-3">

    <label className="text-red-600 border-dashed duration-150  border-4 border-red-600 hover:bg-red-100 flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-full  bg-gray-100 uppercase tracking-wide shadow-lg hover:text-gray-500">
      <MdAddAPhoto className=" " />
      <span className="mt-2 text-base leading-normal">Upload Photo</span>
      <input
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          type="file" className=" hidden"
          onChange={(e) => setAvatar(e.target.files[0])}
    
        />
    </label>

</div>
      
      <FormRow>
        <OasisButton onClick={cancel} type="reset" variation="secondary">
          Cancel
        </OasisButton>
        <OasisButton disabled={isUpdating} variation="primary">
          {isUpdating ? <miniLoader /> : "Update account"}
        </OasisButton>
      </FormRow>
    </form>
  );
}

export default UpdateUserDataForm;
