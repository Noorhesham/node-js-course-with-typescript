import React from "react";
import MaxWidthWrapper from "./MaxwidthWrapper";

const SimilarProducts = () => {
  return (
    <MaxWidthWrapper noPaddingX className="flex flex-col gap-3">
      <div className="flex flex-col gap-5 lg:mb-10">
        <h2 className=" font-semibold  text-3xl"> استكشف المزيد من عمليات البحث ذات الصلة</h2>
        <div className="  flex-wrap lg:flex-nowrap flex gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="   bg-gray-200 rounded-full px-4 py-1">
              tag1
            </div>
          ))}
        </div>
      </div>
      <div className=" grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          "/Frame 1000005447 (1).png",
          "/Frame 1000005447 (2).png",
          "/Frame 1000005447 (4).png",
          "/Frame 1000005447 (5).png",
          "/Frame 1000005447 (6).png",
          "/Frame 1000005447 (7).png",
          "/Frame 1000005447 (9).png",
          "/Frame 1000005447 (8).png",
        ].map((src, i) => (
          <div key={i} className="  flex-col flex items-start justify-center rounded-lg">
            <div className=" relative overflow-hidden rounded-2xl w-full h-80 ">
              <img src={src} alt="" className="w-full h-full absolute object-cover inset-0" />
            </div>
            <p className="text-gray-700 text-lg font-bold">منتج مشابه {i + 1}</p>
            <span className=" font-semibold">100$</span>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default SimilarProducts;
