"use client";

import { bannerKeys } from "@/constants/values.constant";
import { useStateStore } from "@/stores/stateStore";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import HomeSectionHeader from "./HomeSectionHeader";

interface BannerProps {
  bannerKey?: (typeof bannerKeys)[keyof typeof bannerKeys];
  columns?: 2 | 3 | 4 | 5 | 6;
  gap?: 2 | 3 | 4 | 6 | 8;
  className?: string;
}

const GRID_CLASSES: Record<NonNullable<BannerProps["columns"]>, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
  6: "sm:grid-cols-2 lg:grid-cols-6",
};

export const GroupBanner = ({
  bannerKey = bannerKeys.bannerGroupFour,
  columns = 4,
  className = "",
}: BannerProps) => {
  const { banner } = useStateStore();
  const advertises = banner?.[bannerKey]?.advertises ?? [];
  const reduceMotion = useReducedMotion();

  if (!advertises.length) return null;

  const title =
    bannerKey === bannerKeys.bannerGroupFour
      ? "Khuyến mãi trong tuần"
      : "Ưu đãi theo ngành hàng";

  const description =
    bannerKey === bannerKeys.bannerGroupFour
      ? "Các chương trình đang chạy được gom thành một dải dễ bấm."
      : "Banner phụ cho từng nhóm nhu cầu mua sắm.";

  return (
    <motion.section
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      <div className="mx-auto mt-3 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6">
        <HomeSectionHeader
          eyebrow="Ưu đãi"
          title={title}
          description={description}
        />

        <div
          className={`grid gap-3 rounded-b-md bg-white p-3 shadow-sm ${GRID_CLASSES[columns]}`}
        >
          {advertises.slice(0, columns).map((item) => (
            <Link
              key={item.id}
              href={item.link || "#"}
              target={item.target}
              className="group block overflow-hidden rounded-sm border border-slate-200 bg-white transition hover:border-[#ffb716]"
            >
              <div className="relative aspect-[16/7.8] overflow-hidden bg-slate-100">
                <Image
                  src={item.picture}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 360px"
                  quality={92}
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>

            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
