// components/CourseCard.tsx
import Image from "next/image";
import { FC } from "react";
import Paragraph from "./defaults/Paragraph";

interface CourseCardProps {
  imageSrc: string;
  description: string;
}

const CourseCard: FC<CourseCardProps> = ({ imageSrc, description }) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="w-80 h-80 relative">
        <Image src={imageSrc} className="object-cover" alt="course image" fill />
      </div>
      <Paragraph className="text-white text-lg" description={description} />
    </div>
  );
};

export default CourseCard;
