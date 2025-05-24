import React, { FC } from 'react';

interface SectionHeaderProps {
  title: string;
  className?: string;
  prefix?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

/**
 * A reusable section header component with consistent styling
 * 
 * @param title - The title text to display
 * @param className - Additional CSS classes
 * @param prefix - Optional prefix before the title (default: "///")
 * @param backgroundColor - Background color CSS class (default: "bg-gray-50 dark:bg-gray-800")
 * @param textColor - Text color CSS class (default: "text-gray-700 dark:text-gray-300")
 * @param borderColor - Border color CSS class (default: "border-gray-300 dark:border-gray-700")
 */
export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  className = '',
  prefix = '&#47;&#47;&#47;&#47;&#47;',
  backgroundColor = 'bg-gray-50 dark:bg-gray-800',
  textColor = 'text-gray-700 dark:text-gray-300',
  borderColor = 'border-gray-300 dark:border-gray-700'
}) => {
  return (
    <div className={`flex h-[32px] w-full items-center whitespace-nowrap text-center font-mono text-xs uppercase ${textColor} ${backgroundColor} border-y border-dashed ${borderColor} py-1 px-4 sticky top-0 z-10 ${className}`}>
      <div className="" dangerouslySetInnerHTML={{ __html: prefix }} />
      <div className="pl-1 text-gray-800 dark:text-gray-200"> {title}</div>
    </div>
  );
};

export default SectionHeader;
