"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageSlider from "./ImageSlider";

const ProductVariantSelector = ({ variants, availableOptions, product }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentVariant, setCurrentVariant] = useState(variants[0]);

  useEffect(() => {
    if (variants[0]) {
      const initialOptions = {};
      variants[0].options.forEach((option) => {
        initialOptions[option.name] = option.value;
      });
      setSelectedOptions(initialOptions);
    }
  }, [variants]);

  const images = currentVariant?.images || product.images;

  const handleOptionChange = (optionName, optionValue) => {
    const newOptions = { ...selectedOptions, [optionName]: optionValue };
    setSelectedOptions(newOptions);

    const matchingVariant = variants.find((variant) =>
      variant.options.every((opt) => newOptions[opt.name] === opt.value)
    );

    if (matchingVariant) {
      setCurrentVariant(matchingVariant);
    }
  };

  return (
    <div className="space-y-6 flex items-center gap-10">
      <div className="flex flex-col  gap-4">
        <div className=" h-96 w-96  relative max-w-full">
          <ImageSlider urls={images.map((image) => image.secure_url)} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-4">{product.description}</p>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mt-8">
          <h2 className="text-lg font-medium">Options</h2>
          {Object.entries(availableOptions).map(([optionName, values]) => (
            <div key={optionName} className="mt-4">
              <label className="text-sm font-medium">{optionName}</label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {values.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleOptionChange(optionName, value)}
                    className={`px-4 py-2 text-sm border rounded-md ${
                      selectedOptions[optionName] === value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-2xl font-bold">${currentVariant?.price.toFixed(2)}</p>
          {currentVariant?.compareAtPrice && (
            <p className="text-gray-500 line-through">${currentVariant.compareAtPrice.toFixed(2)}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">Stock: {currentVariant?.inventory || "Out of stock"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductVariantSelector;
