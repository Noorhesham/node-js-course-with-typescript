"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface Filters {
  [key: string]: string[];
}

const Box = ({ text, options, filter, btn }: { text: string; options?: any[]; filter: string; btn?: boolean }) => {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({});
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [accordionValue, setAccordionValue] = useState<string | undefined>("");

  // Determine if the viewport is mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setAccordionValue(mobile ? undefined : "item-1");
    };

    if (typeof window !== "undefined") {
      handleResize(); // Initial check
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Parse existing filters from the URL when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const newFilters: Filters = {};
      params.forEach((value, key) => {
        newFilters[key] = value.split(",");
      });
      setFilters(newFilters);
    }
  }, []);

  // Update URL when filters change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      // Update the params with the current filters state
      Object.entries(filters).forEach(([key, values]) => {
        if (values.length > 0) {
          params.set(key, values.join(",")); // Set the new values for each filter
        } else {
          params.delete(key); // Remove the filter if no values are selected
        }
      });

      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [filters, router]);

  const handleFilter = (filterValue: string, filterName: string) => {
    setFilters((prevFilters) => {
      const currentFilters = prevFilters[filterName] || [];
      const isFilterSelected = currentFilters.includes(filterValue);

      // Toggle the filter on/off
      const updatedFilters = isFilterSelected
        ? currentFilters.filter((item) => item !== filterValue) // Remove the filter
        : [...currentFilters, filterValue]; // Add the filter

      return {
        ...prevFilters,
        [filterName]: updatedFilters,
      };
    });
  };

  return (
    <div className="flex px-3 py-1.5 font-medium text-sm bg-white uppercase flex-col">
      <Accordion
        type="single"
        value={accordionValue} // Control the accordion value
        onValueChange={setAccordionValue} // Update the state when it changes
        collapsible
        className="w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-base font-semibold text-main2">{text}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="pb-3 grid grid-cols-2 gap-2 border-b border-b-gray-400">
              {!btn
                ? options?.map((option, i) => (
                    <li
                      onClick={() => handleFilter(option, filter)}
                      key={i}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name={filter}
                        id={option}
                        checked={filters[filter]?.includes(option) || false}
                        onChange={() => handleFilter(option, filter)}
                      />
                      <label className="text-main2 text-xs" htmlFor={option}>
                        {option}
                      </label>
                    </li>
                  ))
                : options?.map((option, i) => (
                    <Button
                      size={"lg"}
                      className={cn(
                        "w-full lg:text-xs bg-gray-100 text-main2 ",
                        filters[filter]?.includes(option) ? "bg-main2 text-gray-50" : ""
                      )}
                      variant={"outline"}
                      key={i}
                      onClick={() => handleFilter(option, filter)}
                    >
                      {option}
                    </Button>
                  ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Box;
