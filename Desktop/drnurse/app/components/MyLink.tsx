import Link from "next/link";
import React from "react";

const MyLink = ({ text, link }: { text: string; link: string }) => {
  return (
    <Link href={link} className=" my-2  ml-auto mt-auto text-main2/95 font-semibold text-xs hover:underline duration-150">
      {text}
    </Link>
  );
};

export default MyLink;
