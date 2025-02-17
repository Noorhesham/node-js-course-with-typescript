import React from "react";
import { motion } from "framer-motion";

interface ItemCardGridProps {
  item: any;
  title: string;
  desc: string;
  image: string;
  reverse?: boolean; // Optional prop to reverse layout
}

const ItemCardGrid: React.FC<ItemCardGridProps> = ({ item, title, desc, image, reverse = false }) => {
  return (
    <motion.div variants={item} className={`flex gap-8 items-start ${reverse ? "flex-row-reverse" : ""}`}>
      <div className="w-[400px] h-[200px] rounded-2xl overflow-hidden">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="flex-1">
        <h2 className="text-4xl text-white mb-4 special-font">{title}</h2>
        <p className="text-white/80 leading-relaxed mb-4">{desc}</p>
      </div>
    </motion.div>
  );
};

export default ItemCardGrid;
