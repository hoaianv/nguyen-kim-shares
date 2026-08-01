"use client";

import { i18nText } from "@/lib/i18nText";
import React, { useState } from "react";
import {
  PackageCheck,
  Phone,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";
import Button from "@/components/ui/button";
import ProductGallery from "@/components/product/ProductGallery";
import { motion } from "motion/react";
import Promotions from "@/components/product/Promotions";
import CouponSection from "@/components/product/CouponSection";
import { IProduct } from "@/interfaces/models/IProduct.interface";
import { toast } from "sonner";
import {
  calcDiscountPercentage,
  cartToast,
  getMarketPrice,
  getPrice,
} from "@/lib/utils";
import { hotline } from "@/constants/company.constant";
import { useCartActions } from "@/hooks/useCartActions";
import { useCartStore } from "@/stores/useCartStore";
import ButtonFavorite from "@/components/product/ButtonFavorite";
import { useBuyAction } from "@/hooks/useBuyAction";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type ProductsProps = {
  data: IProduct;
  hasSpecifications: boolean;
};

const ProductInfo = ({ data, hasSpecifications }: ProductsProps) => {
  const [quantity, setQuantity] = useState(1);
  const { couponActive, setSelectedIds } = useCartStore();
  const t = useTranslations();
  const router = useRouter();
  const { buyNow } = useBuyAction(setSelectedIds);
  const { addToCart } = useCartActions();
  const marketPrice = getMarketPrice(data);
  const discount =
    data.isInStock && data.marketPrice
      ? calcDiscountPercentage(data.price, data.marketPrice)
      : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(i18nText("AUTO.components.product.productinfo.line54_0_sao_chep_thanh_cong"), {
      description: data?.name,
      position: "top-center",
    });
  };

  const navigateToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    section.focus({ preventScroll: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 overflow-hidden bg-white lg:grid-cols-10 lg:items-start"
    >
      <div className="bg-white lg:col-span-5 lg:self-start">
        <ProductGallery
          nameProduct={data.name}
          data={data.images ?? []}
          warranty={data.warranty}
          hotline={hotline}
          hasSpecifications={hasSpecifications}
          onNavigateToSection={navigateToSection}
        />
      </div>

      <div className="lg:col-span-5 lg:self-start">
        <div className="space-y-4 p-3 sm:p-4 lg:p-5">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-5">
              <div className="min-w-0">
                <h1 className="text-xl font-extrabold leading-snug text-slate-950 sm:text-2xl">
                  {data.name}
                </h1>
                {data.name2 ? (
                  <p className="mt-1 text-sm leading-snug text-slate-500">
                    {data.name2}
                  </p>
                ) : null}
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <ButtonFavorite
                  id={data.id}
                  favorite={data.isFavorite}
                  name={data.name}
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 transition hover:border-brand hover:text-slate-950"
                  aria-label={i18nText("AUTO.components.product.productinfo.line111_1_chia_se_san_pham")}
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="text-slate-600">{i18nText("AUTO.components.product.productinfo.line120_2_ma_san_pham")}{" "}
                <span className="font-semibold text-slate-900">
                  {data.productCode || "-"}
                </span>
              </span>
              <span className="text-slate-300" aria-hidden="true">
                |
              </span>
              <div
                className="flex items-center gap-0.5"
                aria-label={i18nText("AUTO.components.product.productinfo.line130_3_danh_gia_sao", { value0: data.rating ?? 0 })}
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i + 1 <= Math.floor(data.rating ?? 0)
                        ? "fill-brand text-brand"
                        : i < (data.rating ?? 0)
                          ? "fill-brand text-brand opacity-50"
                          : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium text-slate-700">
                {data.rating ?? 0}
              </span>
            </div>

            <div className="text-sm text-slate-700">
              <span className="font-medium">{i18nText("AUTO.components.product.productinfo.line151_4_thuong_hieu")}</span>{" "}
              <span>{data.brand || i18nText("AUTO.components.product.productinfo.line152_5_dang_cap_nhat")}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
              <span className="font-medium">{i18nText("AUTO.components.product.productinfo.line156_6_tinh_trang")}</span>
              <span
                className={`inline-flex items-center rounded-sm px-2 py-1 text-[11px] font-extrabold uppercase ${
                  data.isInStock
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {data.isInStock ? t("COMMON.in_stock") : i18nText("AUTO.components.product.productinfo.line164_7_het_hang")}
              </span>
            </div>
          </div>

          <div className="border-y border-slate-200 py-4">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="text-3xl font-extrabold text-rose-600 sm:text-4xl">
                {getPrice(data, couponActive?.value)}
              </span>
              {marketPrice ? (
                <span className="text-base font-semibold text-slate-400 line-through">
                  {marketPrice}
                </span>
              ) : null}
              {discount > 0 ? (
                <span className="text-sm font-extrabold text-rose-600">
                  -{discount}%
                </span>
              ) : null}
            </div>
            <span className="mt-1 block text-xs font-medium text-slate-500">{i18nText("AUTO.components.product.productinfo.line186_8_da_bao_gom_vat")}</span>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-900">
                {t("PRODUCT.quantity")}:
              </label>
              <div className="inline-flex w-fit items-center overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="h-10 w-10 border-r border-slate-200 text-lg text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
                  aria-label={i18nText("AUTO.components.product.productinfo.line200_9_giam_so_luong")}
                >
                  -
                </button>
                <span className="min-w-[5rem] px-4 py-2 text-center text-sm font-medium text-slate-700">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 border-l border-slate-200 text-lg text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                  aria-label={i18nText("AUTO.components.product.productinfo.line211_10_tang_so_luong")}
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              {data?.isInStock ? (
                <>
                  <Button
                    variant="outline"
                    icon={ShoppingCart}
                    className="w-full rounded-sm border-rose-600 py-3 text-sm font-extrabold uppercase text-rose-600 hover:bg-rose-50"
                    onClick={async () => {
                      const res = await addToCart([
                        { product: data, quantity },
                      ]);
                      cartToast(res, router);
                    }}
                  >
                    {t("COMMON.add_to_cart")}
                  </Button>
                  <Button
                    variant="danger"
                    icon={Zap}
                    className="w-full rounded-sm py-3 text-sm font-extrabold uppercase"
                    onClick={buyNow(data, quantity)}
                  >
                    {t("COMMON.buy_now")}
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  icon={Phone}
                  className="w-full rounded-sm py-3 text-sm font-extrabold uppercase"
                  onClick={() => (window.location.href = `tel:${hotline}`)}
                >
                  {t("COMMON.contact")}
                </Button>
              )}
            </div>
          </div>

          <CouponSection data={data.coupon ?? null} />
          <Promotions data={data.present ?? null} />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductInfo;
