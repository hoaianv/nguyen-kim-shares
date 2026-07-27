import { findOne } from "@/apis/models/order.apis";
import OrderDetail from "@/components/orderDetail/orderDetail";
import { LazySection } from "@/components/ui/lazySection";
import { SkeletonLoader } from "@/components/ui/skeletonLoader";
import { getValidData } from "@/lib/utils";

import dynamic from "next/dynamic";
const NotFoundPage = dynamic(() => import("@/components/common/NotFoundPage"), {
  loading: () => <SkeletonLoader height="h-48" />,
});
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const data = await findOne(id);
  const order = getValidData(data);

  return order ? (
    <OrderDetail order={order} />
  ) : (
    <LazySection height="h-48">
      <NotFoundPage />
    </LazySection>
  );
}
