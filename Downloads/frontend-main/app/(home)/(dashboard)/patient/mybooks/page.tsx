import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { TableCustom } from "@/app/components/TableCustom";
import React from "react";
import { appointmentColumns } from "./columns";
import TableHeading from "@/app/components/TableHeading";

const appointmentData: any[] = [
  {
    appointmentDate: "2024-09-20",
    dateBooked: "2024-09-20",
    status: "Confirmed",
  },
  {
    appointmentDate: "2024-09-20",
    dateBooked: "2024-09-20",
    status: "Confirmed",
  },
  {
    appointmentDate: "2024-09-20",
    dateBooked: "2024-09-20",
    status: "Confirmed",
  },
];

const MyAppointmentsPage = ({ params }: { params: { id: string } }) => {
  return (
    <MaxWidthWrapper>
      <TableHeading back={`/patient/dashboard`} paragraph="هنا ستجد جميع الحجوزات الحالية" title="الحجوزات الحالية" />
      <TableCustom columns={appointmentColumns} data={appointmentData} />
    </MaxWidthWrapper>
  );
};

export default MyAppointmentsPage;
