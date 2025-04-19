import React from "react";

const Price = ({
  price,
  originalPrice,
  discount,
  rtl,
}: {
  price: number;
  originalPrice?: number;
  discount?: number;
  rtl?: boolean;
}) => {
  return (
    <div className="flex ml-auto items-center gap-3">
      <span className="text-2xl text-nowrap text-[#414141] flex items-start ">
        ₪ {price.toFixed(2)}
        {originalPrice && (
          <span className=" text-red-500 p-2 text-xs line-through">₪{originalPrice.toFixed(2)}</span>
        )}
      </span>

      {discount && (
        <span className=" bg-green-300 text-black rounded-full  px-2 py-1  font-[600] text-xs">
          {discount}% {rtl ? "خصم" : "off"}
        </span>
      )}
    </div>
  );
};

export default Price;
