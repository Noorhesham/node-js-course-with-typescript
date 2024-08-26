"use client";
import Container from "@/app/components/Container";
import Head1 from "@/app/components/Head1";
import { Location, Phone } from "@/app/components/Icons";
import IconWidget from "@/app/components/IconWidget";
import SearchBox from "@/app/components/SearchBox";
import dynamic from "next/dynamic";
import Spinner from "./Spinner";
import { useState } from "react";
const MapComponent = dynamic(() => import("@/app/components/Map"), {
  loading: () => (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Spinner />
    </div>
  ),
  ssr: false,
});
const containersData = [
  {
    id: 1,
    name: "OREINT DISTRIBUTOR",
    address: "25th building 5, 10 Star Street, 5th Settlement, New Cairo, Egypt",
    phone: "01224586975 - 01158689958",
    lat: 80.0444,
    lng: 31.2357,
  },
  {
    id: 2,
    name: "OREINT DISTRIBUTOR",
    address: "25th building 5, 10 Star Street, 5th Settlement, New Cairo, Egypt",
    phone: "01224586975 - 01158689958",
    lat: 51.505,
    lng: -0.09,
  },
  {
    id: 3,
    name: "GLOBAL ENTERPRISE",
    address: "123 International Road, Business Bay, Dubai, UAE",
    phone: "+971 4 123 4567",
    lat: 25.2048,
    lng: 55.2708,
  },
  {
    id: 4,
    name: "TECH SOLUTIONS",
    address: "456 Silicon Avenue, Tech Park, San Francisco, USA",
    phone: "+1 415 123 4567",
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: 5,
    name: "HEALTHCARE HUB",
    address: "789 Wellness Street, Health City, Toronto, Canada",
    phone: "+1 416 123 4567",
    lat: 43.65107,
    lng: -79.347015,
  },
  {
    id: 6,
    name: "FOODIE HAVEN",
    address: "321 Gourmet Lane, Food District, Paris, France",
    phone: "+33 1 123 4567",
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    id: 7,
    name: "EDU CENTER",
    address: "654 Knowledge Blvd, University Town, Sydney, Australia",
    phone: "+61 2 1234 5678",
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    id: 8,
    name: "RETAIL WORLD",
    address: "987 Shopping Plaza, Mall City, London, UK",
    phone: "+44 20 1234 5678",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: 9,
    name: "TRAVEL AGENCY",
    address: "147 Vacation Road, Holiday Town, Rome, Italy",
    phone: "+39 06 123 4567",
    lat: 41.9028,
    lng: 12.4964,
  },
  {
    id: 10,
    name: "TECH SUPPLY",
    address: "258 Innovation Drive, Tech City, Berlin, Germany",
    phone: "+49 30 1234 5678",
    lat: 52.52,
    lng: 13.405,
  },
  {
    id: 11,
    name: "GREEN ENERGY",
    address: "369 Eco Boulevard, Green Park, Amsterdam, Netherlands",
    phone: "+31 20 123 4567",
    lat: 52.3676,
    lng: 4.9041,
  },
  {
    id: 12,
    name: "SPORTS ZONE",
    address: "741 Fitness Ave, Active City, Tokyo, Japan",
    phone: "+81 3 1234 5678",
    lat: 35.6895,
    lng: 139.6917,
  },
];

const MapContainer = () => {
  const [location, setLoctation] = useState({ lat: 0, lng: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = ({ lat, lng }: { lat: number; lng: number }) => {
    setLoctation({ lat, lng });
  };
  const filteredContainers = containersData.filter(
    (container) =>
      container.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      container.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      container.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className=" flex flex-col gap-5 mt-3  col-span-2">
        {/* <SearchBox  nonactive onSearch={setSearchQuery} bg="blue" />
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 ">
          {filteredContainers.map((container) => (
            <Container
              key={container.id}
              onClick={() => handleClick({ lat: container.lat, lng: container.lng })}
              CustomePadding="px-4 py-5"
              className=" flex flex-col gap-3 px-4"
            >
              <Head1 text={container.name} />
              <IconWidget paragraph={container.address} header="Address" icon={<Location />} />
              <IconWidget paragraph={container.phone} header="Phone" icon={<Phone />} />
            </Container>
          ))}
        </div> */}
      </div>
      <div className="  rounded-xl mt-5   h-full relative w-full col-span-2">
        <div className=" sticky top-0 h-[30rem]">
          <MapComponent defaultLocation={location} />
        </div>
      </div>
    </>
  );
};

export default MapContainer;
