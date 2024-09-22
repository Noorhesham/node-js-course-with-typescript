import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { TableCustom } from "@/app/components/TableCustom";
import TableHeading from "@/app/components/TableHeading";
import React from "react";
import { sessionColumns } from "./columns";


const sessionData: any[] = [
  {
    subject: "Therapy Session",
    date: "2024-09-20",
    time: "12:00 PM",
    patient: "John Doe",
    status: "Ongoing",
  },
  {
    subject: "Consultation",
    date: "2024-09-22",
    time: "01:00 PM",
    patient: "Jane Smith",
    status: "Pending",
  },
];

const MySessionsPage = () => {
  return (
    <MaxWidthWrapper>
      <TableHeading paragraph="افحص وراجع اخر الجلسات التي قمت بها مع المرضى" title="جلساتي" />
      <TableCustom columns={sessionColumns} data={sessionData} />
    </MaxWidthWrapper>
  );
};

export default MySessionsPage;
