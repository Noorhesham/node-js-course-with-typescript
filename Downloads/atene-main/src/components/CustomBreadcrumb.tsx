import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { cn } from "./lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface CustomBreadcrumbProps {
  items: BreadcrumbItem[];
  rtl?: boolean;
  className?: string;
}

/**
 * CustomBreadcrumb - Navigation breadcrumb component
 *
 * @param items - Array of breadcrumb items with label and href
 * @param rtl - Whether to use RTL layout (for Arabic)
 * @param className - Additional classes
 */
const CustomBreadcrumb = ({ items, rtl = true, className }: CustomBreadcrumbProps) => {
  // Choose the appropriate chevron based on RTL setting
  const Chevron = rtl ? ChevronLeft : ChevronRight;

  return (
    <nav className={cn("flex text-sm", className)} dir={rtl ? "rtl" : "ltr"} aria-label="Breadcrumb">
      <ol className="flex items-center text-base space-x-2 rtl:space-x-reverse">
        {/* Home link */}
        <li>
          <Link to="/" className="text-muted-foreground hover:text-foreground flex items-center">
            <Home className="h-4 w-4" />
          </Link>
        </li>

        {/* Separator */}
        <li className="flex items-center">
          <Chevron className="h-4 w-4 text-muted-foreground" />
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            <li>
              {index === items.length - 1 ? (
                <span className="font-medium lg:text-base text-xs text-foreground">{item.label}</span>
              ) : (
                <Link to={item.href} className="text-muted-foreground   lg:text-base text-xs hover:text-foreground">
                  {item.label}
                </Link>
              )}
            </li>

            {/* Add separator between items */}
            {index < items.length - 1 && (
              <li className="flex  items-center">
                <Chevron className="h-4 w-4 text-muted-foreground" />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default CustomBreadcrumb;
