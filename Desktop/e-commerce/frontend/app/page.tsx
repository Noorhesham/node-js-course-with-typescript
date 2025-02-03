import Image from "next/image";
import HeroSection from "./components/Hero";
import Fetcher from "./components/Fetcher";
import { Suspense } from "react";
import { IProduct } from "@/types";
import ProductCard from "./components/Product";
import { ProductLoader } from "./components/ProductReel";
import MaxWidthWrapper from "./components/defaults/MaxWidthWrapper";
import Filter from "./components/Filters";
import { fetchData } from "./actions/Server";
import GridContainer from "./components/defaults/GridContainer";
import { DataTablePagination } from "./components/AdvancedPagination";

interface PageProps {
  searchParams: {
    category?: string | string[];
    page?: string;
    limit?: string;
  };
}

export default async function Home({ searchParams }: PageProps) {
  const {
    data: { docs: categories },
  } = await fetchData({ resourceName: "categories", tags: ["categories"] });
  const queryParams = new URLSearchParams();

  if (searchParams.category) {
    const categories = Array.isArray(searchParams.category) ? searchParams.category : [searchParams.category];
    categories.forEach((cat) => queryParams.append("category", cat));
  }

  queryParams.set("page", searchParams.page || "1");
  queryParams.set("limit", searchParams.limit || "6");
  console.log(categories);
  return (
    <main>
      <HeroSection />
      <MaxWidthWrapper>
        <GridContainer className=" gap-4" cols={9}>
          <div id={"products"} className="flex flex-col gap-5 col-span-3">
            <h2 className=" text-3xl font-bold">Categories</h2>
            <Filter categories={categories} />
          </div>
          <Suspense
            fallback={Array.from({ length: 3 }, (_, i) => (
              <ProductLoader key={i} />
            ))}
          >
            <Fetcher resourceName="products" tags={["products"]} queryParams={queryParams}>
              {({ data: { docs: products }, totalPages }) => (
                <div className="relative col-span-6 mt-6">
                  <div className="flex items-center w-full">
                    <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 md:gap-y-10 lg:gap-x-8 flex-grow">
                      {products.map((product: IProduct, i: number) => (
                        <ProductCard index={i} key={product._id} product={product} />
                      ))}
                    </div>
                  </div>
                  <DataTablePagination
                    page={searchParams.page ? Number(searchParams.page) : 1}
                    totalPages={totalPages}
                  />
                </div>
              )}
            </Fetcher>
          </Suspense>
        </GridContainer>
      </MaxWidthWrapper>
    </main>
  );
}
