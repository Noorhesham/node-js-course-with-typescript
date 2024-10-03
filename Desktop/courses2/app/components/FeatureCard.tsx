import { FC } from "react";
import { IconType } from "react-icons";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: any;
}

const FeatureCard: FC<FeatureCardProps> = ({ title, description, Icon }) => {
  return (
    <div className="text-muted-foreground border px-4 py-2  flex items-center gap-4">
      <Icon className="w-8 text-sky-400 h-8" />
      <div className=" text-gray-800">
        <h2 className=" font-semibold text-black text-lg">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
