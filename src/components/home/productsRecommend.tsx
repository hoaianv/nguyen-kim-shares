"use client";

import ImageWithFallback from "@/components/ImageWithFallback";
import { IProduct } from "@/interfaces/models/IProduct.interface";
import { getPrice } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import HomeSectionHeader from "./HomeSectionHeader";

type ProductRecommendProps = {
  data: IProduct[];
};

export default function ProductsRecommend({ data }: ProductRecommendProps) {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();

  if (!data?.length) return null;

  return (
    <motion.section
      className="mx-auto mt-3 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      <div className="overflow-hidden rounded-md bg-white shadow-sm">
        <HomeSectionHeader title={t("TITLE.you_may_like")} />

        <div className="grid grid-cols-1 gap-x-4 gap-y-5 px-3 pb-4 sm:grid-cols-2 sm:px-4 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((item) => {
            const rating = Math.max(0, Math.min(5, Math.floor(item.rating ?? 0)));

            return (
              <Link
                key={item.id}
                href={`/${item.url}`}
                className="group flex min-w-0 items-center gap-3 rounded-md p-1 transition hover:bg-[#fff7da] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e6a414]"
              >
                <span className="relative flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28">
                  <ImageWithFallback
                    src={item.picture || "/images/no-images.jpg"}
                    alt={item.name}
                    width={112}
                    height={112}
                    sizes="112px"
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </span>

                <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-slate-800 group-hover:text-[#b77d00]">
                    {item.name}
                  </span>
                  <span className="text-base font-bold text-red-600">
                    {getPrice(item)}
                  </span>
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px]">
                    <span className={item.isInStock ? "text-emerald-600" : "text-slate-500"}>
                      <span aria-hidden="true">● </span>
                      {item.isInStock ? t("COMMON.in_stock") : "Hết hàng"}
                    </span>
                    <span aria-label={`Đánh giá ${item.rating ?? 0} trên 5 sao`} className="whitespace-nowrap tracking-tight">
                      <span className="text-amber-500">{"★".repeat(rating)}</span>
                      <span className="text-slate-400">{"★".repeat(5 - rating)}</span>
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
