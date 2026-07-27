"use client";

import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IOrderDetail } from "@/interfaces/models/IOrder.interface";
import { getPrice } from "@/lib/utils";
import { useEffect } from "react";
import { useCartStore } from "@/stores/useCartStore";

export default function PaymentConfirmationPage({
  data,
}: {
  data: IOrderDetail;
}) {
  const { selectedIds, removeItems, clearSelected } = useCartStore();
  const router = useRouter();

  const getShippingMethodText = (method: string) => {
    return method === "delivery" ? "Giao hàng tận nơi" : "Nhận tại cửa hàng";
  };

  useEffect(() => {
    removeItems(selectedIds);
    clearSelected();
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <Card className="border-slate-200 bg-white/90 p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center">
          <div className="flex flex-shrink-0 items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="mb-3 text-2xl font-bold text-slate-950 md:text-3xl">
              Cảm ơn quý khách đã đặt hàng tại Nguyễn Kim
            </h1>
            <p className="text-base text-slate-600">
              Mã đơn hàng:{" "}
              <span className="font-semibold text-amber-700">
                #{data.orderCode}
              </span>
            </p>
            <p className="text-base text-slate-600">
              Ngày đặt hàng: {data.dateOrder}
            </p>
            <p className="text-base text-slate-600">
              Email xác nhận đã được gửi đến:{" "}
              <span className="font-semibold text-slate-900">
                {data.emailDelivery}
              </span>
            </p>
            <p className="text-base text-slate-600">
              Xin vui lòng kiểm tra email của bạn.
            </p>
          </div>
        </div>

        <div className="mb-6 grid gap-6 border-b border-slate-200 pb-6 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-lg font-bold text-slate-950">
              Thông tin mua hàng
            </h2>
            <div className="space-y-3 text-base">
              <div>
                <p className="mb-1 text-slate-500">Tên công ty:</p>
                <p className="font-semibold text-slate-900">
                  {data.nameCompany || "Không có"}
                </p>
              </div>
              <div>
                <p className="mb-1 text-slate-500">Địa chỉ công ty:</p>
                <p className="font-semibold text-slate-900">
                  {data.addressCompany || "Không có"}
                </p>
              </div>
              <div>
                <p className="mb-1 text-slate-500">Email công ty:</p>
                <p className="font-semibold text-slate-900">
                  {data.emailCompany || "Không có"}
                </p>
              </div>
              <div>
                <p className="mb-1 text-slate-500">Số điện thoại công ty:</p>
                <p className="font-semibold text-slate-900">
                  {data.phoneCompany || "Không có"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-slate-950">
              Thông tin nhận hàng
            </h2>
            <div className="space-y-3 text-base">
              <div>
                <p className="mb-1 text-slate-500">Họ và tên:</p>
                <p className="font-semibold text-slate-900">
                  {data.nameDelivery}
                </p>
              </div>
              <div>
                <p className="mb-1 text-slate-500">Địa chỉ:</p>
                <p className="font-semibold text-slate-900">
                  {data.addressDelivery}
                </p>
              </div>
              <div>
                <p className="mb-1 text-slate-500">Email:</p>
                <p className="font-semibold text-slate-900">
                  {data.emailDelivery}
                </p>
              </div>
              <div>
                <p className="mb-1 text-slate-500">Số điện thoại:</p>
                <p className="font-semibold text-slate-900">
                  {data.phoneDelivery}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-950">
              Phương thức thanh toán
            </h2>
            <p className="text-base text-slate-700">
              Thanh toán chuyển khoản trực tiếp
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-950">
              Phương thức vận chuyển
            </h2>
            <p className="text-base text-slate-700">
              {getShippingMethodText(data.shippingMethod)}
            </p>
          </div>
        </div>

        {data.note && (
          <div className="mt-6 border-t border-slate-200 pt-6">
            <h2 className="mb-3 text-lg font-bold text-slate-950">Ghi chú</h2>
            <p className="text-base text-slate-700">{data.note}</p>
          </div>
        )}
      </Card>

      <Card className="border-slate-200 bg-white/90 p-6 shadow-sm">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full overflow-hidden rounded-[24px] border border-slate-200">
            <Image
              src="/images/orderConfirm/thanh-toan.png"
              alt="QR Code Payment"
              width={800}
              height={800}
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="w-full text-center">
            <div className="border-t border-slate-200 pt-6">
              <p className="mb-3 text-lg font-semibold text-slate-600">
                Nội dung chuyển khoản:
              </p>
              <p className="text-2xl font-bold text-rose-600">
                {data.orderCode}-{" Mã số thuế đã đăng ký"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-slate-200 bg-white/90 p-6 shadow-sm">
        <div className="mb-6 border-b border-slate-200 pb-6">
          <h2 className="mb-4 text-lg font-bold text-slate-950">
            Danh sách sản phẩm
          </h2>
          <div className="space-y-4">
            {data.items && data.items.length > 0 ? (
              data.items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex gap-4 pb-4">
                  <div className="flex-shrink-0 overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 p-2">
                    <Image
                      src={item.picture || "/placeholder.svg"}
                      alt={item.name || "Sản phẩm"}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-2 line-clamp-2 text-base font-semibold text-slate-950">
                      {item?.name}
                    </h3>
                    <div className="flex items-end justify-between gap-2">
                      <div className="text-base">
                        <p className="text-slate-600">
                          Số lượng:{" "}
                          <span className="font-semibold text-rose-600">
                            {item.quantity}
                          </span>
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-rose-600 md:text-base lg:text-base">
                          {getPrice(item)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-600">Không có sản phẩm nào</p>
            )}
          </div>
        </div>

        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-base text-slate-700">Tạm tính:</span>
            <span className="text-base font-semibold text-slate-900">
              {data.totalPrice.toLocaleString("vi-VN")}₫
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base text-slate-700">Phí vận chuyển:</span>
            <span className="text-base font-semibold text-slate-900">
              Kinh doanh phản hồi
            </span>
          </div>
          {data.couponCode && (
            <div className="flex items-center justify-between">
              <span className="text-base text-slate-700">
                Mã giảm giá ({data.couponCode}):
              </span>
              <span className="text-base font-semibold text-slate-900">
                -{(data.couponValue || 0).toLocaleString("vi-VN")}₫
              </span>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-slate-200 pt-3">
            <span className="text-lg font-bold text-slate-950">Tổng cộng:</span>
            <span className="text-2xl font-bold text-rose-600">
              {data.finalPrice.toLocaleString("vi-VN")}₫
            </span>
          </div>
        </div>

        <Button
          onClick={() => router.replace("/")}
          className="w-full bg-slate-950 py-3 text-base text-white hover:bg-slate-800"
        >
          Xác nhận đã chuyển khoản
        </Button>
      </Card>
    </div>
  );
}
