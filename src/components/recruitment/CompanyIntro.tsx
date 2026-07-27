"use client";

import { bannerKeys } from "@/constants/values.constant";
import { useStateStore } from "@/stores/stateStore";
import Image from "next/image";

export default function CompanyIntro() {
  const { banner } = useStateStore();

  const bannerCompany = banner[bannerKeys?.bannerAboutCompany] || [];
  const bannerPartner =
    banner[bannerKeys?.bannerPartnerMajor]?.advertises[0] || [];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="mx-auto 2xl:max-w-[1520px] xl:max-w-6xl lg:max-w-4xl md:max-w-lg sm:max-w-md max-w-sm">
        {bannerCompany && (
          <div>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {bannerCompany.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                {bannerCompany.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {bannerCompany?.advertises?.map((item, index) => (
                <div
                  key={index}
                  className="
      group relative overflow-hidden rounded-lg
      ring-slate-200/60 bg-white/5
      transition-all duration-500 hover:ring-[#FFD500]/60
    "
                >
                  <Image
                    src={item.picture}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    quality={100}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />

                  {/* Vệt “shine” lướt qua */}
                  <span
                    className="
        pointer-events-none absolute inset-y-0 -left-1/4 w-1/2
        bg-gradient-to-r from-transparent via-white/30 to-transparent
        -skew-x-12
        -translate-x-[150%] group-hover:translate-x-[150%]
        transition-transform duration-700
      "
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {bannerPartner && (
          <div
            className="
    group relative overflow-hidden rounded-lg
    bg-white 
    transition-all duration-500
    hover:scale-105  
  "
          >
            <Image
              src={bannerPartner.picture}
              width={bannerPartner.width}
              height={bannerPartner.height}
              alt={bannerPartner.title}
              loading="lazy"
              quality={100}
              className="
              rounded-lg
      w-full h-auto object-contain p-4
      transition-transform duration-500
      group-hover:scale-105
    "
            />
          </div>
        )}
      </div>
    </section>
  );
}

