"use client";
import { useZodForm } from "@/app/hooks/useZodForm";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";
import MiniTitle from "../defaults/MiniTitle";
import CalendarInput from "../inputsForm/CalendarInput";
import { Form } from "@/components/ui/form";
import { XIcon } from "lucide-react";
import FunctionalButton from "../FunctionalButton";
import FormInput from "../inputsForm/FormInput";

const meetingsSchema = z.object({
  meetings: z.array(
    z.object({
      date: z.date().refine((date) => !isNaN(date.getTime()), {
        message: "Invalid date",
      }),
      startFrom: z.string().min(1, "Start time is required"),
    })
  ),
});

const MeetingForm = () => {
  const form = useZodForm({
    schema: meetingsSchema,
    defaultValues: {
      meetings: [{ date: new Date(), startFrom: "" }],
    },
  });

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "meetings",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const watchedFields = form.watch("meetings", fields);

  return (
    <div>
      <MiniTitle boldness="bold" color="black" text="GENERAL PRACTITONER AVAILABLE DATES" />
      <Form {...form}>
        <form className="mt-4 px-5 flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          {watchedFields.map((field, index) => (
            <div className="flex w-full items-center gap-5" key={index}>
              <CalendarInput control={form.control} name={`meetings.${index}.date`} />
              <FormInput label="Start From" control={form.control} name={`meetings.${index}.startFrom`} type="time" />
              <button
                type="button"
                onClick={() => remove(index)}
                className="rounded-xl self-center border-2 border-gray-600 p-1 my-auto"
              >
                <XIcon className="w-4 h-4 " />
              </button>
            </div>
          ))}
          <div className="w-fit my-5">
            <FunctionalButton
              size="sm"
              btnText="ADD ANOTHER"
              onClick={() => append({ date: new Date(), startFrom: "" })}
            />
          </div>

          <FunctionalButton
            className="w-[60%] mx-auto"
            size="sm"
            btnText="SAVE"
            onClick={form.handleSubmit(onSubmit)}
          />
        </form>
      </Form>
    </div>
  );
};

export default MeetingForm;
