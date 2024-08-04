"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const PRICE_FILTERS = [
  { value: [0, 10000], label: "All Price", isCustom: false },
  { value: [1, 200], label: "Under 20$", isCustom: false },
  { value: [25, 100], label: "25$ to 100$", isCustom: false },
  { value: [100, 300], label: "100$ to 300$", isCustom: false },
  { value: [300, 500], label: "300$ to 500$", isCustom: false },
  { value: [500, 1000], label: "500$ to 1000$", isCustom: false },
  { value: [1000, 2000], label: "1000$ to 2000$", isCustom: false },
  { isCustom: true, value: [0, 10000] },
];
const DEFAULT_RANGE = [0, 10000];

const PriceFilter = () => {
  const [priceFilter, setPriceFilter] = useState({
    range: DEFAULT_RANGE,
    isCustom: false,
  });
  const searchParams = useSearchParams();
  const minPrice = Number(searchParams.get("minPrice"));
  const maxPrice = Number(searchParams.get("maxPrice"));
  const custom =searchParams.get("custom")==="true"?true:false;
  useEffect(() => {
    if (minPrice && maxPrice) {
      setPriceFilter({
        range: [Number(minPrice), Number(maxPrice)],
        isCustom: custom || false,
      });
    }
  }, [minPrice, maxPrice, custom]);
  const { replace } = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    ["minPrice", "maxPrice", "custom"].forEach((key) => url.searchParams.delete(key));
    url.searchParams.append("minPrice", priceFilter.range[0].toString());
    url.searchParams.append("maxPrice", priceFilter.range[1].toString());
    url.searchParams.append("custom", priceFilter.isCustom.toString());
    replace(url.toString(), { scroll: false });
  }, [priceFilter, replace]);
  const handlePriceChange = ({ range, isCustom }: any) => setPriceFilter({ range, isCustom });

  return (
    <ul className="space-y-4 border-b px-5 border-gray-200 pb-6 text-sm font-medium text-gray-900">
      <li className="flex items-center   flex-col gap-4">
        <div className="self-start flex items-center gap-2 mr-auto">
          {" "}
          <input
            type="radio"
            id={"price-custom"}
            checked={priceFilter?.isCustom}
            onChange={() => setPriceFilter({ isCustom: true, range: [0, 1000] })}
          />
          <label
            htmlFor={"price-custom"}
            className="text-sm  mr-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Price Range
          </label>
        </div>

        <Slider
          defaultValue={DEFAULT_RANGE}
          min={DEFAULT_RANGE[0]}
          max={DEFAULT_RANGE[1]}
          step={20}
          value={priceFilter?.isCustom ? priceFilter?.range : DEFAULT_RANGE}
          onValueChange={(range) => {
            const [newMin, newMax] = range;
            console.log({ newMin, newMax });
            handlePriceChange({ range: [newMin, newMax], isCustom: true, debounce: true });
          }}
          disabled={!priceFilter?.isCustom}
          className={cn("w-full", !priceFilter?.isCustom && " opacity-50")}
        />
        {priceFilter && (
          <div className="flex self-start justify-between">
            <div className="flex w-fit gap-5   items-center">
              <Input
                onChange={(e) => {
                  priceFilter?.isCustom &&
                    setPriceFilter((prev) => ({ isCustom: true, range: [Number(e.target.value), prev.range[1]] }));
                }}
                defaultValue={priceFilter?.isCustom ? priceFilter?.range[0].toFixed(0) : minPrice?.toFixed(0)}
                className=" max-w-32"
              />
              <Input
                onChange={(e) => {
                  priceFilter?.isCustom &&
                    setPriceFilter((prev) => ({ isCustom: true, range: [prev.range[0], Number(e.target.value)] }));
                }}
                defaultValue={priceFilter?.isCustom ? priceFilter?.range[1].toFixed(0) : maxPrice?.toFixed(0)}
                className=" max-w-32"
              />
            </div>
          </div>
        )}
      </li>
      {PRICE_FILTERS.filter((p) => !p.isCustom).map((filter: any, i: number) => (
        <li
          key={i}
          className={`${priceFilter === filter.value ? "text-gray-500" : "text-gray-900"} flex items-center gap-2`}
        >
          <input
            type="radio"
            id={filter.value}
            checked={
              priceFilter?.range?.[0] === filter.value?.[0] &&
              priceFilter?.range?.[1] === filter.value?.[1] &&
              !priceFilter?.isCustom
            }
            onChange={() => {
              handlePriceChange({
                range: filter.value,
                isCustom: filter.isCustom,
                debounce: false,
              });
            }}
          />
          <label
            htmlFor={filter.value}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {filter.label}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default PriceFilter;
