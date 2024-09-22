import React from "react";

interface Head1Props {
  title: string;
  size?: string;
  thickness?: string;
  color?: string;
  className?: string;
}

const Head1: React.FC<Head1Props> = ({
  title,
  size = "text-4xl",
  thickness = "font-bold",
  color = "text-main",
  className = "",
}) => {
  return <h1 className={`${size} ${thickness} ${color} ${className}`}>{title}</h1>;
};

export default Head1;
