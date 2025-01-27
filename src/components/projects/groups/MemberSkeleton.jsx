import { Skeleton } from '@/components/ui/skeleton';

const MemberSkeleton = () => (
  <div className="flex items-center justify-between p-2 rounded-lg">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
    <Skeleton className="h-8 w-8 rounded-md" />
  </div>
);

export default MemberSkeleton;