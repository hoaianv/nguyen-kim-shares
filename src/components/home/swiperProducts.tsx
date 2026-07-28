"use client";

import "swiper/css";
import "swiper/css/navigation";

import { IProduct } from "@/interfaces/models/IProduct.interface";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CardProduct from "@/components/ui/cardProduct";
import {
  getResponsiveColumnCount,
  useElementWidth,
} from "@/hooks/useResponsiveColumns";

type ProductProps = {
  data: IProduct[];
  id?: number;
};

const navBase =
  "absolute z-10 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#ffb716] text-slate-950 shadow transition hover:bg-[#e6a414] md:flex";

function SwiperProducts({ data, id }: ProductProps) {
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const slidesPerView = getResponsiveColumnCount(width, {
    minWidth: 190,
    maxColumns: 5,
    gap: 12,
    fallback: 1,
  });

  return (
    <div ref={ref} className="relative">
      <Swiper
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerView}
        spaceBetween={12}
        navigation={{
          nextEl: `.nav-swiper-button--next-${id}`,
          prevEl: `.nav-swiper-button--prev-${id}`,
        }}
        loop={false}
        watchOverflow
        modules={[Navigation]}
        className="pb-1"
      >
        {data?.length > 0
          ? data.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <CardProduct item={item} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>

      <div
        className={`${navBase} left-0 nav-swiper-button--prev-${id}`}
        aria-hidden="true"
      >
        <ArrowLeft size={18} strokeWidth={1.8} />
      </div>
      <div
        className={`${navBase} right-0 nav-swiper-button--next-${id}`}
        aria-hidden="true"
      >
        <ArrowRight size={18} strokeWidth={1.8} />
      </div>
    </div>
  );
}

SwiperProducts.displayName = "SwiperProducts";

export default SwiperProducts;
