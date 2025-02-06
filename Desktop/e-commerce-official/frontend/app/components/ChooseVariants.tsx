"use client";

import React, { useState } from "react";
import Image from "next/image";
import ImageSlider from "./ImageSlider";
import AddToCart from "./AddToCart";

const ProductVariantSelector = ({ variants = [], availableOptions = {}, product }) => {
  // Initialize selected options from the first variant, if available
  const initialOptions = variants[0]?.options?.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {}) || {};

  const [selectedOptions, setSelectedOptions] = useState(initialOptions);
  const [currentVariant, setCurrentVariant] = useState(variants[0] || null);

  const images = currentVariant?.images || product.images || [];

  const handleOptionChange = (optionName, optionValue) => {
    const newOptions = {
      ...selectedOptions,
      [optionName]: selectedOptions[optionName] === optionValue ? undefined : optionValue,
    };

    const matchingVariant = variants.find(({ options }) =>
      options.every(({ name, value }) => newOptions[name] === value)
    );

    setSelectedOptions(newOptions);
    setCurrentVariant(matchingVariant || null);
  };

  return (
    <div className="space-y-6 flex flex-col lg:flex-row items-center gap-10">
      {/* Product Images */}
      <div className="flex flex-col gap-4 flex-1">
        <div className="h-96 w-96 relative max-w-full">
          <ImageSlider urls={images.map((image) => image.secure_url)} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>
        </div>
      </div>

      {/* Variant Selection */}
      <div className="flex flex-col flex-1">
        <div className="mt-8">
          <h2 className="text-lg font-medium">Options</h2>
          {Object.entries(availableOptions).map(([optionName, values]) => (
            <div key={optionName} className="mt-4">
              <label className="text-sm font-medium capitalize">{optionName}</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {values.map((value) => {
                  const isSelected = selectedOptions[optionName] === value;
                  return (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(optionName, value)}
                      className={`p-1 rounded-full border-2 transition-all ${
                        isSelected ? "border-blue-500" : "border-gray-200 hover:border-gray-400"
                      } ${optionName.toLowerCase() === "color" ? "h-10 w-10" : "h-10 px-4 text-sm min-w-[40px]"}`}
                      title={optionName.toLowerCase() === "color" ? value : ""}
                    >
                      {optionName.toLowerCase() === "color" ? (
                        <div className="w-full h-full rounded-full shadow-sm" style={{ backgroundColor: value }} />
                      ) : (
                        <span className="font-medium">{value}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Information */}
        <div className="mt-8">
          <p className="text-2xl font-bold">${(currentVariant?.price ?? product.price).toFixed(2)}</p>
          {(currentVariant?.compareAtPrice ?? product.compareAtPrice) && (
            <p className="text-gray-500 line-through">
              ${(currentVariant?.compareAtPrice ?? product.compareAtPrice).toFixed(2)}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Stock: {currentVariant?.inventory ?? product.inventory ?? "Out of stock"}
          </p>
        </div>
        <AddToCart inventory={product.inventory} id={product._id} max={currentVariant?.inventory} />
      </div>
    </div>
  );
};

export default ProductVariantSelector;
