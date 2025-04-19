"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SelectTrigger, SelectContent, Select, SelectItem, SelectValue } from "../../components/ui/select";
import { Label } from "../../components/ui/label";

interface ProductOptionsProps {
  sizes: string[];
  weights: string[];
  rtl?: boolean;
  className?: string;
}

/**
 * ProductOptions - Component for size and weight selection
 * Updates URL with selected options and maintains global state
 *
 * @param sizes - Available size options
 * @param weights - Available weight options
 * @param rtl - Whether to use RTL layout (for Arabic)
 * @param className - Additional classes
 */
const ProductOptions = ({ sizes, weights, rtl = true, className }: ProductOptionsProps) => {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];

  // Initialize state from URL or default to first option
  const [selectedSize, setSelectedSize] = useState<string>(searchParams.get("size") || sizes[0]);
  const [selectedWeight, setSelectedWeight] = useState<string>(searchParams.get("weight") || weights[0]);

  // Update URL when selections change
  useEffect(() => {
    //make new URLSearchParams object from the exisiting searchparams in the url
    const params = new URLSearchParams(searchParams.toString());
    params.set("size", selectedSize);
    params.set("weight", selectedWeight);

    // Update URL without refreshing the page
    navigate(`?${params.toString()}`, { replace: true });
  }, [selectedSize, selectedWeight, navigate, searchParams]);

  return (
    <div className={className} dir={rtl ? "rtl" : "ltr"}>
      {/* Size selector */}
      <div className="mb-4">
        {/* 
        <Label htmlFor="size-select" className="block mb-2 text-sm font-medium">
          {rtl ? "اختر المقاس" : "Select Size"}
        </Label>
        */}
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger id="size-select" className="w-full flex flex-row-reverse items-center justify-between">
            <SelectValue className="placeholder:text-right" placeholder={rtl ? "اختر المقاس" : "Select size"} />
          </SelectTrigger>
          <SelectContent>
            {sizes.map((size) => (
              <SelectItem className="text-right" key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Weight selector */}
      <div className="mb-4">
        {/* 
        <Label htmlFor="weight-select" className="block mb-2 text-sm font-medium">
          {rtl ? "اختر الوزن" : "Select Weight"}
        </Label>
        */}
        <Select value={selectedWeight} onValueChange={setSelectedWeight}>
          <SelectTrigger id="weight-select" className="w-full flex flex-row-reverse items-center justify-between">
            <SelectValue className="placeholder:text-right" placeholder={rtl ? "اختر الوزن" : "Select weight"} />
          </SelectTrigger>
          <SelectContent>
            {weights.map((weight) => (
              <SelectItem className="text-right" key={weight} value={weight}>
                {weight}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductOptions;
