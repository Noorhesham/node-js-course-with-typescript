import React from "react";
import TableHeading from "@/app/components/TableHeading";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { patientColumns } from "./columns";
import { TableCustom } from "@/app/components/TableCustom";


const patientData: any[] = [
  {
    name: "John Doe",
    id: "P-1001",
    photo: "/images/patient1.jpg",
  },
  {
    name: "Jane Smith",
    id: "P-1002",
    photo: "/images/patient2.jpg",
  },
];

const MyPatientsPage = () => {
  return (
    <MaxWidthWrapper>
      <TableHeading
        paragraph="View details of your registered patients."
        title="My Patients"
        image="/icons/patient.svg"
      />
      <TableCustom columns={patientColumns} data={patientData} />
    </MaxWidthWrapper>
  );
};

export default MyPatientsPage;
