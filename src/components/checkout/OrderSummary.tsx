"use client";

import { i18nText } from "@/lib/i18nText";
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
      toast.warning(i18nText("AUTO.components.checkout.ordersummary.line50_0_hay_chon_it_nhat_1"), {
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
          toast.success(response.message || i18nText("AUTO.components.checkout.ordersummary.extra65_0_thanh_toan_thanh_cong"), {
            description: i18nText("AUTO.components.checkout.ordersummary.line65_1_thanh_toan_don_hang_thanh"),
            position: "top-center",
          });
        } else {
          toast.error(response.message, {
            description: i18nText("AUTO.components.checkout.ordersummary.line70_2_thanh_toan_don_hang_khong"),
            position: "top-center",
          });
        }
      } catch (error) {
        console.error("Checkout error:", error);
        toast.error(i18nText("AUTO.components.checkout.ordersummary.line76_3_da_xay_ra_loi_he"), {
          description: i18nText("AUTO.components.checkout.ordersummary.line77_4_vui_long_thu_lai_sau"),
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] border theme-border bg-[var(--theme-section-bg)]/95 p-4 shadow-sm sm:p-6">
      <span className="theme-corner-decor -right-5 -top-5 h-20 w-20 rotate-90" />
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-950 sm:text-lg">{i18nText("AUTO.components.checkout.ordersummary.line90_5_thong_tin_don_hang")}</h3>
        <Link href="/gio-hang" className="text-xs font-medium text-[var(--brand-primary-strong)] hover:underline sm:text-sm">{i18nText("AUTO.components.checkout.ordersummary.line93_6_chinh_sua")}</Link>
      </div>

      <div className="mb-4 flex max-h-[clamp(220px,28vh,360px)] flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        {items?.length ? (
          items.map((product) => (
            <div
              key={product.id}
              className="flex items-start gap-3 rounded-[20px] border theme-border bg-[var(--theme-section-soft)] p-3"
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
                  <span className="theme-price text-sm font-semibold">
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
          <p className="text-sm text-slate-500">{i18nText("AUTO.components.checkout.ordersummary.line135_7_khong_san_pham_nao_duoc")}</p>
        )}
      </div>

      <div className="my-3 sm:my-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900 sm:text-base">{i18nText("AUTO.components.checkout.ordersummary.line143_8_khuyen_mai")}</span>
          <button
            disabled={!quote?.coupon?.length}
            onClick={() => setOpen(true)}
            className="text-xs font-medium text-[var(--brand-primary-strong)] hover:underline disabled:text-slate-400 sm:text-sm"
          >{i18nText("AUTO.components.checkout.ordersummary.line150_9_chon_hoac_nhap_khuyen_mai")}</button>
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
          <span className="block text-xs leading-relaxed text-slate-500 sm:text-sm">{i18nText("AUTO.components.checkout.ordersummary.line177_10_don_hang_chua_du_dieu")}</span>
        ) : (
          <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            size="md"
            title={i18nText("AUTO.components.checkout.ordersummary.line185_11_khuyen_mai_ma_giam_gia")}
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
          <span className="text-sm text-slate-600 sm:text-base">{i18nText("AUTO.components.checkout.ordersummary.line210_12_giam_gia")}</span>
          <span className="text-sm font-medium sm:text-base">
            {couponCode ? (
              <div className="flex items-center gap-2">
                <div className="flex w-fit items-center justify-center rounded-full border border-[var(--brand-primary)] bg-[var(--theme-section-soft)] px-2 py-1">
                  <span className="text-xs text-[var(--brand-primary-strong)]">{couponCode}</span>
                </div>
                <span>{formatPrice(couponActive?.value)}</span>
              </div>
            ) : (
              i18nText("AUTO.components.checkout.ordersummary.line220_13_0d")
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 sm:text-base">{i18nText("AUTO.components.checkout.ordersummary.line227_14_phi_van_chuyen")}</span>
          <span className="text-sm font-medium text-slate-900 sm:text-base">{i18nText("AUTO.components.checkout.ordersummary.line230_15_kinh_doanh_phan_hoi")}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-900 sm:text-base">{i18nText("AUTO.components.checkout.ordersummary.line235_16_tong_tam_tinh")}</span>
          <span className="text-sm font-medium text-slate-900 sm:text-base">
            {formatPrice(quote?.totalPrice)}
          </span>
        </div>

        <div className="flex items-end justify-between border-t border-slate-200/80 pt-3">
          <span className="text-lg font-semibold text-slate-950">{i18nText("AUTO.components.checkout.ordersummary.line242_17_thanh_tien")}</span>
          <div className="text-right">
            <div className="theme-price text-2xl font-bold">
              {formatPrice(quote?.finalPrice)}
            </div>
            <div className="text-xs text-slate-500">{i18nText("AUTO.components.checkout.ordersummary.line247_18_da_bao_gom_vat")}</div>
          </div>
        </div>
      </div>

        <Button
          onClick={() => handleOrder(payload)}
          fullWidth
          variant="primary"
          size="md"
          className="theme-cta mt-4 py-3 text-sm sm:py-4 sm:text-base"
          disabled={loading || !hasSelectedItems}
        >{i18nText("AUTO.components.checkout.ordersummary.line260_19_thanh_toan")}</Button>

      {!hasSelectedItems ? (
        <p className="mt-3 text-xs leading-relaxed text-amber-700">{i18nText("AUTO.components.checkout.ordersummary.line265_20_hay_chon_it_nhat_1")}</p>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-slate-500">{i18nText("AUTO.components.checkout.ordersummary.line270_21_nhan_thanh_toan_dong_nghia")}{" "}
        <Link href={"/"} className="text-[var(--brand-primary-strong)] hover:underline">{i18nText("AUTO.components.checkout.ordersummary.line272_22_dieu_khoan_dieu_kien")}</Link>
      </p>
    </div>
  );
};

export default memo(OrderSummary);
