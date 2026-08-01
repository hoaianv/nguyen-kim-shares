"use client";

import { i18nText } from "@/lib/i18nText";
import Image from "next/image";
import Link from "next/link";
import { bannerKeys } from "@/constants/values.constant";
import { useStateStore } from "@/stores/stateStore";

export default function CategoryBanners() {
  const { banner } = useStateStore();
  const bannerCategoryAdsList =
    banner[bannerKeys.bannerCategoryDetail]?.advertises || [];

  if (!bannerCategoryAdsList.length) return null;

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 pb-1 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
      {bannerCategoryAdsList.map((bannerItem, index) => (
        <Link
          key={bannerItem.id}
          href={bannerItem.link || "#"}
          className="block min-w-[86%] overflow-hidden rounded-sm md:min-w-0"
          aria-label={bannerItem.title ?? i18nText("AUTO.components.category.categorybanners.line22_0_banner", { value0: index + 1 })}
        >
          <div className="relative aspect-[24/8] overflow-hidden md:aspect-[7/1]">
            <Image
              src={bannerItem.picture}
              alt={bannerItem.title ?? i18nText("AUTO.components.category.categorybanners.line27_1_banner", { value0: index + 1 })}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
