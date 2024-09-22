import React from "react";

interface HeadingProps {
  title: string;
  size?: string; // Tailwind text size classes like "text-4xl"
  color?: string; // Tailwind color classes like "text-red-500"
  align?: string; // Tailwind text alignment classes like "text-center"
  additionalClasses?: string; // Any additional Tailwind classes
}

const Heading: React.FC<HeadingProps> = ({
  title,
  size = "text-2xl", // Default text size
  color = "", // Default text color
  align = "text-right", // Default text alignment
  additionalClasses = "", // Default to no additional classes
}) => {
  const baseClasses = "font-semibold";
  const sizeClass = size;
  const colorClass = color;
  const alignClass = align;

  return (
    <h1 className={`${baseClasses} font-semibold ${sizeClass} ${colorClass} ${alignClass} ${additionalClasses}`}>
      {title}
    </h1>
  );
};

export default Heading;
