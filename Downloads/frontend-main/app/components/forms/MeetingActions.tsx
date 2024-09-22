import React from "react";
import Container from "@/app/components/Container";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MiniTitle from "../defaults/MiniTitle";
import { Button } from "@/components/ui/button";
const MeetingActions = () => {
  return (
    <div className=" flex gap-5 flex-col justify-center items-center">
      <div className=" flex flex-col items-center gap-4">
        <MiniTitle color=" text-main" text="MAIN ACTIONS" />
        <div className=" flex items-center gap-3">
          <button className=" px-4 bg-main2 text-gray-50 rounded-full  py-1">AGREE</button>
          <button className=" px-4 bg-red-600 text-gray-50 rounded-full  py-1">REFUSE</button>
        </div>
      </div>
      <div className=" flex flex-col items-center gap-4">
        <MiniTitle color=" text-main" text="MORE ACTIONS" />
        <div className=" flex flex-col gap-3">
          <Container>
            <RadioGroup className=" flex justify-between  items-center">
              <p>Request a new offer with a salary increase</p>
              <RadioGroupItem id="" value="" />
            </RadioGroup>
          </Container>
          <Container>
            <RadioGroup className=" flex justify-between  items-center">
              <p>Ask for extra benefits</p>
              <RadioGroupItem id="" value="" />
            </RadioGroup>
          </Container>
          <Container>
            <RadioGroup className=" flex justify-between  items-center">
              <p>Ask for a car</p>
              <RadioGroupItem id="" value="" />
            </RadioGroup>
          </Container>
          <Container>
            <RadioGroup className=" flex  justify-between items-center">
              <p>Ask for living accommodation</p>
              <RadioGroupItem id="" value="" />
            </RadioGroup>
          </Container>
        </div>
      </div>
      <Button className=" w-full lg:w-[30%]" size="lg">
        SEND
      </Button>
    </div>
  );
};

export default MeetingActions;
