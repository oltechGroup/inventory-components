import { Skeleton, SkeletonLine } from "keep-react";

export const SkeletonTable = () => {
  return (
    <Skeleton className="w-full">
      <SkeletonLine className="h-14 w-full" />
      {[...Array(7)].map((_, index) => (
        <div className="grid grid-cols-4 my-4 gap-3">
          <SkeletonLine className="h-7 w-full" />
          <SkeletonLine className="h-7 w-full" />
          <SkeletonLine className="h-7 w-full" />
          <SkeletonLine className="h-7 w-full" />
        </div>
      ))}
    </Skeleton>
  );
};
