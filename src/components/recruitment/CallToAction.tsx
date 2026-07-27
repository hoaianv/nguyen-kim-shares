"use client";

import { bannerKeys } from "@/constants/values.constant";
import { useStateStore } from "@/stores/stateStore";
import Image from "next/image";

export default function CallToAction() {
  const { banner } = useStateStore();

  const banners = banner[bannerKeys?.bannerInfoRecruitment]?.advertises || [];

  return (
    banners && (
      <div className="bg-white">
        <div className="mx-auto 2xl:max-w-[1520px] xl:max-w-6xl lg:max-w-4xl md:max-w-lg sm:max-w-md max-w-sm">
          <section className="  ">
            <Image
              src={banners[0]?.picture}
              width={banners[0]?.width}
              height={banners[0]?.height}
              alt={banners[0]?.title}
              className="w-full h-full"
              quality={100}
            />
          </section>
        </div>
      </div>
    )
  );
}
