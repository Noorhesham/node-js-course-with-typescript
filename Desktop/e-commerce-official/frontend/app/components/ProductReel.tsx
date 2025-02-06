import React from "react";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import { Suspense } from "react";
import Fetcher from "./Fetcher";
import { ProductLoader } from "./ProductLoader";
import ProductCard from "./Product";
import { IProduct } from "@/types";
import GridContainer from "./defaults/GridContainer";

const ProductReel = ({ queryParams, heading }: { queryParams: URLSearchParams; heading?: string }) => {
  return (
    <MaxWidthWrapper className="flex col-span-full flex-col items-start gap-5">
      <h2 className=" text-white font-bold text-4xl">{heading}</h2>
      <Suspense
        fallback={
          <GridContainer className=" w-full col-span-full" cols={4}>
            {Array.from({ length: 4 }, (_, i) => (
              <ProductLoader key={i} />
            ))}
          </GridContainer>
        }
      >
        <Fetcher resourceName="products" tags={["products"]} queryParams={queryParams}>
          {({ data: { docs: products }, totalPages }) => (
            <div className="relative col-span-6 mt-6">
              <div className="flex items-center w-full">
                <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8 flex-grow">
                  {products.map((product: IProduct, i: number) => (
                    <ProductCard index={i} key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Fetcher>
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default ProductReel;
