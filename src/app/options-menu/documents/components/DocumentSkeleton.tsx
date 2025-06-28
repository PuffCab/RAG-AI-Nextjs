import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function DocumentSkeleton() {
  return (
    <Card className="h-[200px] p-4 flex flex-col justify-between">
      <Skeleton className="h-[30px] rounded animate-pulse" />
      <Skeleton className="h-[30px] rounded" />
      <Skeleton className="w-[80px] h-[30px] rounded" />
    </Card>
  );
}

export default DocumentSkeleton;
