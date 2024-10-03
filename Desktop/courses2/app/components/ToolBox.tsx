"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
// import { getCaategoriesCache, getEntities } from "../actions/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
// import { Button } from "@/components/ui/button";
// export const useGetCategories = () => {
//   const locale = useLocale();
//   const { data, isLoading } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => await getEntities("Category", 1, {}, false, locale),
//   });
//   return { data, isLoading };
// };
const ToolBox = () => {
  // const { data, isLoading } = useGetCategories();
  // console.log(data);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isChosen = searchParams.get("category");
  return (
    <div className="flex items-center justify-between">
      <div className=" flex justify-center items-center gap-5 pb-10 pt-5">
        {data?.data?.data.map((item: any) => (
          <p
            className={` font-semibold text-lg hover:underline duration-150 cursor-pointer ${
              isChosen === item._id && "text-blue-600 underline"
            }`}
            onClick={() => {
              const params = new URLSearchParams(window.location.category);
              params.set("category", item._id);
              router.push(`?${params.toString()}`, { scroll: false });
            }}
            key={item._id}
          >
            {item.name}
          </p>
        ))}
        <Button onClick={() => router.push("/", { scroll: false })} variant="ghost">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ToolBox;
