"use client";
import React, { useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import GridContainer from "./GridContainer";
import FlexWrapper from "./FlexWrapper";

const Search = () => {
  const [search, setSearch] = React.useState<string>("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  //TODO: i write more than 4 words i will make a debounced request to the server
  useEffect(() => {
    if (search.length > 4) {
      //TODO: i will make a debounced request to the server
      startTransition(async () => {});
    }
  }, [search]);
  return (
    <div className=" w-full md:w-[80%] flex flex-col gap-4  ">
      <div className="bg-white flex-col md:flex-row  py-3 px-6 rounded-xl flex items-center w-full ">
        <div className=" w-full  px-6  py-3 flex items-center gap-2 border-b border-input">
          <SearchIcon />
          <input
            onChange={(e) => setSearch(e.target.value)}
            className=" outline-none"
            type="text"
            placeholder="JOB TITLE OR KEYWORD"
          />
        </div>
        <Button >SEARCH MY JOB</Button>
      </div>
      <FlexWrapper className=" px-3 w-full items-center gap-3">
        <h3 className=" font-light text-nowrap text-gray-50">POPULAR SEARCH: </h3>
        <GridContainer className="  gap-3 items-center mt-1" cols={4}>
          <div className=" py-1.5  text-white rounded-full border border-white text-center">DOCTORS</div>
          <div className=" py-1.5  text-white rounded-full border border-white text-center">DOCTORS</div>
          <div className=" py-1.5  text-white rounded-full border border-white text-center">DOCTORS</div>
          <div className=" py-1.5  text-white rounded-full border border-white text-center">DOCTORS</div>
        </GridContainer>
      </FlexWrapper>
    </div>
  );
};

export default Search;
