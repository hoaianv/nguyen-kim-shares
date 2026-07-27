"use client";
import { ORDER_STATUS_LABEL, STATUS_STYLE } from "@/constants";
import { useCartActions } from "@/hooks/useCartActions";
import { IOrderDetail } from "@/interfaces/models/IOrder.interface";

import { formatPrice, getValidData } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import {
  AlertCircle,
  Building2,
  CircleCheck,
  Clock,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Truck,
  XCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OrderDetail({ order }: { order: IOrderDetail }) {
  const t = useTranslations();

  const { addToCart } = useCartActions();
  const { setSelectedIds } = useCartStore();
  const payLoad = order?.items.map((item) => ({
    product: item,
    quantity: item.quantity,
  }));
  const router = useRouter();

  return (
    <div className="mx-auto  col-span-8 px-3 py-4 md:py-6">
      <div className="mb-4 flex flex-col gap-2 md:mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
            Đơn hàng #{order.orderCode}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>Ngày đặt: {order.dateOrder}</span>
            <span className="hidden md:inline">·</span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
                STATUS_STYLE[order.status]
              }`}
            >
              {order.status === "pending" && <Clock className="h-3.5 w-3.5" />}
              {order.status === "payment" && (
                <CreditCard className="h-3.5 w-3.5" />
              )}
              {order.status === "paid" && (
                <CircleCheck className="h-3.5 w-3.5" />
              )}
              {order.status === "delivered" && (
                <Truck className="h-3.5 w-3.5" />
              )}
              {order.status === "finished" && (
                <CircleCheck className="h-3.5 w-3.5" />
              )}
              {order.status === "fail" && <XCircle className="h-3.5 w-3.5" />}
              {order.status === "customer-cancels" && (
                <AlertCircle className="h-3.5 w-3.5" />
              )}
              <span>{ORDER_STATUS_LABEL[order.status]}</span>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={async () => {
              const res = await addToCart(payLoad);
              const selectedId =
                getValidData(res)?.items.map((item) => item.id) ?? [];

              setSelectedIds(selectedId);
              router.replace("/thanh-toan");
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 active:scale-[0.99]"
          >
            <RotateCcw className="h-4 w-4" /> Mua lại
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
        {/* Left */}
        <div className="space-y-4 md:col-span-8 md:space-y-6">
          {/* Items */}
          <div className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Sản phẩm ({order.items.length})
                </div>
                <div className="text-xs text-gray-500">
                  Mã đơn: {order.orderCode}
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {order.items.map((it) => (
                  <div key={it.id} className="flex items-center gap-3 py-3">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                      <Image
                        width={80}
                        height={80}
                        src={it.picture ?? "/"}
                        alt={it.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="line-clamp-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {it.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {it.productCode && (
                          <span className="mr-2">SKU: {it.productCode}</span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {t("PRODUCT.quantity")}: x{it.quantity}
                      </div>
                    </div>
                    <div className="text-right text-sm font-medium text-gray-900 dark:text-gray-100">
                      <div>{formatPrice(it.price)}</div>
                      <div className="text-xs text-gray-500">
                        Tạm tính: {formatPrice(it.price * it.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.note && (
            <div className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Ghi chú
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {order.note}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="space-y-4 md:col-span-4 md:space-y-6">
          {/* Price summary */}
          <div className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Tổng kết thanh toán
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Tổng tiền hàng
                  </span>
                  <span className="font-medium">
                    {formatPrice(order.totalPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Phí vận chuyển
                  </span>
                  <span className="font-medium">Kinh doanh phản hồi</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Giảm giá
                  </span>
                  <span className="font-medium text-emerald-600">
                    {order.couponValue
                      ? -formatPrice(order.couponValue)
                      : "Chưa có"}
                  </span>
                </div>
                <div className="h-px w-full bg-gray-100 dark:bg-gray-800" />
                <div className="flex items-center justify-between text-base">
                  <span className="font-semibold">Thành tiền</span>
                  <span className="font-semibold text-blue-600">
                    {formatPrice(order.finalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment */}
          <div className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                <Truck className="h-4 w-4" /> Vận chuyển
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2 text-sm">
                <div className="text-gray-600 dark:text-gray-300">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide">
                    Địa chỉ giao
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">{order.nameDelivery}</div>
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{order.addressDelivery}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> {order.phoneDelivery}
                    </div>
                  </div>
                </div>
                {order.status === "delivered" && (
                  <div className="rounded-lg bg-sky-50 p-3 text-xs text-sky-700 ring-1 ring-sky-200">
                    Hàng đang được giao. Vui lòng giữ liên lạc điện thoại để
                    shipper liên hệ.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                <Building2 className="h-4 w-4" /> Thông tin xuất hóa đơn
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-1 text-sm">
                <div className="font-medium">{order.nameCompany}</div>

                <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{order.addressCompany}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Phone className="h-4 w-4" /> {order.phoneCompany}
                </div>

                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Mail className="h-4 w-4" /> {order.emailCompany}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

