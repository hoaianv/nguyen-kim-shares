"use client";

import "swiper/css";
import "swiper/css/navigation";

import CardProduct from "@/components/ui/cardProduct";
import { bannerKeys } from "@/constants/values.constant";
import { IProduct } from "@/interfaces/models/IProduct.interface";
import { useStateStore } from "@/stores/stateStore";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export interface ProductCarouselSectionProps {
  data: IProduct[];
  bannerKey?: string;
}

const navBase =
  "flex h-9 w-9 items-center justify-center rounded bg-white/35 text-slate-950 transition hover:bg-white hover:text-[#e6a414]";

export default function ProductCarouselSection({
  data,
  bannerKey = bannerKeys.bannerTopSellingHome,
}: ProductCarouselSectionProps) {
  const reduceMotion = useReducedMotion();
  const { banner } = useStateStore();
  const bannerItem = banner?.[bannerKey]?.advertises?.[0];

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
        {bannerItem ? (
          <div className="relative mb-4 h-28 overflow-hidden">
            <Image
              alt={bannerItem.title}
              src={bannerItem.picture}
              fill
              sizes="(max-width: 768px) 100vw, 1520px"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="relative">
          <div className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-2 sm:flex">
            <button
              type="button"
              className={`${navBase} nav-button--prev`}
              aria-label="Previous product"
            >
              <ArrowLeft size={18} strokeWidth={2} />
            </button>
            <button
              type="button"
              className={`${navBase} nav-button--next`}
              aria-label="Next product"
            >
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="grid gap-3 px-3 pb-3">
          <div className="min-w-0">
            <Swiper className="py-3"
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                768: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                1024: {
                  slidesPerView: 5,
                  slidesPerGroup: 5,
                },
              }}
              spaceBetween={10}
              loop={false}
              navigation={{
                nextEl: ".nav-button--next",
                prevEl: ".nav-button--prev",
              }}
              modules={[Navigation]}
            >
              {data.map((item) => (
                <SwiperSlide key={item.id} className="h-auto">
                  <div className="py-2">
                    <CardProduct item={item} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

ProductCarouselSection.displayName = "ProductCarouselSection";
