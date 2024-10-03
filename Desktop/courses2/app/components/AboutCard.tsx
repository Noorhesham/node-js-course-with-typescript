import Link from "next/link";
import React from "react";

const AboutCard = ({
  icon: Icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) => (
  <div className=" px-4 py-6 rounded-2xl gap-3 flex flex-col items-start text-gray-900 bg-gray-100 border border-input">
    <div className=" p-2 w-fit rounded-xl border border-input">
      <Icon size={24} />
    </div>
    <div className=" mt-6">
      <h3 className=" font-bold text-black text-lg">{title}</h3>
      <p className="  text-muted-foreground mt-2">{description}</p>
      {link && (
        <Link href={link} className="  underline mt-3">
          {link}
        </Link>
      )}
    </div>
  </div>
);
export default AboutCard;
