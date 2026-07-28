"use client";

import "swiper/css";
import "swiper/css/navigation";

import { IPromotion } from "@/interfaces/models/IPromotion.interface";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CardPromotion from "@/components/promotion/cardPromotion";

type PromotionLatestProps = {
  data: IPromotion[];
};

const navBase =
  "flex h-8 w-8 items-center justify-center rounded-full bg-[#ffb716] text-slate-950 shadow-sm transition hover:bg-[#e6a414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb716]/40 sm:h-10 sm:w-10";

export default function PromotionLatest({ data }: PromotionLatestProps) {
  const reduceMotion = useReducedMotion();

  if (!data?.length) {
    return null;
  }

  return (
    <motion.section
      className="mx-auto mt-3 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70">
        <div className="flex items-start justify-between gap-3 px-3 pb-3 pt-3 sm:px-4 sm:pb-4 sm:pt-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={[
                "relative inline-flex h-10 items-center bg-[#ffb716] pl-4 pr-5 text-sm font-extrabold uppercase tracking-[0.12em] text-slate-950 sm:h-11 sm:text-base",
                "after:absolute after:right-[-18px] after:top-0 after:h-full after:w-0 after:border-y-[22px] after:border-y-transparent after:border-l-[18px] after:border-l-[#ffb716] sm:after:border-y-[22px] sm:after:border-l-[18px]",
              ].join(" ")}
            >
              Tổng hợp khuyến mãi
            </div>
          </div>

          <Link
            href="/tin-khuyen-mai"
            className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 transition hover:text-[#c69208] sm:text-sm"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="relative px-3 pb-4 sm:px-4 sm:pb-5">
          <div className="absolute left-1 top-[44%] z-10 -translate-y-1/2 sm:left-2">
            <button
              type="button"
              className={`${navBase} promotion-swiper-button--prev`}
              aria-label="Xem khuyến mãi trước"
            >
              <ArrowLeft size={18} strokeWidth={2} />
            </button>
          </div>

          <div className="absolute right-1 top-[44%] z-10 -translate-y-1/2 sm:right-2">
            <button
              type="button"
              className={`${navBase} promotion-swiper-button--next`}
              aria-label="Xem khuyến mãi tiếp theo"
            >
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".promotion-swiper-button--next",
              prevEl: ".promotion-swiper-button--prev",
            }}
            loop={data.length > 3}
            watchOverflow
            spaceBetween={16}
            slidesPerView={1.08}
            slidesPerGroup={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
            }}
            className={[
              "promotion-latest-swiper",
              "[&_.swiper-wrapper]:items-stretch",
              "[&_.swiper-slide]:h-auto",
              "[&_.swiper-slide]:pb-0.5",
              "[--swiper-navigation-size:18px]",
            ].join(" ")}
          >
            {data.map((item) => {


              return (
                <SwiperSlide key={item.id} className="h-auto">
                  <CardPromotion item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </motion.section>
  );
}
