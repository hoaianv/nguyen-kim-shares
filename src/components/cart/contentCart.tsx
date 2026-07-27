"use client";

import { CardCart } from "@/components/cart/cardCart";
import CouponCard from "@/components/common/couponCard";
import Breadcrumb from "@/components/ui/breadcrumb";
import CheckboxField from "@/components/ui/checkboxField";
import ConfirmPopover from "@/components/ui/ConfirmPopover";
import Modal from "@/components/ui/Modal";
import { useCartActions } from "@/hooks/useCartActions";
import { useQuoteActions } from "@/hooks/useQuoteActions";

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function ContentCart() {
  const [open, setOpen] = useState(false);

  const { removeCart } = useCartActions();

  const {
    cart,
    selectedIds,
    selectAll,
    clearSelected,
    setCouponCode,
    couponCode,
    couponActive,
    setCouponActive,
  } = useCartStore();
  const { quote } = useQuoteActions();
  const isAllSelected =
    cart.items.length > 0 && selectedIds.length === cart.items.length;
  const router = useRouter();

  const invoiceTableHeaders = [
    { id: 1, checkbox: true, text: "Sản phẩm" },
    { id: 2, checkbox: false, text: "Đơn giá" },
    { id: 3, checkbox: false, text: "Số lượng" },
    { id: 4, checkbox: false, text: "Thành tiền" },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="pt-2">
        <Breadcrumb items={[{ name: "Giỏ hàng", url: "/cart" }]} />
      </div>

      <div className="py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Cart Items Section */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg sm:text-xl font-semibold">
                Giỏ hàng ({cart.totalItem})
              </span>

              <ConfirmPopover
                trigger={
                  <button className="text-xs sm:text-sm text-red-600 hover:text-red-700">
                    Xóa tất cả
                  </button>
                }
                title="Xóa sản phẩm"
                description="Bạn có chắc chắn muốn xóa sản phẩm này?"
                onConfirm={() => removeCart(selectedIds)}
                position="bottom"
              />
            </div>

            <div className="rounded-lg border border-gray-200 bg-white">
              {/* Desktop Table Headers - Hidden on mobile */}
              <div className="hidden md:block border-b border-gray-200 bg-gray-50 rounded-t-md">
                <div className="grid grid-cols-12 gap-2 px-4 py-3">
                  {invoiceTableHeaders.map((item) => (
                    <div
                      key={item.id}
                      className={
                        item.checkbox
                          ? "col-span-6 flex items-center gap-2"
                          : "col-span-2 text-center flex items-center"
                      }
                    >
                      {item.checkbox && (
                        <CheckboxField
                          id="checkbox-all"
                          checked={isAllSelected}
                          onChange={() =>
                            isAllSelected ? clearSelected() : selectAll()
                          }
                        />
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Header - Visible only on mobile */}
              <div className="md:hidden border-b border-gray-200 bg-gray-50 rounded-t-md px-3 py-3">
                <div className="flex items-center gap-2">
                  <CheckboxField
                    id="checkbox-all-mobile"
                    checked={isAllSelected}
                    onChange={() =>
                      isAllSelected ? clearSelected() : selectAll()
                    }
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Chọn tất cả
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="px-1 sm:px-2 py-3">
                {cart.items.length === 0 ? (
                  <p className="text-sm text-gray-600 text-center py-8">
                    Giỏ hàng trống.
                  </p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {cart.items.map((item) => (
                      <CardCart key={item.id} id={item.id} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Promotions and Payment Section */}
          <div className="lg:col-span-4 space-y-4">
            {/* Promotions Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm sm:text-base font-semibold">
                  Khuyến mãi
                </span>
                <button
                  disabled={!quote?.coupon?.length}
                  onClick={() => setOpen(true)}
                  className="text-xs sm:text-sm text-blue-600 hover:underline disabled:text-gray-400"
                >
                  Chọn hoặc nhập khuyến mãi
                </button>
              </div>

              {couponActive &&
              quote?.coupon?.some((c) => c.id === couponActive.id) && // check coupon còn tồn tại
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
                <span className="text-xs sm:text-sm text-gray-500 block">
                  Đơn hàng chưa đủ điều kiện áp dụng khuyến mãi. Vui lòng mua
                  thêm để áp dụng
                </span>
              ) : (
                <Modal
                  isOpen={open}
                  onClose={() => setOpen(false)}
                  size="md"
                  title="Khuyến mãi và mã giảm giá"
                >
                  <div className=" p-1 max-h-[70vh] sm:max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                    {quote?.coupon?.flatMap(
                      (item) =>
                        item?.couponDes?.map((i) => (
                          <CouponCard
                            key={i.id}
                            coupon={item}
                            des={i}
                            isSelected={i.code === couponCode}
                            onToggle={() => {
                              setCouponCode(
                                i.code === couponCode ? "" : i.code
                              );
                              setCouponActive(
                                i.code === couponCode ? null : item
                              );
                            }}
                          />
                        )) || []
                    )}
                  </div>
                </Modal>
              )}
            </div>

            {/* Payment Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
              <span className="text-sm sm:text-base font-semibold block mb-3">
                Thanh toán
              </span>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Tổng tạm tính
                  </span>
                  <span className="text-xs sm:text-sm font-semibold">
                    {formatPrice(quote?.totalPrice)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Giảm giá:
                  </span>
                  <span className="font-medium">
                    {" "}
                    {couponCode ? (
                      <div className="flex gap-2 items-center">
                        <div className="flex items-center justify-center p-1 border w-fit border-[#1230B0] rounded-lg">
                          <span className="text-xs text-[#1230B0]">
                            {couponCode}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm font-semibold">
                          - {formatPrice(couponActive?.value)}
                        </span>
                      </div>
                    ) : (
                      "0đ"
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Thành tiền
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-gray-900">
                    {formatPrice(quote?.finalPrice)}
                  </span>
                </div>

                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">
                    (Đã bao gồm VAT)
                  </span>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => router.push("/thanh-toan")}
                    className="w-full text-center cursor-pointer py-2.5 sm:py-2 px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 bg-[#F1F8FEFF] text-[#2a83e9] hover:bg-[#e6f3ff]"
                  >
                    Tiến hành đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

