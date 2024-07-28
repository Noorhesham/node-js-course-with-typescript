import FormField from "./FormField";

function FormRow({ children, label, error }) {
  return (
    <FormField>
      {label && (
        <label className=" font-semibold" htmlFor={children?.props?.id}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className=" text-xl my-auto  text-red-700 bg-red-100  py-2 px-4">
          {error}
        </p>
      )}
    </FormField>
  );
}

export default FormRow;
