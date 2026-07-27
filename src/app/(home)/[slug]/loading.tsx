import CategoryPageSkeleton from "@/components/category/CategoryPageSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-[1520px] px-3 py-8 sm:px-4 lg:px-6">
      <CategoryPageSkeleton />
    </div>
  );
}
