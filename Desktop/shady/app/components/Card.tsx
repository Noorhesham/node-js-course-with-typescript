import React from "react";
import { FaBook, FaChalkboardTeacher, FaMedal, FaClipboardList } from "react-icons/fa";
import MotionItem from "./MotionItem";

interface NeonCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
}

const NeonCard: React.FC<NeonCardProps> = ({ title, description, icon, iconColor }) => {
  return (
    <MotionItem className="flex flex-col text-right items-end gap-2 py-4 px-6 bg-gray-200 dark:bg-gray-800  rounded-xl shadow-lg relative">
      <div className={`text-4xl ${iconColor} neon-icon mb-2`}>{icon}</div>
      <h1 className="text-xl font-bold ">{title}</h1>
      <p className=" text-sm leading-6">{description}</p>
    </MotionItem>
  );
};

export default NeonCard;
