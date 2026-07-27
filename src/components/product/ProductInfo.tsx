"use client";

import React, { useState } from "react";
import {
  CheckCircle,
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
};

const ProductInfo = ({ data }: ProductsProps) => {
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
    toast.success("Sao chép thành công", {
      description: data?.name,
      position: "top-center",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm lg:grid-cols-10"
    >
      <div className="bg-white lg:col-span-4 lg:border-r lg:border-slate-200">
        <div className="border-b-2 border-[#ffb716] bg-white px-3 py-2 text-xs font-extrabold uppercase text-slate-700 sm:px-4">
          Hình ảnh sản phẩm
        </div>
        <ProductGallery nameProduct={data.name} data={data.images ?? []} />
      </div>

      <div className="lg:col-span-6">
        <div className="space-y-4 p-3 sm:p-4 lg:sticky lg:top-24 lg:p-5">
          <div className="space-y-3 border-b border-slate-100 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-sm px-2 py-1 text-[11px] font-extrabold uppercase ${
                  data.isInStock
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {data.isInStock ? t("COMMON.in_stock") : "Hết hàng"}
              </span>

              {data.brand ? (
                <span className="inline-flex items-center rounded-sm bg-[#fff7da] px-2 py-1 text-[11px] font-extrabold uppercase text-[#b77900]">
                  {data.brand}
                </span>
              ) : null}

              {data.productCode ? (
                <span className="text-xs font-medium text-slate-500">
                  SKU:{" "}
                  <span className="font-semibold text-slate-900">
                    {data.productCode}
                  </span>
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h1 className="text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl">
                  {data.name}
                </h1>
                {data.name2 ? (
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
                    {data.name2}
                  </p>
                ) : null}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <ButtonFavorite
                  id={data.id}
                  favorite={data.isFavorite}
                  name={data.name}
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 transition hover:border-[#ffb716] hover:text-slate-950"
                  aria-label="Chia sẻ sản phẩm"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i + 1 <= Math.floor(data?.rating ?? 0)
                        ? "fill-amber-400 text-amber-400"
                        : i < (data?.rating ?? 0)
                        ? "fill-amber-400 text-amber-400 opacity-50"
                        : "text-slate-300"
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm text-slate-500">
                  {data?.rating ?? "Chưa có đánh giá"}
                </span>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 bg-[#fffdf5] p-4">
            <div className="space-y-3">
              <div className="text-xs font-extrabold uppercase text-rose-600">
                Giá bán tại Nguyễn Kim
              </div>

              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-extrabold text-rose-600 sm:text-4xl">
                  {getPrice(data, couponActive?.value)}
                </span>
                <span className="text-sm font-medium text-slate-500">
                  (Đã bao gồm VAT)
                </span>
                {discount > 0 ? (
                  <span className="rounded-sm bg-rose-600 px-2 py-1 text-sm font-extrabold text-white">
                    -{discount}%
                  </span>
                ) : null}
              </div>

              {marketPrice ? (
                <div className="flex flex-wrap items-baseline gap-2 text-sm">
                  <span className="font-medium text-slate-600">
                    Giá thị trường:
                  </span>
                  <span className="text-slate-400 line-through">
                    {marketPrice}
                  </span>
                </div>
              ) : null}

              {data?.isInStock ? (
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                  <CheckCircle size={16} />
                  Sẵn sàng giao ngay
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => (window.location.href = `tel:${hotline}`)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-rose-600"
                >
                  <Phone size={16} />
                  Liên hệ để được hỗ trợ
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4 border border-slate-200 bg-white p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="text-sm font-semibold text-slate-900">
                {t("PRODUCT.quantity")}:
              </label>
              <div className="inline-flex items-center overflow-hidden rounded-sm border border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="h-11 w-11 text-base text-slate-700 transition hover:bg-slate-50"
                  aria-label="Giảm số lượng"
                >
                  -
                </button>
                <span className="min-w-[3rem] px-4 py-2 text-center text-sm text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-11 w-11 text-base text-slate-700 transition hover:bg-slate-50"
                  aria-label="Tăng số lượng"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {data?.isInStock ? (
                <>
                  <Button
                    variant="warning"
                    icon={ShoppingCart}
                    className="flex-1 rounded-sm py-3 text-sm font-extrabold uppercase"
                    onClick={async () => {
                      const res = await addToCart([{ product: data, quantity }]);
                      cartToast(res, router);
                    }}
                  >
                    {t("COMMON.add_to_cart")}
                  </Button>
                  <Button
                    variant="primary"
                    icon={Zap}
                    className="flex-1 rounded-sm py-3 text-sm font-extrabold uppercase"
                    onClick={buyNow(data, quantity)}
                  >
                    {t("COMMON.buy_now")}
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  icon={Phone}
                  className="flex-1 rounded-sm py-3 text-sm font-extrabold uppercase"
                  onClick={() => (window.location.href = `tel:${hotline}`)}
                >
                  {t("COMMON.contact")}
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="flex items-start gap-2 border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
              <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#e6a414]" />
              <span>Đóng gói kỹ, giao hàng nhanh</span>
            </div>
            <div className="flex items-start gap-2 border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#e6a414]" />
              <span>Bảo hành theo tiêu chuẩn hãng</span>
            </div>
            <div className="flex items-start gap-2 border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#e6a414]" />
              <span>Tư vấn cấu hình trước khi mua</span>
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
