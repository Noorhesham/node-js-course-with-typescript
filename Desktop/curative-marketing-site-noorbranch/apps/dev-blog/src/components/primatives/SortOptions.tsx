import React, { FC } from 'react';

type SortOptionType = 'date' | 'popularity';

interface SortOption {
  id: SortOptionType;
  label: string;
}

interface SortOptionsProps {
  sortOption: SortOptionType;
  onSortChange: (option: SortOptionType) => void;
  className?: string;
  options?: SortOption[];
}

/**
 * A reusable component for post sorting options
 * 
 * @param sortOption - Currently selected sort option
 * @param onSortChange - Callback function when sort option changes
 * @param className - Additional CSS classes
 * @param options - Custom sort options (default: date and popularity)
 */
export const SortOptions: FC<SortOptionsProps> = ({
  sortOption,
  onSortChange,
  className = '',
  options = [
    { id: 'date', label: 'DATE' },
    { id: 'popularity', label: 'POPULARITY' }
  ]
}) => {
  return (
    <div className={`flex justify-between items-center px-4 py-2 border-t border-b border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 ${className}`}>
      <div className="text-xs font-mono text-gray-700 dark:text-gray-300">SORT BY:</div>
      <div className="flex space-x-2">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => onSortChange(option.id)}
            className={`text-xs font-mono px-2 py-1 rounded ${
              sortOption === option.id 
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-700 dark:text-blue-400' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortOptions;
