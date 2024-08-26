"use client";
import React, { useEffect } from "react";
const MapComponent = dynamic(() => import("@/app/components/Map"), {
  loading: () => (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Spinner />
    </div>
  ),
  ssr: false,
});
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";
import dynamic from "next/dynamic";
interface BranchProps {
  is_main_branch: boolean;
  co_info_email: string;
  co_info_phone: string;
  co_info_address: {
    en: string;
    ar: string;
  };
  co_info_location: string;
  co_info_location_url: string;
  lat: number;
  lng: number;
}
const ContactUsLocation = () => {
  const [mount, setMount] = React.useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  const { generalSettings, loading } = useAuth();
  if (loading) return <Spinner />;
  const { company_contacts } = generalSettings;
  const { branches } = company_contacts;
  const markers = branches.map((branch: BranchProps) => ({
    position: {
      lat: branch.lat,
      lng: branch.lng,
    },
    title: branch.co_info_location,
  }));
  return (
    <div className=" w-full h-[500px]">
      {mount && <MapComponent defaultLocation={markers[0].position} markers={markers} />}
    </div>
  );
};

export default ContactUsLocation;
