import { cn } from "@/lib/utils"; // Assuming you have a utility for conditional classNames
import MotionItem from "./MotionItem";
import Heading from "./Heading";

interface FeatureProps {
  title: string;
  text: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
}
export const Feature: React.FC<FeatureProps> = ({ title, text, Icon, iconColor }) => {
  return (
    <MotionItem className="mt-5 bg-gray-200 rounded-xl dark:bg-gray-800 flex flex-row-reverse items-start gap-3 py-3 px-6">
      <Icon className={cn("w-10 h-10 neon-effect", iconColor)} style={{ filter: "drop-shadow(0 0 5px)" }} />
      <div className="flex flex-col items-end gap-2">
       <Heading title={title}/>
        <p className="text-base">{text}</p>
      </div>
    </MotionItem>
  );
};
