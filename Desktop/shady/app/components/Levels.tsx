import { BASE_URL } from "@/lib/QueryFunctions";
import Image from "next/image";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import SwiperCards from "./SwiperCards";
import MotionContainer from "./MotionContainer";
import MotionItem from "./MotionItem";
import Link from "next/link";

const Levels = async () => {
  const data = await fetch(`${BASE_URL}levels`).then((res) => res.json());
  const levels = data.data.levels;

  return (
    <MaxWidthWrapper>
      <MotionContainer className=" hidden lg:grid  lg:grid-cols-3 gap-8">
        {levels.reverse().map((level: { name: string; id: string; cover: string }) => (
          <MotionItem key={level.id}>
            <Link href={`/levels/${level.id}`}>
              <h1>{level.name}</h1>
              <div className=" w-full relative h-80">
                <Image src={level.cover} alt={level.name} fill className=" object-contain rounded-2xl" />
              </div>
            </Link>
          </MotionItem>
        ))}
      </MotionContainer>
      <div className="  direction-reverse lg:hidden block">
        <SwiperCards
          slidesPerView={1.5}
          samePhone
          items={levels.reverse().map((level: any) => ({
            src: level.cover,
          }))}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default Levels;
