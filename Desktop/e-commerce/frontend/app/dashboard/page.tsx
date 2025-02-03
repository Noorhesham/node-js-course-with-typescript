import Fetcher from "../components/Fetcher";
import { IProduct } from "@/types";
import { Suspense } from "react";
import Image from "next/image";
import GridContainer from "../components/defaults/GridContainer";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <Fetcher
          resourceName="products"
          cache="force-cache"
          // queryParams={new URLSearchParams({ limit: "5" })}
          tags={["products"]}
        >
          {({ data: { docs }, totalPages }: { data: { docs: IProduct[] }, totalPages: number }) => (
            <GridContainer cols={3}>
              {docs.map((product) => (
                <div key={product._id}>
                  <div className=" w-52 relative h-52">
                    <Image src={product?.images[0]?.secure_url} fill alt={product.name} />
                  </div>
                  <h2>{product.name}</h2>
                  {product.variants.map((variant) => (
                    <div key={variant._id}>
                      <div className=" w-52 relative h-52">
                        {variant?.images[0]?.secure_url && (
                          <Image src={variant?.images[0]?.secure_url} fill alt={product.name} />
                        )}
                      </div>
                      <h3>{variant.name}</h3>
                      <p>{variant.price}</p>
                    </div>
                  ))}
                </div>
              ))}
            </GridContainer>
          )}
        </Fetcher>
      </Suspense>
    </div>
  );
}
