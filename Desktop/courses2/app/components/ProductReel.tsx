import React, { Suspense } from "react";
import ProductReelFetch from "./ProductReelFetch";
import { Skeleton } from "@/components/ui/skeleton";
interface ProductReelProps {
  title: string;
  subTitle?: string;
  href?: string;
  className?: string;
  onlyPrice?: boolean;
}
export interface ProductPropsServerProps {
  filters?: any;
  page?: number;
  pageSize?: number;
  paginate?: boolean;
  slider?: boolean;
  sort?: string | string[] | undefined;
  user: any;
}
const ProductReel = async (props: ProductReelProps & ProductPropsServerProps) => {
  const { title, subTitle, href, className, sort, slider, onlyPrice, user } = props;
  return (
    <section className={className || " py-12 mt-5 "}>
      <div className="lg:flex lg:items-center lg:justify-between mb-4">
        <div className=" max-w-2xl px-4 lg:max-w-5xl  text-nowrap lg:px-0 ">
          {title ? <h1 className=" text-2xl font-bold text-gray-100 sm:text-3xl">{title}</h1> : ""}
          {subTitle ? <p className=" mt-2 text-sm text-muted-foreground">{subTitle}</p> : ""}
        </div>
      </div>
      <div className="relative ">
        <div className=" mt-6  flex items-center w-full">
          <div className="w-full  grid  grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 md:gap-y-10 lg:gap-x-8 flex-grow">
            <Suspense
              fallback={Array.from({ length: 4 }, (_, i) => (
                <ProductLoader key={i} />
              ))}
            >
              <ProductReelFetch />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};
export const ProductLoader = () => {
  return (
    <div className=" flex flex-col w-full">
      <div className=" relative bg-zinc-100 aspect-video w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};
export default ProductReel;
