"use client";

import { checkout } from "@/apis/models/cart.apis";
import CouponCard from "@/components/common/couponCard";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { useQuoteActions } from "@/hooks/useQuoteActions";
import { IPayloadOrder } from "@/interfaces/models/IOrder.interface";
import {
  formatPrice,
  getMarketPrice,
  getPrice,
  getValidData,
} from "@/lib/utils";
import { useStateStore } from "@/stores/stateStore";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const OrderSummary = ({ payload }: { payload: IPayloadOrder }) => {
  const t = useTranslations();
  const {
    cart,
    selectedIds,
    couponCode,
    couponActive,
    setCouponCode,
    setCouponActive,
    removeItems,
    clearSelected,
  } = useCartStore();
  const { quote } = useQuoteActions();
  const [open, setOpen] = useState(false);
  const [loading, startTransition] = useTransition();
  const { setLoading } = useStateStore();
  const router = useRouter();

  const items = useMemo(() => {
    const selectedSet = new Set(selectedIds);
    return cart.items.filter((i) => selectedSet.has(i.id));
  }, [cart.items, selectedIds]);
  const hasSelectedItems = items.length > 0;

  const handleOrder = (data: IPayloadOrder) => {
    if (!hasSelectedItems) {
      toast.warning("Hãy chọn ít nhất 1 sản phẩm trước khi thanh toán.", {
        position: "top-center",
      });
      return;
    }

    startTransition(async () => {
      try {
        setLoading(true);
        const response = await checkout(data);
        const responseData = getValidData(response);

        if (responseData?.orderId) {
          router.replace(`/xac-nhan-thanh-toan/${responseData.orderId}`);
          toast.success(response.message || "Thanh toán thành công", {
            description: "Thanh toán đơn hàng thành công",
            position: "top-center",
          });
        } else {
          toast.error(response.message, {
            description: "Thanh toán đơn hàng không thành công",
            position: "top-center",
          });
        }
      } catch (error) {
        console.error("Checkout error:", error);
        toast.error("Đã xảy ra lỗi hệ thống", {
          description: "Vui lòng thử lại sau!",
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-950 sm:text-lg">
          Thông tin đơn hàng
        </h3>
        <Link href="/gio-hang" className="text-xs font-medium text-amber-700 hover:underline sm:text-sm">
          Chỉnh sửa
        </Link>
      </div>

      <div className="mb-4 flex max-h-[clamp(220px,28vh,360px)] flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        {items?.length ? (
          items.map((product) => (
            <div
              key={product.id}
              className="flex items-start gap-3 rounded-[20px] border border-slate-200/80 bg-slate-50/80 p-3"
            >
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-[16px] border border-slate-200 bg-white p-1 sm:h-20 sm:w-20">
                <Image
                  height={90}
                  width={90}
                  src={product.picture}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="line-clamp-2 text-sm font-medium leading-tight text-slate-900">
                  {product.name}
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  {t("PRODUCT.quantity")}: {product.quantity}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-semibold text-rose-600">
                    {getPrice(product)}
                  </span>
                  {getMarketPrice(product) && (
                    <s className="text-xs text-slate-400">
                      {getMarketPrice(product)}
                    </s>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            Không có sản phẩm nào được chọn.
          </p>
        )}
      </div>

      <div className="my-3 sm:my-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900 sm:text-base">
            Khuyến mãi
          </span>
          <button
            disabled={!quote?.coupon?.length}
            onClick={() => setOpen(true)}
            className="text-xs font-medium text-amber-700 hover:underline disabled:text-slate-400 sm:text-sm"
          >
            Chọn hoặc nhập khuyến mãi
          </button>
        </div>

        {couponActive &&
        quote?.coupon?.some((c) => c.id === couponActive.id) &&
        couponActive.couponDes?.length
          ? couponActive.couponDes.map(
              (i) =>
                i.code === couponCode && (
                  <CouponCard
                    key={i.id}
                    coupon={couponActive}
                    des={i}
                    isSelected
                    onToggle={() => {
                      setCouponCode("");
                      setCouponActive(null);
                    }}
                    removable
                  />
                )
            )
          : null}

        {(quote?.coupon?.length ?? 0) === 0 ? (
          <span className="block text-xs leading-relaxed text-slate-500 sm:text-sm">
            Đơn hàng chưa đủ điều kiện áp dụng khuyến mãi. Vui lòng mua thêm để
            áp dụng
          </span>
        ) : (
          <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            size="md"
            title="Khuyến mãi và mã giảm giá"
          >
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 p-1 sm:max-h-[600px]">
              {quote?.coupon?.flatMap(
                (item) =>
                  item?.couponDes?.map((i) => (
                    <CouponCard
                      key={i.id}
                      coupon={item}
                      des={i}
                      isSelected={i.code === couponCode}
                      onToggle={() => {
                        setCouponCode(i.code === couponCode ? "" : i.code);
                        setCouponActive(i.code === couponCode ? null : item);
                      }}
                    />
                  )) || []
              )}
            </div>
          </Modal>
        )}
      </div>

      <div className="space-y-3 border-t border-slate-200/80 pt-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-slate-600 sm:text-base">Giảm giá:</span>
          <span className="text-sm font-medium sm:text-base">
            {couponCode ? (
              <div className="flex items-center gap-2">
                <div className="flex w-fit items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-2 py-1">
                  <span className="text-xs text-amber-700">{couponCode}</span>
                </div>
                <span>{formatPrice(couponActive?.value)}</span>
              </div>
            ) : (
              "0đ"
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 sm:text-base">
            Phí vận chuyển:
          </span>
          <span className="text-sm font-medium text-slate-900 sm:text-base">
            Kinh doanh phản hồi
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-900 sm:text-base">Tổng tạm tính</span>
          <span className="text-sm font-medium text-slate-900 sm:text-base">
            {formatPrice(quote?.totalPrice)}
          </span>
        </div>

        <div className="flex items-end justify-between border-t border-slate-200/80 pt-3">
          <span className="text-lg font-semibold text-slate-950">Thành tiền</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-rose-600">
              {formatPrice(quote?.finalPrice)}
            </div>
            <div className="text-xs text-slate-500">(Đã bao gồm VAT)</div>
          </div>
        </div>
      </div>

        <Button
          onClick={() => handleOrder(payload)}
          fullWidth
          variant="primary"
          size="md"
          className="mt-4 py-3 text-sm sm:py-4 sm:text-base"
          disabled={loading || !hasSelectedItems}
        >
          THANH TOÁN
        </Button>

      {!hasSelectedItems ? (
        <p className="mt-3 text-xs leading-relaxed text-amber-700">
          Hãy chọn ít nhất 1 sản phẩm trong giỏ hàng để tiếp tục thanh toán.
        </p>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Nhấn Thanh toán đồng nghĩa với việc bạn đã đọc và đồng ý tuân theo{" "}
        <Link href={"/"} className="text-amber-700 hover:underline">
          Điều khoản và Điều kiện
        </Link>
      </p>
    </div>
  );
};

export default memo(OrderSummary);
