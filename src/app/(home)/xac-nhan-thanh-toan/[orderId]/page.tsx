import { findOne } from "@/apis/models/order.apis";
import EmptyOrder from "@/components/paymentConfirm/EmptyOrder";

import PaymentConfirmationPage from "@/components/paymentConfirm/PaymentConfirmationPage";
import { getValidData } from "@/lib/utils";

export default async function Page({
  params,
}: {
  params: { orderId: string };
}) {
  const response = await findOne(params.orderId);

  const data = getValidData(response);
  return data ? (
    <main className="min-h-screen bg-slate-50">
      <PaymentConfirmationPage data={data} />
    </main>
  ) : (
    <EmptyOrder />
  );
}
