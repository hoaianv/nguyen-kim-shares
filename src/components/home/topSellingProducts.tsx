"use client";

import { IProduct } from "@/interfaces/models/IProduct.interface";
import { motion, useReducedMotion } from "motion/react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import CardProduct from "@/components/ui/cardProduct";
import {
  getResponsiveColumnCount,
  useElementWidth,
} from "@/hooks/useResponsiveColumns";

import "swiper/css";
import "swiper/css/navigation";

type ProductProps = {
  data: IProduct[];
};

const navBase =
  "flex h-9 w-9 items-center justify-center rounded bg-white/35 text-slate-950 transition hover:bg-white hover:text-[#e6a414]";

const TopSellingProducts = ({ data }: ProductProps) => {
  const reduceMotion = useReducedMotion();
  const { ref, width } = useElementWidth<HTMLDivElement>();

  if (!data?.length) return null;

  const slidesPerView = getResponsiveColumnCount(width, {
    minWidth: 228,
    maxColumns: 6,
    gap: 10,
    fallback: 2,
  });

  return (
    <motion.section
      className="mx-auto mt-3 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      <div className="overflow-hidden rounded-md bg-white shadow-sm">
        <div className="relative">

          <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-2 sm:flex">
            <button
              type="button"
              className={`${navBase} nav-button--prev`}
              aria-label="Xem sản phẩm trước"
            >
              <ArrowLeft size={18} strokeWidth={2} />
            </button>
            <button
              type="button"
              className={`${navBase} nav-button--next`}
              aria-label="Xem sản phẩm tiếp theo"
            >
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="grid gap-3 p-3">
          <div ref={ref} className="min-w-0">
            <Swiper
              slidesPerView={slidesPerView}
              slidesPerGroup={slidesPerView}
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
                  <CardProduct item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

TopSellingProducts.displayName = "TopSellingProducts";

export default TopSellingProducts;
