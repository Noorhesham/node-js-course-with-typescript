import React from "react";
import ZoomImage from "./ZoomImage";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import MotionContainer from "./MotionContainer";
import MotionItem from "./MotionItem";

const ImageGrid = ({ images }: { images: string[] }) => {
  return (
    <MotionContainer className=" max-w-full">
      <MaxWidthWrapper>
        <h1 className=" text-5xl font-bold">أبرز اللحظات </h1>
        <section className="grid grid-cols-4 grid-rows-2 hover:opacity-90 duration-100 gap-y-2 mt-8 gap-x-2">
          {images.map((src, index) => (
            <ZoomImage
              key={index}
              src={src}
              btn={
                <div className="relative    first:row-span-2  first:col-span-2 cursor-pointer hover:opacity-90 duration-100 w-full col-span-2 lg:col-span-1 row-span-1">
                  <Image src={src} alt="image" width={500} height={250} className="object-cover w-full h-full" />
                </div>
              }
            />
          ))}
        </section>
      </MaxWidthWrapper>
    </MotionContainer>
  );
};

export default ImageGrid;
