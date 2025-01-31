"use client";
import React, { useTransition } from "react";
import Container from "../Container";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FlexWrapper from "../defaults/FlexWrapper";
import MiniTitle from "../defaults/MiniTitle";
import Paragraph from "../defaults/Paragraph";
import { Label } from "@/components/ui/label";
import { useGetEntity } from "@/lib/queries";
import Spinner from "../Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Server } from "@/app/main/Server";
import { format } from "date-fns";
import { DialogClose } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import FunctionalButton from "../FunctionalButton";
import LocalTime from "../LocalTime";
const formatToGMT = (dateStr) => {
  const date = new Date(dateStr);
  const gmtTime = utcToZonedTime(date, "Etc/UTC");
  return format(gmtTime, "dd/MM/yyyy hh:mmaaa");
};
const formatToLocalTime = (dateStr) => {
  const date = new Date(dateStr);
  return format(date, "dd/MM/yyyy hh:mmaaa");
};

const SelectDate = ({
  meeting_id,
  jobId = "0",
  person = false,
  companyId,
}: {
  meeting_id: string;
  jobId: string;
  person?: boolean;
  companyId?: string;
}) => {
  const { data, isLoading } = useGetEntity(
    "person-slots",
    `person-slots-${jobId}`,
    jobId || "0",
    {
      nocompany: person === true,
    },
    `job_id=${jobId||"0"}&company_id=${companyId}`
  );

  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = React.useState();
  const queryCLient = useQueryClient();
  if (isLoading || !data) return <Spinner />;
  const handleSelect = (slot_id: string) => {
    console.log(selected);
    startTransition(async () => {
      const res = await Server({
        resourceName: "book",
        body: {
          slot_id,
          meeting_id,
        },
      });
      console.log(res);
      if (res?.status) {
        toast.success(res.message);
        queryCLient.invalidateQueries({ queryKey: [`person-meetings`] });
      } else toast.error(res.message);
    });
  };
  console.log(data);
  return (
    <div className=" flex flex-col gap-4 items-center">
      <div className=" flex flex-col items-center ">
        {/* <MiniTitle
          size="lg"
          text="Senior General Practitioner"
          boldness="bold"
          color="text-main2"
          className=" text-center"
        /> */}
        <Paragraph
          size="sm"
          description="Choose the time that suits you from the following appointments (times here are in GMT time)"
        />
      </div>
      <RadioGroup value={selected} className="flex justify-center w-full flex-col items-center mt-2">
        {data.data.map((option: any, i: number) => (
          <Container key={i} className=" w-[80%]">
            <div>
              <Label className="flex justify-between w-full items-center gap-2" htmlFor={option.date}>
                <div className="flex flex-col gap-2">
                  <h4 className="text-main2 font-semibold">{formatToLocalTime(option.from_date)}</h4>
                  <LocalTime date={option.from_date} />
                  {/* <p className=" text-muted-foreground">DURATION {option.duration}</p> */}
                </div>
                <RadioGroupItem
                  onClick={() => setSelected(option.id)}
                  disabled={isPending}
                  id={option.id}
                  value={option.id}
                />
              </Label>
            </div>
          </Container>
        ))}
      </RadioGroup>
      <div className="flex items-center gap-4">
        <FunctionalButton disabled={isPending} btnText="Book" onClick={() => handleSelect(selected)} />
        <DialogClose asChild className="mx-auto flex items-center gap-5">
          {
            <Button className=" rounded-full" variant={"outline"}>
              Close
            </Button>
          }
        </DialogClose>
      </div>
    </div>
  );
};

export default SelectDate;
