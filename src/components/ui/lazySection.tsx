import { SkeletonLoader } from "@/components/ui/skeletonLoader";
import { Suspense } from "react";

export const LazySection = ({
  children,
  height = "h-32",
}: {
  children: React.ReactNode;
  height?: string;
}) => (
  <Suspense fallback={<SkeletonLoader height={height} />}>{children}</Suspense>
);
