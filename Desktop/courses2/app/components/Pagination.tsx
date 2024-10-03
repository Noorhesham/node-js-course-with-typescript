"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PaginationDemo({ totalPages }: { totalPages: number }) {
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
    <Pagination className=" mt-5 col-span-full">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={` ${currentPage === 1 ? "cursor-not-allowed opacity-80" : ""} `}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                className={currentPage === page ? "bg-primary text-primary-foreground" : ""}
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
          <PaginationNext
            href="#"
            className={
              currentPage >= totalPages ? " cursor-not-allowed  opacity-80" : "bg-background text-muted-foreground"
            }
            onClick={(e) => {
              e.preventDefault();
              if (currentPage >= totalPages) return null;
              handlePageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
