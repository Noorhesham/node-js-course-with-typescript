import Image from "next/image";
import React from "react";
import MiniTitle from "./defaults/MiniTitle";
import Container from "./Container";
import Head1 from "./defaults/Head1";
import Link from "next/link";

const Doctor = ({ doctor }: { doctor: { image: string; name: string; duration: string; speciality: string } }) => {
  return (
    <Link href={"/doctor/1"}>
      {" "}
      <Container className=" gap-2 flex flex-row-reverse  items-start">
        <div className=" w-20 relative h-20 aspect-square overflow-hidden rounded-full">
          <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
        </div>
        <div className=" flex flex-col items-center gap-2">
          <Head1 size="text-lg" title={doctor.name} color="text-black" />
          <p className=" text-sm text-muted-foreground font-semibold">{doctor.speciality}</p>
          <p className=" text-xs text-muted-foreground">{doctor.duration}</p>
        </div>
      </Container>
    </Link>
  );
};

export default Doctor;
