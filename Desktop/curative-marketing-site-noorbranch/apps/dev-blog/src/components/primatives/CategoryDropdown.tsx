import React, { FC, useState, useRef, useEffect } from 'react';

interface CategoryDropdownProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

/**
 * A reusable dropdown component for category selection
 * 
 * @param categories - Array of category options
 * @param selectedCategory - Currently selected category
 * @param onCategoryChange - Callback function when category changes
 * @param className - Additional CSS classes
 */
export const CategoryDropdown: FC<CategoryDropdownProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside - pure function with no side effects
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className={`relative p-2 ${className}`} ref={dropdownRef}>
      <div className="bg-gray-100 dark:bg-gray-800 border-[1px] relative w-auto text-gray-800 dark:text-gray-200 inline-block border-gray-300 dark:border-gray-700 border-dashed text-center w-full block shadow-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative text-center w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-400 border-gray-300 dark:border-gray-700 border-dashed border-[1px] px-3 py-1.5 -translate-y-0.5 hover:-translate-y-1 active:translate-y-0 mx-[-1px] block active:transition-all active:duration-100 select-none font-mono text-sm"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <div className="flex items-center justify-between">
            <span>{selectedCategory}</span>
            <svg
              className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              width="100%"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.47 9.47a.75.75 0 0 1 1.06 0L12 12.94l3.47-3.47a.75.75 0 1 1 1.06 1.06l-3.646 3.647a1.25 1.25 0 0 1-1.768 0L7.47 10.53a.75.75 0 0 1 0-1.06Z"
              ></path>
            </svg>
          </div>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-20 left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 border-dashed rounded shadow-lg max-h-60 overflow-y-auto w-full">
            <div className="py-1">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-4 py-2 text-sm font-mono hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    selectedCategory === category ? 'bg-gray-50 dark:bg-gray-700 text-blue-700 dark:text-blue-400 font-medium' : 'text-gray-800 dark:text-gray-300'
                  }`}
                  onClick={() => {
                    onCategoryChange(category);
                    setIsOpen(false);
                  }}
                >
                  {index === 0 ? (
                    category
                  ) : (
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                      {category}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDropdown;
