import Image from "next/image";
import { ReactNode } from "react";
import MotionItem from "./MotionItem";

const Card = ({
  img,
  text,
  children,
  width,
  className,
  price,
}: {
  img: string;
  text: string;
  children?: ReactNode;
  polygon?: boolean;
  width?: string;
  className?: string;
  price?: string;
}) => {
  return (
    <MotionItem className="hover:shadow-md w-full sm:w-auto  self-center flex-grow cursor-pointer duration-150 bg-white flex flex-col justify-center items-center relative rounded-2xl max-w-72 overflow-hidden border border-gray-400">
      <div className="flex flex-col w-full items-center">
        <div className={` ${width ? width : "aspect-[590/400]"} h-auto w-full relative `}>
          <Image src={img} className="object-cover object-center" fill alt="logo" />
        </div>
        <div className="md:px-8 px-4 md:py-4 py-2 ">
          <p className="uppercase text-xs mb-2 text-gray-900 font-semibold">{text} </p>
          {price && <p className="text-[#CA0096] uppercase font-medium">{price}</p>}
          {children}
        </div>
      </div>
    </MotionItem>
  );
};

export default Card;
