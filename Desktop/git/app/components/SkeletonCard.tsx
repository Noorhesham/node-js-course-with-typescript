import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className=" grid gap-5 relative  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto items-center px-4 lg:px-20 py-5 md:py-10">
      {Array.from({ length: 24 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-56 w-full  rounded-xl" />
          <div className="space-y-2 text-center">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
