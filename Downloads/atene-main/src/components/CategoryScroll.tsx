// components/CategoryScroll.tsx
import React from "react";

const categories = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  name: "الخواتم",
  image: `/il_100x100.3400269364_k196.jpg (${i + 1}).png`, // Make sure images are named 1.png to 12.png
}));

const CategoryScroll = () => {
  return (
    <div className=" rounded-md p-4">
      <h2 className="font-bold my-4 t  text-xl lg:text-3xl">استكشاف الفئات</h2>
      <div className="flex flex-wrap gap-4 max-w-full justify-start">
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col items-center w-[60px] lg:w-[80px]">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-[60px] h-[60px] object-cover rounded-2xl border-input border hover:scale-105 transition"
            />
            <span className="mt-1 text-sm text-center">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryScroll;
