export const SkeletonLoader = ({ height = "h-32" }: { height?: string }) => (
  <div
    className={`w-full ${height} rounded-lg border border-border bg-gradient-to-r from-muted via-background to-muted bg-[length:200%_100%] animate-pulse`}
  />
);

