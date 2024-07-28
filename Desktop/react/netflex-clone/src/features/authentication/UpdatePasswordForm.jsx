import { useForm } from "react-hook-form";
import OasisButton from "../../ui/components/OasisButton";
import FormRow from "../../ui/accounts/FormRow";
import { useUpdatePass } from "./useUpdatePass";

// import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updatePassword, isUpdating } = useUpdatePass();

  function onSubmit({ password }) {
    updatePassword({ password }, { onSuccess: reset });
  }

  return (
    <form
      className={` text-[1.4rem]  py-5 px-10 flex flex-col   border-gray-100 rounded-md"}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow
        label="New Password (min 8 chars)"
        error={errors?.password?.message}
      >
        <input
          className=" border-gray-30 bg-[#575757] rounded-md py-3 px-6 shadow-md"
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <input
          className=" border-gray-300 bg-[#575757]   rounded-md py-3 px-6 shadow-md"
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <OasisButton onClick={reset} type="reset" variation="secondary">
          Cancel
        </OasisButton>
        <OasisButton variation="primary" disabled={isUpdating}>
          Update password
        </OasisButton>
      </FormRow>
    </form>
  );
}

export default UpdatePasswordForm;
