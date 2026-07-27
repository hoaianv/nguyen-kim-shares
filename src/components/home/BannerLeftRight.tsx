"use client";

import { bannerKeys } from "@/constants/values.constant";
import { useStateStore } from "@/stores/stateStore";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import HomeSectionHeader from "./HomeSectionHeader";

export default function BannerLeftRight() {
  const { banner } = useStateStore();
  const bannerLeft = banner[bannerKeys.bannerLeftScreen]?.advertises?.[0];
  const bannerRight = banner[bannerKeys.bannerRightScreen]?.advertises?.[0];
  const reduceMotion = useReducedMotion();

  const items = [bannerLeft, bannerRight].filter(
    Boolean
  ) as NonNullable<typeof bannerLeft>[];

  if (!items.length) return null;

  return (
    <motion.section
      className="mx-auto mt-3 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <HomeSectionHeader
        eyebrow="support rail"
        title="Điểm nhấn hỗ trợ"
        description="Hai banner phụ được đặt vào dòng nội dung chính để giữ nhịp showroom liền mạch."
        divider={false}
      />

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item?.id}
            href={item?.link || "#"}
            target={item?.target}
            className="group block overflow-hidden rounded-lg border border-border bg-muted/20"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Image
                src={item.picture}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/32 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#ffedb8] drop-shadow">
                  banner hỗ trợ
                </p>
                <p className="mt-2 line-clamp-2 text-base font-semibold leading-snug drop-shadow-[0_1px_2px_rgba(15,23,42,0.45)]">
                  {item.title}
                </p>
                {item.description ? (
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/76">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}

