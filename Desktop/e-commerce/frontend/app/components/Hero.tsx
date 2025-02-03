import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 relative">
      {/* Top Navigation */}

      {/* Hero Content */}
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-4 left-16">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
            <div className="w-full h-full relative">
              <span className="absolute bottom-2 left-2 text-xs">Why shop on Rivly?</span>
            </div>
          </div>
        </div>
        <div className="absolute -top-4 right-24">
          <div className="bg-gradient-to-br from-cyan-200 to-cyan-100 px-4 py-2 rounded-full text-sm">
            200K+ customers
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-8 left-8 w-8 h-8 bg-purple-200 rounded-full opacity-20"></div>
          <div className="absolute top-20 right-32 w-8 h-8 bg-purple-200 rounded-full opacity-20"></div>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 max-w-3xl leading-tight">
            Shop everything you need
            <br />
            online from the US
            <br />
            businesses <span className="text-cyan-400">you</span> <span className="text-indigo-600">love</span>
          </h1>
          <p className="text-gray-400 mb-6 text-sm">And for a limited time only...</p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors mb-6 font-medium">
            Join the Rivly United for FREE →
          </button>
          <Link href="/products" className="text-gray-600 underline text-sm">
            Shop all products
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Reviews Card */}
          <div className="col-span-3 bg-gradient-to-br from-indigo-100 to-purple-100 p-8 rounded-3xl">
            <div className="flex gap-1 mb-6 text-lg text-yellow-400">
              {"★".repeat(4)}
              {"☆".repeat(1)}
            </div>
            <div className="text-4xl font-bold mb-3">+15K</div>
            <div className="text-lg mb-4">Product Reviews</div>
            <div className="text-gray-600">Real identity-verified reviews you can trust</div>
          </div>

          {/* Quality Products Card */}
          <div className="col-span-3 bg-gradient-to-br from-purple-200 to-purple-300 p-8 rounded-3xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-xl font-medium">Quality products from local businesses</div>
            </div>
          </div>

          {/* Sellers Card */}
          <div className="col-span-3 bg-gray-50 p-8 rounded-3xl">
            <div className="flex -space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-white"></div>
            </div>
            <div className="text-4xl font-bold mb-2">5,000+</div>
            <div className="text-gray-600">Certified sellers</div>
          </div>

          {/* Shipping Card */}
          <div className="col-span-3 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl">
            <div className="text-4xl font-bold mb-3">10%+</div>
            <div className="mb-6">Up to 10% back on all purchases</div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-6 h-6">⏱️</div>
              Free, fast, and reliable shipping
            </div>
          </div>
        </div>

        {/* Compare Card */}
        <div className="absolute -right-4 top-1/2 bg-blue-600 text-white p-6 rounded-2xl max-w-xs">
          <div className="text-lg">See how Rivly sellers compare to sites like Amazon, Etsy, and others</div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm">Learn more</span>
            <span className="text-xl">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
