"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Category {
  _id: string;
  name: string;
}

interface FilterProps {
  categories: Category[];
}

export default function Filter({ categories }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const selectedCategories = searchParams.getAll("category");

  const handleSelect = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    const currentCategories = params.getAll("category");

    if (currentCategories.includes(categoryId)) {
      params.delete("category");
      currentCategories.filter((cat) => cat !== categoryId).forEach((cat) => params.append("category", cat));
    } else {
      params.append("category", categoryId);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category._id);
        return (
          <label
            key={category._id}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              isSelected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleSelect(category._id)}
              className="hidden"
            />
            {category.name}
          </label>
        );
      })}
    </div>
  );
}
