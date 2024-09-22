import React, { ReactNode, useTransition } from "react";
import FormSelect from "../inputsForm/FormSelect";
import FormInput from "../inputsForm/FormInput";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import MiniTitle from "../defaults/MiniTitle";
import FormFlexContainer from "./FormFlexContainer";
import Head1 from "../defaults/Head1";
import Link from "next/link";
export interface CustomFormProps {
  inputs?: InputProps[];
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
  label?: string;
  className?: string;
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
  noProgress?: boolean;
  area?: boolean;
  title?: string;
  flex?: boolean;
}
const CustomForm = ({
  inputs,
  serverError,
  title,
  btnText,
  form,
  onSubmit,
  children,
  linkText,
  link,
  disabled,
  isPending,
  btnStyles,
  cancel,
}: CustomFormProps) => {
  return (
    <Form {...form}>
      <form className="flex w-full items-stretch gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-1 flex-col">
          {title && <Head1 size="text-xl" className=" text-lg text-center" title={title} />}
          <div className="flex pt-4 w-full flex-col  gap-2">
            <FormFlexContainer title={inputs?.filter((i) => i.title !== "")?.[0].title} className="w-full">
              {inputs
                ?.filter((i) => i.flex)
                .map((input) =>
                  input.select ? (
                    <FormSelect placeholder={input.placeholder} key={input.name} {...input} />
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
            </FormFlexContainer>
            {inputs
              ?.filter((i) => !i.flex)
              .map((input) => (
                <>
                  {input.title && <MiniTitle boldness="bold" size="lg" className="   uppercase" text={input.title} />}
                  {input.select ? (
                    <FormSelect placeholder={input.placeholder} key={input.name} {...input} />
                  ) : (
                    <FormInput
                      disabled={disabled}
                      label2={input.label2 || ""}
                      switchToggle={input.switchToggle}
                      phone={input.phone || false}
                      key={input.name}
                      {...input}
                    />
                  )}
                </>
              ))}{" "}
          </div>
          {children}
          <div className={cn("flex gap-2 mt-5 items-center", { "self-center w-[60%]": cancel })}>
            <div className={`${btnStyles} ${!cancel ? "flex-1" : "flex-grow"} flex items-center flex-col`}>
              {link && linkText && <Link className=" ml-auto mb-3" href={link}>{linkText}</Link>}
              <Button className={btnStyles} disabled={isPending || disabled}>
                {btnText}
              </Button>
            </div>
            {cancel && (
              <DialogClose className=" mx-auto flex-grow w-full flex  items-center gap-5  ">
                {
                  <Button
                    type="button"
                    className="text-xs flex-grow mr-auto self-end mx-0  hover:bg-main2 hover:text-white rounded-full flex  items-center gap-2 px-6  border border-main2 bg-white text-main2"
                  >
                    Cancel
                  </Button>
                }
              </DialogClose>
            )}
          </div>
          <div className=" mt-2">
            {Array.isArray(serverError)
              ? serverError?.map((err: any, i: number) => (
                  <p key={i} className="text-red-500 text-sm">
                    {err}
                  </p>
                ))
              : serverError && <p className="text-red-500 text-sm">{serverError}</p>}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CustomForm;
