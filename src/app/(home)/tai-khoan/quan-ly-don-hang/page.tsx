import { getAll } from "@/apis/models/order.apis";
import { orderColumns } from "@/components/orderManagement/orderColumns";
import OrderStatusTabs from "@/components/orderManagement/orderStatusTabs";
import Table from "@/components/ui/table";
import { IOrder } from "@/interfaces/models/IOrder.interface";
import { getValidData } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const data = await getAll(searchParams.status ?? "pending");

  return (
    <div className="   p-3  ">
      <OrderStatusTabs />

      <div className="bg-white rounded-lg p-3">
        <Table<IOrder>
          data={getValidData(data) ?? []}
          columns={orderColumns}
          rowKey="orderCode"
          showSearch={false}
          searchPlaceholder="Tìm kiếm đơn hàng..."
        />
      </div>
    </div>
  );
}

