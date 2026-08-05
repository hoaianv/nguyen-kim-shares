"use client";

import { i18nText } from "@/lib/i18nText";
import { useEffect, useRef, useState } from "react";

import { bannerKeys } from "@/constants/values.constant";
import { useStateStore } from "@/stores/stateStore";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

export default function Banner() {
  const { banner } = useStateStore();
  const reduceMotion = useReducedMotion();

  const mainSwiperRef = useRef<SwiperType | null>(null);
  const tabSwiperRef = useRef<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const mainAds =
    banner[bannerKeys.bannerMainHome]?.advertises ?? [];

  useEffect(() => {
    if (mainAds.length === 0 || activeIndex < mainAds.length) {
      return;
    }

    setActiveIndex(0);

    if (mainAds.length > 1) {
      mainSwiperRef.current?.slideToLoop(0);
    } else {
      mainSwiperRef.current?.slideTo(0);
    }

    tabSwiperRef.current?.slideTo(0);
  }, [activeIndex, mainAds.length]);

  const handleMainSlideChange = (swiper: SwiperType) => {
    const nextIndex = swiper.realIndex;

    setActiveIndex(nextIndex);

    tabSwiperRef.current?.slideTo(
      nextIndex,
      reduceMotion ? 0 : 400,
    );
  };

  const handleTabClick = (index: number) => {
    setActiveIndex(index);

    tabSwiperRef.current?.slideTo(
      index,
      reduceMotion ? 0 : 400,
    );

    if (mainAds.length > 1) {
      mainSwiperRef.current?.slideToLoop(
        index,
        reduceMotion ? 0 : 600,
      );

      return;
    }

    mainSwiperRef.current?.slideTo(
      index,
      reduceMotion ? 0 : 600,
    );
  };

  if (mainAds.length === 0) {
    return null;
  }

  return (
    <motion.section
      className="mx-auto pt-3 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.36,
        ease: "easeOut",
      }}
    >
      <div className="min-w-0 overflow-hidden rounded-md bg-white shadow-md">
        <div className="relative aspect-[16/7] w-full overflow-hidden bg-slate-100 sm:aspect-[3/1]">
          <Swiper
            modules={[Autoplay, Navigation]}
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper;
            }}
            onSlideChange={handleMainSlideChange}
            loop={mainAds.length > 1}
            navigation={mainAds.length > 1}
            speed={reduceMotion ? 0 : 600}
            autoplay={
              mainAds.length > 1 && !reduceMotion
                ? {
                  delay: 4500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
                : false
            }
            className={[
              "h-full w-full",
              "[--swiper-navigation-size:18px]",
              "[&_.swiper-button-next]:right-3",
              "[&_.swiper-button-prev]:left-3",
              "[&_.swiper-button-next]:h-11",
              "[&_.swiper-button-next]:w-11",
              "[&_.swiper-button-prev]:h-11",
              "[&_.swiper-button-prev]:w-11",
              "[&_.swiper-button-next]:rounded-full",
              "[&_.swiper-button-prev]:rounded-full",
              "[&_.swiper-button-next]:bg-slate-950/55",
              "[&_.swiper-button-prev]:bg-slate-950/55",
              "[&_.swiper-button-next]:text-white",
              "[&_.swiper-button-prev]:text-white",
              "[&_.swiper-button-next]:shadow-md",
              "[&_.swiper-button-prev]:shadow-md",
              "[&_.swiper-button-next]:backdrop-blur-sm",
              "[&_.swiper-button-prev]:backdrop-blur-sm",
              "[&_.swiper-button-next]:transition-colors",
              "[&_.swiper-button-prev]:transition-colors",
              "[&_.swiper-button-next:hover]:bg-slate-950/75",
              "[&_.swiper-button-prev:hover]:bg-slate-950/75",
            ].join(" ")}
          >
            {mainAds.map((item, index) => (
              <SwiperSlide key={item.id} className="h-full">
                <Link
                  href={item.link || "/san-pham"}
                  target={item.target || "_self"}
                  rel={
                    item.target === "_blank"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group relative block h-full w-full overflow-hidden"
                >
                  <Image
                    priority={index === 0}
                    src={item.picture}
                    alt={item.title}
                    fill
                    quality={92}
                    sizes="(max-width: 640px) 100vw, (max-width: 1520px) calc(100vw - 48px), 1520px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Swiper
          onSwiper={(swiper) => {
            tabSwiperRef.current = swiper;
          }}
          slidesPerView={1.25}
          slidesPerGroup={1}
          spaceBetween={0}
          speed={reduceMotion ? 0 : 400}
          watchSlidesProgress
          allowTouchMove
          breakpoints={{
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="w-full border-t border-slate-100 bg-white"
        >
          {mainAds.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <SwiperSlide
                key={item.id}
                className="h-auto border-r border-slate-100 last:border-r-0"
              >
                <button
                  type="button"
                  onClick={() => handleTabClick(index)}
                  aria-label={i18nText("AUTO.components.home.banner.line199_0_chuyen_den_banner", { value0: item.title })}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "relative flex min-h-[82px] w-full flex-col items-center justify-center px-4 py-3 text-center",
                    "transition-colors duration-200",
                    "hover:bg-slate-50",
                    "focus-visible:z-10 focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ffb716]",
                    isActive ? "bg-slate-50" : "bg-white",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "w-full truncate text-xs uppercase leading-5 sm:text-sm",
                      isActive
                        ? "font-bold text-slate-950"
                        : "font-medium text-slate-700",
                    ].join(" ")}
                  >
                    {item.title}
                  </span>



                  <span
                    className={[
                      "absolute inset-x-0 bottom-0 h-0.5 origin-center bg-[#ffb716] transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </motion.section>
  );
}