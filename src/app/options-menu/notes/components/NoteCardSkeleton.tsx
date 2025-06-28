import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function NoteCardSkeleton() {
  return (
    <Card className="w-full rounded-xl border p-4 space-y-2">
      <Skeleton className="h-5 w-3/4 rounded" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
      {/* //TODO if we don't include timestamp and tag, remove skeleton lines */}
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-4 w-16 rounded" /> {/* tag */}
        <Skeleton className="h-4 w-20 rounded" /> {/* timestamp */}
      </div>
    </Card>
  );
}

export default NoteCardSkeleton;
