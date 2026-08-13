"use client";

import { i18nText } from "@/lib/i18nText";
import "swiper/css";
import "swiper/css/navigation";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CardPromotion from "@/components/promotion/cardPromotion";
import { IPromotion } from "@/interfaces/models/IPromotion.interface";

import HomeSectionHeader from "./HomeSectionHeader";

type PromotionLatestProps = {
  data: IPromotion[];
};

const navBase =
  "flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-primary)] text-primary-foreground shadow-sm transition hover:bg-[var(--brand-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-10 sm:w-10";

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
      <div className="overflow-hidden rounded-md border theme-border bg-[var(--theme-section-bg)] shadow-sm">
        <HomeSectionHeader
          title={i18nText("AUTO.components.home.promotionlatest.line40_0_tong_hop_khuyen_mai")}
          actionLabel={i18nText("AUTO.components.home.promotionlatest.extra42_0_xem_tat_ca")}
          actionHref="/tin-khuyen-mai"
        />

        <div className="relative px-3 pb-4 sm:px-4 sm:pb-5">
          <div className="absolute left-1 top-[44%] z-10 -translate-y-1/2 sm:left-2">
            <button
              type="button"
              className={`${navBase} promotion-swiper-button--prev`}
              aria-label={i18nText("AUTO.components.home.promotionlatest.line50_1_xem_khuyen_mai_truoc")}
            >
              <ArrowLeft size={18} strokeWidth={2} />
            </button>
          </div>

          <div className="absolute right-1 top-[44%] z-10 -translate-y-1/2 sm:right-2">
            <button
              type="button"
              className={`${navBase} promotion-swiper-button--next`}
              aria-label={i18nText("AUTO.components.home.promotionlatest.line60_2_xem_khuyen_mai_tiep_theo")}
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
            {data.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <CardPromotion item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </motion.section>
  );
}
