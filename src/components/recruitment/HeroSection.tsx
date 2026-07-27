"use client";

import { bannerKeys } from "@/constants/values.constant";
import { useStateStore } from "@/stores/stateStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";
export default function HeroSection() {
  const { banner } = useStateStore();

  const banners = banner[bannerKeys.bannerMainRecruitment] || [];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {banners?.advertises?.length > 0 && (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          loop
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full h-full"
        >
          {banners?.advertises?.map(
            ({ id, link, target, picture, title, description }) => (
              <SwiperSlide key={id}>
                <Link href={link} target={target}>
                  <div className="relative w-full h-screen">
                    <Image
                      priority
                      src={picture}
                      alt={title}
                      fill
                      quality={100}
                      className="object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/50 px-4 text-center">
                      <h1
                        className="text-4xl md:text-4xl font-extrabold 
  bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-500 
  bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]
  "
                      >
                        {title}
                      </h1>

                      <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl  nk-delay-300">
                        {description}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
          )}
        </Swiper>
      )}
    </section>
  );
}
