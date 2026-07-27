"use client";

import { IProduct } from "@/interfaces/models/IProduct.interface";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight, Flame } from "lucide-react";

import HomeSectionHeader from "./HomeSectionHeader";
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
  const t = useTranslations();
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
          <HomeSectionHeader
            eyebrow="Hot"
            title={t("TITLE.featured_products")}
            description="Sản phẩm đang được quan tâm nhiều, ưu tiên hiển thị giá và tình trạng hàng."
            actionLabel={t("COMMON.view_all")}
            actionHref="/san-pham"
            className="pr-24"
          />

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

        <div className="grid gap-3 p-3 xl:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden rounded-sm bg-[#fff7d6] p-4 xl:block">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-[#ffb716] text-slate-950">
              <Flame className="h-6 w-6" />
            </div>
            <p className="mt-4 text-xl font-extrabold leading-tight text-slate-950">
              Hàng bán chạy trong hệ thống
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Lọc nhanh theo các sản phẩm có nhu cầu mua cao để khách dễ so sánh
              ngay trên trang chủ.
            </p>
          </aside>

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
