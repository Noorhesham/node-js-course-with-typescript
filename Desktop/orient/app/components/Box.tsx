"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Box = ({ text, options, filter }: { text: string; options?: any[]; filter: string }) => {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<string[] | undefined>();
  const windowFilters = searchParams.get(filter);
  const router = useRouter();
  useEffect(() => {
    if (windowFilters && filters?.filter((_, i) => window.location.search.split(",")?.[i])) setFilters(filters);
    router.push(`?${filter}=${filters?.join(",")}`, { scroll: false });
  }, [windowFilters, filters, router, filter]);
  const handleFilter = (filter: string) => {
    setFilters((prev) => (!prev?.includes(filter) ? [...(prev || []), filter] : prev.filter((v) => v !== filter)));
  };
  return (
    <div className="flex px-5 py-10  bg-white uppercase flex-col ">
      <h2 className=" text-2xl font-medium mb-5">{text}</h2>
      <ul className=" pb-3 border-b border-b-gray-400">
        {filter !== "colors" &&
          filter !== "tags" &&
          options?.map((option, i) => (
            <li onClick={() => handleFilter(option)} key={i} className="flex items-center gap-2">
              <input type="radio" name="" id="" />
              <p>{option}</p>
            </li>
          ))}
        {filter === "colors" && (
          <div className=" grid grid-cols-8 gap-2">
            {options?.map((option, i) => (
              <li
                style={{ backgroundColor: option }}
                onClick={() => handleFilter(option)}
                key={i}
                className={` shadow-sm  aspect-square rounded-md w-full h-full`}
              ></li>
            ))}
          </div>
        )}
        {filter === "tags" && (
          <div className=" flex flex-wrap gap-2">
            {options?.map((option, i) => (
              <Button onClick={() => handleFilter(option)} key={i} className={filters?.includes(option) ? "bg-yellow-100 text-main  border-main border" : ""} variant="outline">
                {option}
              </Button>
            ))}
          </div>
        )}
      </ul>
    </div>
  );
};

export default Box;
