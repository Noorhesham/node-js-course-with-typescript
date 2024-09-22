"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FormSelect from "./inputsForm/FormSelect";
const options = [
  { label: "Dentist", value: "Dentist" },
  { label: "Cardiologist", value: "Cardiologist" },
  { label: "Gastroenterologist", value: "Gastroenterologist" },
];
const Search = () => {
  const [query, setQuery] = React.useState("");
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const handleSearch = (val: string) => {
    setQuery(val);
    router.push(`?q=${val}`);
  };
  useEffect(() => {
    setTimeout(() => {
      handleSearch(search);
    }, 500);
  }, [search]);
  const params = useSearchParams();
  const searchParams = new URLSearchParams(params);
  return (
    <div className=" flex  my-5 items-center gap-2">
      <div
        className={`flex relative w-full   md:w-[60%] bg-gray-100 hover:bg-gray-200 duration-200 text-lg md:text-3xl md:py-2 px-4 rounded-full m-auto items-center`}
      >
        <button
          className={`transition-all p-1 duration-100 outline-none   justify-end 
      `}
        >
          <IoIosSearch />
        </button>
        <input
          autoFocus={true}
          placeholder={`ابحث عن الدكتور`}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className={` placeholder:text-gray-400 bg-transparent w-[100%]  ml-1 outline-none text-sm h-[2rem] `}
          type="text"
        />
        <button
          className="p-1"
          onClick={() => {
            setSearch("");
          }}
        >
          <Cross2Icon />
        </button>
      </div>
      <div className=" flex  items-center gap-4">
        <Select
          onValueChange={(val) => {
            setTimeout(() => {
              if (val === "") return;
              searchParams.append("filter", JSON.stringify(val));
              router.push(`/?${searchParams.toString()}`, { scroll: false });
            }, 500);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر تخصص" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>التخصص</SelectLabel>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(val) => {
            setTimeout(() => {
              if (val === "") return;
              searchParams.append("filter", JSON.stringify(val));
              router.push(`/?${searchParams.toString()}`, { scroll: false });
            }, 500);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر تخصص" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>التخصص</SelectLabel>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Search;
