import React from "react";
import Container from "../Container";
import { CalendarIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import FunctionalButton from "../FunctionalButton";
import MeetingForm from "../forms/MeetingForm";
import UserCard from "../UserCard";
import SateChange from "../SateChange";
import ModalCustom from "./ModalCustom";
import Paragraph from "./Paragraph";
const Notification = ({
  notification,
  show,
}: {
  notification: { image: string; name: string; duration: string; speciality: string; address: string };
  show?: boolean;
}) => {
  return (
    <Container className=" hover:bg-gradient-to-r from-light to-white   duration-150">
      <div className={` flex  justify-between flex-row  gap-5 items-center sm:justify-between`}>
        <UserCard applicant={notification} show={show} />
        <div className=" flex items-center gap-3">
          {show ? (
            <>
              <FunctionalButton btnText="SCHEDULE MEETING" icon={<CalendarIcon />} content={<MeetingForm />} />
            </>
          ) : (
            <>
              {!notification && <SateChange />}
              <ModalCustom
                btn={
                  <div className=" p-1 rounded-xl bg-main2 text-gray-50">
                    <ChevronRight />
                  </div>
                }
                content={
                  <div>
                    <Paragraph description="loremLorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nisi ullam expedita atque deserunt excepturi cumque sint saepe quas consectetur? Dolores aspernatur illo quae veniam odio impedit mollitia eos earum. " />
                  </div>
                }
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Notification;
