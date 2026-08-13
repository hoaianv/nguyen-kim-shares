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
    <div className="bg-white  rounded-lg   p-3 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-2 bg-[#FFD400]/10  rounded-lg ">
          <Ticket className="h-6 w-6 text-[#FFD400]" />
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#111827] line-clamp-1">
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

