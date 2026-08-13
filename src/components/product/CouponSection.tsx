"use client";
import React, { useState } from "react";
import { Ticket } from "lucide-react";
import { ICoupon } from "@/interfaces/models/IProduct.interface";
import CouponCard from "@/components/common/couponCard";
import { useCartStore } from "@/stores/useCartStore";
import { useTranslations } from "next-intl";

type CouponProps = {
  data: ICoupon[] | null;
};

const CouponSection = ({ data }: CouponProps) => {
  const { setCouponCode, couponCode, setCouponActive } = useCartStore();
  const t = useTranslations();

  if (!data || data.length <= 0) return null;

  return (
    <div className="rounded-lg border theme-border bg-[var(--theme-section-bg)] p-3 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <div className="rounded-lg bg-[var(--theme-section-soft)] p-2">
          <Ticket className="h-6 w-6 text-[var(--brand-primary-strong)]" />
        </div>
        <h3 className="line-clamp-1 text-base font-semibold text-[var(--theme-text)] sm:text-lg md:text-xl">
          {t("PRODUCT.choose_promotion")}
        </h3>
      </div>

      <div className="space-y-3">
        {data.flatMap(
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
    </div>
  );
};

export default CouponSection;

