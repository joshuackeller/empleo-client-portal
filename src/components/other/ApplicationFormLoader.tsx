import { Skeleton } from "../shadcn/Skeleton";

const ApplicationFormLoader = () => {
  return (
    <div className="space-y-3.5">
      <div>
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-20 w-full" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
};

export default ApplicationFormLoader;
