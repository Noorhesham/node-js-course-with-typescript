import Image from "next/image";
import React from "react";
import MiniTitle from "./MiniTitle";

const Doctor = ({ doctor }: { doctor: { image: string; name: string; duration: string; speciality: string } }) => {
  return (
    <div className=" gap-2 flex flex-col items-center">
      <div className=" w-20 relative h-20 aspect-square overflow-hidden rounded-full">
        <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
      </div>
      <MiniTitle color="text-black" className=" text-center" text={doctor.name} />
      <p className=" text-sm text-muted-foreground font-semibold">{doctor.speciality}</p>
      <p className=" text-xs text-muted-foreground">{doctor.duration}</p>
    </div>
  );
};

export default Doctor;
