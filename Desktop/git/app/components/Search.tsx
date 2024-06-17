import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { MicIcon, MicOff } from "lucide-react";

const Search = ({ search, SetSearch }: { SetSearch: any; search: string }) => {
  const [query, SetQuery] = useState<string>("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const handleVoiceSearch = () => {
    console.log(transcript);
    SpeechRecognition.startListening({ language: "en" });
    console.log(transcript);
    SetQuery(transcript);
    SetSearch(transcript);
  };
  return (
    <div
      className={`flex relative w-full md:w-[60%] bg-gray-100 hover:bg-gray-200 duration-200 text-lg md:text-3xl py-2 px-4 rounded-full m-auto items-center`}
    >
      <button
        onClick={(e: any) => SetSearch(query)}
        className={`transition-all p-1 duration-100 outline-none   justify-end 
      `}
      >
        <IoIosSearch />
      </button>
      <input
        placeholder={`Search our products ..`}
        onChange={(e) => SetQuery(e.target.value)}
        value={query}
        className={` placeholder:text-gray-400 bg-transparent w-[100%]  ml-1 outline-none text-sm md:text-xl h-[2rem] `}
        type="text"
      />
      <button
        className="p-1"
        onClick={() => {
          SetQuery("");
          SetSearch("");
        }}
      >
        <RxCross2 />
      </button>
      <button className=" p-2 rounded-full hover:bg-gray-300 duration-300 ml-2">
        {listening ? (
          <MicOff onClick={SpeechRecognition.stopListening} className=" text-green-400" />
        ) : (
          <MicIcon onClick={handleVoiceSearch} className=" text-red-400" />
        )}
      </button>
    </div>
  );
};

export default Search;
