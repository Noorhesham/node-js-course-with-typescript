import React, { ReactNode } from "react";
import { FaSpinner } from "react-icons/fa";

interface ButtonRoundedProps {
  text?: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  notbtn?: boolean;
  disabled?: boolean;
}

const ButtonRounded: React.FC<ButtonRoundedProps> = ({
  text,
  icon,
  className = "",
  onClick,
  notbtn = false,
  disabled,
}) => {
  const baseClasses =
    "px-6 py-2 text-[#1d61e7] bg-[#ebf2ff] text-center hover:text-white text-center flex items-center text-sm gap-2 justify-between rounded-lg  font-bold  tracking-widest uppercase transform hover:scale-105 hover:bg-blue-500 transition-colors duration-200";

  if (notbtn) {
    return (
      <div onClick={onClick} className={`${baseClasses} ${className}`}>
    {disabled?<FaSpinner className="animate-spin mx-auto text-2xl"/>:text}
        {icon}
      </div>
    );
  }

  return (
    <button disabled={disabled} onClick={onClick} className={`${baseClasses} ${className}`}>
      {disabled?<FaSpinner className="animate-spin mx-auto text-2xl"/>:text}
      {icon}
    </button>
  );
};

export default ButtonRounded;
