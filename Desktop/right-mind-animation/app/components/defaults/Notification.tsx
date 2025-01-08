import React from "react";
import Container from "../Container";
import { CalendarIcon, ChevronRight } from "lucide-react";
import FunctionalButton from "../FunctionalButton";
import MeetingForm from "../forms/MeetingForm";
import UserCard from "../UserCard";
import SateChange from "../SateChange";
import ModalCustom from "./ModalCustom";
import { convertToHTML } from "@/lib/utils";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { format } from "date-fns";
import MiniTitle from "./MiniTitle";
const Notification = ({
  notification,
  show,
}: {
  notification: {
    image: string;
    name: string;
    duration?: string;
    speciality: string;
    address?: string;
    content?: string;
  };
  show?: boolean;
}) => {
  return (
    <ModalCustom
      btn={
        <Container className="content-text hover:bg-gradient-to-r from-light to-white   duration-150">
          <div className={` flex  justify-between flex-row  gap-5 items-center sm:justify-between`}>
            <UserCard notification={true} applicant={notification} show={show} />
            <div className=" flex items-center gap-3">
              {show ? (
                <>
                  <FunctionalButton btnText="SCHEDULE MEETING" icon={<CalendarIcon />} content={<MeetingForm />} />
                </>
              ) : (
                <>{!notification && <SateChange />}</>
              )}
            </div>
            <div className=" cursor-pointer p-1 rounded-xl bg-main2 text-gray-50">
              <ChevronRight />
            </div>
          </div>
        </Container>
      }
      content={
        <MaxWidthWrapper className="flex flex-col items-center">
          <MiniTitle size="lg" boldness="bold" color=" text-main2" text={notification.name} />
          <span>{notification.speciality}</span>
          <div
            dangerouslySetInnerHTML={{ __html: convertToHTML(notification.content || "") }}
            className={`  text-center text-black lg:text-base text-sm  font-medium my-2 leading-[1.7] `}
          />
        </MaxWidthWrapper>
      }
    />
  );
};

export default Notification;
