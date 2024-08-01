import { Skeleton, SkeletonLine } from "keep-react";

function SkeletonDashboard() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 lg:col-span-8">
        <Skeleton className="w-full xl:max-w-md">
          <SkeletonLine className="h-80 w-full" />
        </Skeleton>
      </div>

      <div className="col-span-12 lg:col-span-4">
        <Skeleton className="w-full xl:max-w-md">
          <SkeletonLine className="h-80 w-full" />
        </Skeleton>
      </div>

      <div className="col-span-12 lg:col-span-12">
        <Skeleton className="w-full xl:max-w-md">
          <SkeletonLine className="h-80 w-full" />
        </Skeleton>
      </div>
    </div>
  );
}

export default SkeletonDashboard;
