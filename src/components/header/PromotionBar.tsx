"use client";

import { bannerKeys } from "@/constants/values.constant";
import { useStateStore } from "@/stores/stateStore";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const PromotionBar = () => {
  const { banner } = useStateStore();
  const reduceMotion = useReducedMotion();
  const bannerTop = banner?.[bannerKeys.bannerTopHeader];

  if (bannerTop?.quantity !== 1 || bannerTop?.advertises.length !== 1) {
    return null;
  }

  const advertise = bannerTop.advertises[0];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="relative z-50 h-11 w-full overflow-hidden border-b border-border bg-foreground text-background sm:h-12"
    >
      <Link
        href={advertise.link}
        target={advertise.target}
        className="relative flex h-full w-full items-center"
      >
        <div className="absolute inset-0">
          <Image
            src={advertise.picture}
            alt={advertise.title}
            width={advertise.width}
            height={advertise.height}
            priority
            quality={90}
            className="h-full w-full object-cover opacity-55"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60" />
        </div>

        <div className="relative mx-auto flex h-full w-full max-w-[1520px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.28em] text-[#ffb716] sm:text-xs">
              Promotion
            </p>
          </div>
          <div className="hidden min-w-0 flex-1 justify-center text-center text-xs text-background/90 sm:flex">
            <span className="truncate font-medium">
              {advertise.title || "Khuyến mãi, ưu đãi và cập nhật mới nhất"}
            </span>
          </div>
          <div className="inline-flex items-center gap-2 border border-background/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ffb716] sm:text-xs">
            Xem ngay
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PromotionBar;
