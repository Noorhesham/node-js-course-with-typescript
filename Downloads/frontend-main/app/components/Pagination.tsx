"use client";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PaginationDemo({ totalPages = 5 }: { totalPages?: number }) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    //@ts-ignore
    url.searchParams.set("page", page);
    replace(url.toString(), { scroll: false });
    setCurrentPage(page);
  };
  return (
    <Pagination dir="rtl" className=" mt-10 col-span-full">
      <PaginationContent className=" flex flex-row-reverse">
        <PaginationItem>
          <Button
            size={"sm"}
            className={
              currentPage >= (totalPages || 5)
                ? " cursor-not-allowed text-main   opacity-80"
                : "rounded-full flex mr-1 md:mr-3 p-1 items-center text-main  bg-light duration-150 hover:text-white hover:bg-main"
            }
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
          >
            {" "}
            <ArrowLeft className="mr-1" />
          </Button>
        </PaginationItem>
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                className={
                  currentPage === page ? "bg-main   text-gray-50 rounded-full text-primary-foreground" : "rounded-full"
                }
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <Button
            size={"sm"}
            className={
              currentPage >= totalPages
                ? " cursor-not-allowed text-main  opacity-80"
                : "rounded-full bg-light text-main ml-1 md:ml-3 p-1 flex  1items-center duration-150 hover:text-white hover:bg-main"
            }
            onClick={(e) => {
              e.preventDefault();
              if (currentPage >= totalPages) return null;
              handlePageChange(currentPage + 1);
            }}
          >
            {" "}
            <ArrowRight className="mr-1" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
