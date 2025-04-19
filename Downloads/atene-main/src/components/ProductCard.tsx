import { ProductSectionProps } from "@/types";
import { Heart, Share2Icon } from "lucide-react";
import React from "react";
import { FaCommentAlt } from "react-icons/fa";
import Starrating from "./reviews/Rate";

const ProductCard = ({ product }: { product: ProductSectionProps }) => {
  console.log(product);
  return (
    <div className="relative h-full">
      <div className=" w-full    grid grid-cols-2 relative">
        <div className="flex flex-col gap-4 absolute top-4 left-4">
          <div className=" p-2 bg-white">
            <Heart />
          </div>{" "}
          <div className=" p-2 bg-white">
            <Share2Icon />
          </div>
        </div>
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`Product ${index + 1}`}
            className=" h-32 w-full object-top aspect-square  object-cover"
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-gray-700 text-2xl font-bold">اسم المنتج</h2>
        <Starrating change={false} MaxRating={5} defaultRating={2} />
      </div>
      <p>
        لوريم إيبسوم ألم سيت أميت، كونسيكتيور أديبي لوريم إيبسوم ألم سيت أميت، كونسيكتيور أديبي لوريم إيبسوم لوريم
        إيبسوم ألم سيت أميت،
      </p>
      <div className="flex items-center justify-between">
        <span className=" text-2xl text-gray-700 my-2">59₪</span>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1 justify-between">
            217
            <Heart className=" w-4 h-4" />
          </span>
          <span className="flex items-center gap-1 justify-between">
            45
            <FaCommentAlt className=" w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
