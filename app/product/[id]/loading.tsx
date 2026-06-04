import { Skeleton } from "@/src/presentation/components/ui/skeleton";
import Container from "@/src/presentation/layout/Container";

export default function Loading() {
  return (
    <Container className="space-y-10 py-8">
      <Skeleton className="h-4 w-32" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-28" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </Container>
  );
}
