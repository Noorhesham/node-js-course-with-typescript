"use client";
import React from "react";
import Container from "../Container";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FlexWrapper from "../defaults/FlexWrapper";
import MiniTitle from "../defaults/MiniTitle";
import Paragraph from "../defaults/Paragraph";
import { Label } from "@/components/ui/label";

const SelectDate = () => {
  const options = [
    {
      date: "GTM : 20/10/2024 09:00AM - 10:00 AM",
      time: "Local time : 20/10/2024 09:00AM - 10:00 AM",
    },
    {
      date: "GTM : 20/10/2024 09:00AM - 10:00 AM",
      time: "Local time : 20/10/2024 09:00AM - 10:00 AM",
    },
  ];
  return (
    <div>
      <div className=" flex flex-col items-center ">
        <MiniTitle
          size="lg"
          text="Senior General Practitioner"
          boldness="bold"
          color="text-main2"
          className=" text-center"
        />
        <Paragraph size="sm" description="Choose the time that suits you from the following appointments" />
      </div>
      <RadioGroup className="flex justify-center flex-col items-center mt-2">
        {options.map((option: any, i: number) => (
          <Container className=" w-[80%]">
            <div>
              <Label className="flex justify-between w-full items-center gap-2" htmlFor={option.date}>
                <div>
                  <h4 className="text-main2 font-semibold">{option.date}</h4>
                  <p className=" text-muted-foreground">{option.time}</p>
                </div>
                <RadioGroupItem id={option.date} value={option.date} />
              </Label>
            </div>
          </Container>
        ))}
      </RadioGroup>
    </div>
  );
};

export default SelectDate;
