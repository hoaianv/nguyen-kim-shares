"use client";
import React from "react";
import CardProduct from "@/components/ui/cardProduct";
import { motion } from "motion/react";
import { IProduct } from "@/interfaces/models/IProduct.interface";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslations } from "next-intl";
type ProductsProps = {
  data: IProduct[] | null;
};

const RelatedProducts = ({ data }: ProductsProps) => {
  const t = useTranslations();

  if (!data || data.length <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="p-2 sm:p-3 border-b border-gray-200">
        <h3 className="text-lg font-bold sm:text-xl text-[#111827]">
          {t("PRODUCT.related_products")}
        </h3>
      </div>

      <div className="py-2 sm:py-3 relative">
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
              slidesPerGroup: 1,
            },
            360: {
              slidesPerView: 2,
              spaceBetween: 10,
              slidesPerGroup: 2,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
              slidesPerGroup: 3,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 15,
              slidesPerGroup: 4,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 15,
              slidesPerGroup: 5,
            },
          }}
          loop={true}
          navigation={{
            nextEl: ".nav-button--next",
            prevEl: ".nav-button--prev",
          }}
          modules={[Navigation]}
          className="py-2"
        >
          {data?.length > 0 &&
            data?.map((item, index) => (
              <SwiperSlide key={index}>
                <CardProduct item={item} />
              </SwiperSlide>
            ))}
        </Swiper>

        <div className="absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#A8A8A84D] flex items-center justify-center z-20 rounded-lg nav-button--prev">
          <ArrowLeft
            size={20}
            className="sm:w-[25px] sm:h-[25px]"
            strokeWidth={1.75}
          />
        </div>
        <div className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] flex items-center justify-center z-20 bg-[#A8A8A84D] rounded-lg nav-button--next">
          <ArrowRight
            size={20}
            className="sm:w-[25px] sm:h-[25px]"
            strokeWidth={1.75}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default RelatedProducts;

