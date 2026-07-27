import { SkeletonLoader } from "@/components/ui/skeletonLoader";

function CardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-border/60 bg-background p-3">
      <SkeletonLoader height="h-40" />
      <div className="mt-3 space-y-2">
        <SkeletonLoader height="h-5" />
        <SkeletonLoader height="h-5" />
        <div className="grid grid-cols-2 gap-2 pt-1">
          <SkeletonLoader height="h-9" />
          <SkeletonLoader height="h-9" />
        </div>
      </div>
    </div>
  );
}

export default function CategoryPageSkeleton() {
  return (
    <div className="space-y-5">
      <section className="space-y-4 border-b border-border/60 pb-4">
        <SkeletonLoader height="h-6" />
        <SkeletonLoader height="h-10" />
        <SkeletonLoader height="h-6" />
        <SkeletonLoader height="h-9" />
      </section>

      <div className="space-y-4">
        <SkeletonLoader height="h-16" />
        <SkeletonLoader height="h-12" />
        <div className="grid grid-cols-2 gap-3 max-[370px]:grid-cols-1 md:grid-cols-2 min-[900px]:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
