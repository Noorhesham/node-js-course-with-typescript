"use client";
import Container from "@/app/components/Container";

import dynamic from "next/dynamic";
import Spinner from "./Spinner";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
const MapComponent = dynamic(() => import("@/app/components/Map"), {
  loading: () => (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Spinner />
    </div>
  ),
  ssr: false,
});

const MapContainer = ({ location }: { location: { lat: number; lng: number } }) => {
  const [locations, setLoctation] = useState(location || { lat: 0, lng: 0 });

  return (
    <>
      <div className="  rounded-xl mt-5   h-full relative w-full col-span-2">
        <div className=" sticky top-0 h-[30rem]">
          <MapComponent defaultLocation={locations} />
        </div>
      </div>
    </>
  );
};

export default MapContainer;
