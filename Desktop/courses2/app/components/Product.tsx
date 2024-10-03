"use client";
import React, { useEffect, useTransition } from "react";
import { cn, formatPrice } from "@/lib/utils";
import ImageSlider from "./ImageSlider";
import { ProductLoader } from "./ProductReel";

import Link from "next/link";
import { useLocale } from "next-intl";

const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const locale = useLocale();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);
    return () => clearTimeout(timer);
  }, [index]);
  return isVisible ? (
    <Link href={`/course/${product._id}`}>
      <div
        className={`${cn(" opacity-0  h-full relative w-full cursor-pointer group-main ", {
          " opacity-100 animate-in duration-200 fade-in-5 shadow-md  rounded-xl": isVisible,
        })} self-stretch flex flex-col `}
      >
        <ImageSlider
          stock={product.stock}
          productId={product._id}
          urls={product.images.map((image: any) => image.secure_url)}
        />
        <div className=" flex flex-col self-stretch justify-between py-2 px-4 w-full">
          <div className="flex items-start flex-col justify-between">
            <div className=" flex items-start flex-col ">
              <p className=" mt-1 font-semibold text-sm ">category : {product.category.name[locale || "en"]}</p>
            </div>
            <h3 className="font-medium text-base  ">
              {product.name.length > 20 ? product.name.substring(0, 20) + "..." : product.name}
            </h3>{" "}
          </div>
          <p className=" mt-1 font-medium text-sm ">{product.price}$</p>
          <p className=" my-2 font-medium   text-xs ">{product.description}</p>
        </div>
      </div>
    </Link>
  ) : (
    <ProductLoader />
  );
};

export default ProductCard;
