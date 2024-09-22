import React, { ReactNode, useTransition } from "react";
import ComboboxForm from "./ComboboxForm";
import FormInput from "./FormInput";
import { Form } from "@/components/ui/form";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Spinner from "./Spinner";

export interface CustomFormProps {
  inputs: InputProps[];
  src?: string;
  serverError?: string[] | string | null;
  title?: string;
  noimg?: boolean;
  text?: string;
  onSubmit?: any;
  id?: string;
  form: any;
  titles?: string[];
  isPending?: boolean;
  localSubmit?: any;
  children?: ReactNode;
  btnText?: string;
  link?: string;
  linkText?: string;
  disabled?: boolean;
  btnStyles?: string;
  cancel?: any;
}

export interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  description?: string;
  label: string;
  id?: string;
  options?: any[];
  select?: boolean;
  removeOp?: any;
  selected?: any;
  defaultValue?: any;
  phone?: boolean;
  switchToggle?: boolean;
  label2?: string;
  date?: boolean;
  password?: boolean;
  children?: ReactNode;
  onChange?: any;
  noProgress?: boolean;
  area?: boolean;
  flex?: boolean; // Added flex property to InputProps
}

const CustomForm = ({
  inputs,
  serverError,
  title,
  btnText,
  form,
  onSubmit,
  children,
  disabled,
  isPending,
  cancel,
}: CustomFormProps) => {
  return (
    <Form {...form}>
      <form dir="rtl" className="flex w-full items-stretch gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-1 flex-col">
          {title && <h1 className="text-lg text-center">{title}</h1>}
          <motion.div
            transition={{ duration: 1, staggerChildren: 0.3, delay: 2 }}
            initial={"hidden"}
            animate={"reveal"}
            className="flex pt-4 flex-col gap-8"
          >
            {/* Render other inputs normally */}
            {inputs
              .filter((input) => !input.flex)
              .map((input) =>
                input.select ? (
                  <ComboboxForm
                    onChange={input.onChange}
                    options={input.options}
                    placeholder={input.placeholder}
                    key={input.name}
                    {...input}
                  />
                ) : (
                  <FormInput
                    disabled={disabled}
                    label2={input.label2 || ""}
                    switchToggle={input.switchToggle}
                    phone={input.phone || false}
                    key={input.name}
                    {...input}
                  />
                )
              )}
            {/* Group inputs by the 'flex' property */}
            {inputs.filter((input) => input.flex).length > 0 && (
              <div className=" grid grid-cols-1 md:grid-cols-2 items-stretch w-full gap-y-10  gap-x-4">
                {inputs
                  .filter((input) => input.flex)
                  .map((input) => (
                    <div className="w-full" key={input.name}>
                      {input.select ? (
                        <ComboboxForm
                          onChange={input.onChange}
                          options={input.options}
                          placeholder={input.placeholder}
                          {...input}
                        />
                      ) : (
                        <FormInput
                          disabled={disabled}
                          label2={input.label2 || ""}
                          switchToggle={input.switchToggle}
                          phone={input.phone || false}
                          {...input}
                        />
                      )}
                    </div>
                  ))}
              </div>
            )}
          </motion.div>
          {children}
          <div className={cn("flex gap-2 mt-5 w-[80%] self-center")}>
            <div className="w-full flex flex-col">
              <Button className="w-full">{isPending ? <Spinner /> : btnText}</Button>
            </div>
            {cancel && (
              <DialogClose className="mx-auto flex-grow w-full flex items-center gap-5">
                <Button
                  type="button"
                  className="text-xs flex-grow mr-auto self-end mx-0 hover:bg-main2 hover:text-white rounded-full flex items-center gap-2 px-6 border border-main2 bg-white text-main2"
                >
                  Cancel
                </Button>
              </DialogClose>
            )}
          </div>
          <div className="mt-2">
            {Array.isArray(serverError)
              ? serverError.map((err, i) => (
                  <p key={i} className="text-purple-500 text-sm">
                    {err}
                  </p>
                ))
              : serverError && <p className="text-purple-500 text-sm">{serverError}</p>}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CustomForm;
