import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard({className}:{className?:string}) {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className={` ${className?' w-full':'w-[250px]'} h-[125px]  rounded-xl`} />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
