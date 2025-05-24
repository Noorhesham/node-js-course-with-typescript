import React, { FC, ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverTextColor?: string;
  darkHoverTextColor?: string;
}

/**
 * A reusable button component with consistent styling
 * 
 * @param href - The URL to navigate to
 * @param children - The button content
 * @param className - Additional CSS classes
 * @param backgroundColor - Background color CSS class (default: "bg-gray-200 dark:bg-gray-700")
 * @param textColor - Text color CSS class (default: "text-gray-800 dark:text-gray-200")
 * @param borderColor - Border color CSS class (default: "border-gray-300 dark:border-gray-600")
 * @param hoverTextColor - Hover text color CSS class (default: "hover:text-blue-700")
 * @param darkHoverTextColor - Dark mode hover text color CSS class (default: "dark:hover:text-blue-400")
 */
export const Button: FC<ButtonProps> = ({
  href,
  children,
  className = '',
  backgroundColor = 'bg-gray-200 dark:bg-gray-700',
  textColor = 'text-gray-800 dark:text-gray-200',
  borderColor = 'border-gray-300 dark:border-gray-600',
  hoverTextColor = 'hover:text-blue-700',
  darkHoverTextColor = 'dark:hover:text-blue-400'
}) => {
  return (
    <Link
      href={href}
      className={`${backgroundColor} border-[1.5px] relative top-[2px] w-auto ${textColor} inline-block ${borderColor} border-dashed text-center group w-full block ${className}`}
    >
      <span className={`relative text-center w-auto bg-white dark:bg-gray-800 ${textColor} ${hoverTextColor} ${darkHoverTextColor} ${borderColor} border-dashed text-[15px] font-medium border-[1.5px] px-5 py-2 -translate-y-1 hover:-translate-y-1.5 active:-translate-y-0.5 mx-[-1.5px] block active:transition-all active:duration-100 select-none font-mono`}>
        {children}
      </span>
    </Link>
  );
};

export default Button;
