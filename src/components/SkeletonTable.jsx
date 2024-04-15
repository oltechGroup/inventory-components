import { Skeleton } from "keep-react";

export const SkeletonTable = () => {
  return (
    <Skeleton className="w-full">
      <Skeleton.Line className="h-10 w-full" />
      {[...Array(7)].map((_, index) => (
        <div className="grid grid-cols-5 my-4 gap-4">
          <Skeleton.Line className="h-4 w-full" />
          <Skeleton.Line className="h-4 w-full" />
          <Skeleton.Line className="h-4 w-full" />
          <Skeleton.Line className="h-4 w-full" />
          <Skeleton.Line className="h-4 w-full" />
        </div>
      ))}
    </Skeleton>
  );
};
