"use client";

import Link from "next/link";
import Image from "next/image";
import { bannerKeys } from "@/constants/values.constant";
import { useStateStore } from "@/stores/stateStore";

export default function CategoryBanners() {
  const { banner } = useStateStore();
  const bannerCategoryAdsList =
    banner[bannerKeys.bannerCategoryDetail]?.advertises || [];

  if (!bannerCategoryAdsList.length) return null;

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
      {bannerCategoryAdsList.map((bannerItem, index) => (
        <Link
          key={bannerItem.id}
          href={bannerItem.link || "#"}
          className="group block min-w-[86%] overflow-hidden rounded-md border border-border/60 bg-background transition hover:border-amber-300 hover:shadow-sm md:min-w-0"
          aria-label={bannerItem.title ?? `Banner ${index + 1}`}
        >
          <div className="relative aspect-[24/8] overflow-hidden bg-muted/20 md:aspect-[24/6]">
            <Image
              src={bannerItem.picture}
              alt={bannerItem.title ?? `Banner ${index + 1}`}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="text-[11px] uppercase tracking-[0.24em] text-amber-200/90">
                banner danh mục
              </p>
              <p className="mt-2 max-w-md text-sm font-semibold leading-snug sm:text-base">
                {bannerItem.title}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
