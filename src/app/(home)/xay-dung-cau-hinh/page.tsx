import { getAll } from "@/apis/models/buildPc.apis";
import { LazySection } from "@/components/ui/lazySection";
import { SkeletonLoader } from "@/components/ui/skeletonLoader";
import { getValidData } from "@/lib/utils";
import dynamic from "next/dynamic";
const NotFoundPage = dynamic(() => import("@/components/common/NotFoundPage"), {
  loading: () => <SkeletonLoader height="h-48" />,
});

const Configuration = dynamic(
  () => import("@/components/buildPc/configuration"),
  {
    loading: () => <SkeletonLoader height="h-48" />,
  },
);

const TotalConfiguration = dynamic(
  () => import("@/components/buildPc/TotalConfiguration"),
  {
    loading: () => <SkeletonLoader height="h-48" />,
  },
);
export default async function page() {
  const response = await getAll();
  const data = getValidData(response);

  return data ? (
    <div
      className="pt-3 mx-auto h-full w-full max-w-7xl 2xl:max-w-[1520px]
px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20
"
    >
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 sm:gap-4">
        <Configuration data={data} />

        <TotalConfiguration />
      </div>
    </div>
  ) : (
    <LazySection height="h-48">
      <NotFoundPage />
    </LazySection>
  );
}
