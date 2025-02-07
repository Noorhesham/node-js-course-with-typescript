"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ImageSlider from "./ImageSlider";
import { ProductLoader } from "./ProductLoader";
import { IProduct } from "@/types";
const ProductCard = ({ product, index }: { product: IProduct; index: number }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);
    
    return () => clearTimeout(timer);
  }, [index]);
  return isVisible ? (
    <Link
      className={`${cn(" opacity-0  h-full relative w-full cursor-pointer group-main ", {
        " opacity-100 animate-in duration-200 fade-in-5 shadow-sm rounded-xl": isVisible,
      })} self-stretch flex flex-col `}
      href={`/product/${product._id}`}
    >
      <ImageSlider
        stock={product.inventory}
        productId={product._id}
        urls={product.images.map((image) => image.secure_url)}
      />
      <div className=" flex flex-col self-stretch justify-between py-1 px-2 w-full">
        <h3 className=" mt-4 font-medium text-sm text-gray-700 ">
          {product.name.length > 20 ? product.name.substring(0, 20) + "..." : product.name}
        </h3>
        <div className=" mt-auto">
          <p className=" mt-1 text-sm text-gray-500">{product.category.name}</p>
          <p className=" mt-1 font-medium text-sm text-gray-900">{product.basePrice}</p>
        </div>
      </div>
    </Link>
  ) : (
    <ProductLoader />
  );
};

export default ProductCard;
