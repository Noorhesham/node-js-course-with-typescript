"use client";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import React from "react";

const TypeWriter = ({ words }: { words: string[] }) => {
  const [text] = useTypewriter({
    words,
    loop: true,
  });
  return (
    <div className="flex text-center w-full items-start my-4 ">
      <h2 className="  capitalize tracking-widest text-5xl lg:text-6xl w-full  text-center  text-white font-extrabold ">
        I am <span>{text}</span>
        <span className="text-pink-500">
          <Cursor />
        </span>
      </h2>
    </div>
  );
};

export default TypeWriter;
