"use client";
import { motion } from "framer-motion";
import { useStateStore } from "@/stores/stateStore";
import { bannerKeys } from "@/constants/values.constant";
import Image from "next/image";
import Link from "next/link";

const sideBannerClassName =
  "fixed top-[28%] z-10 hidden [--side-banner-width:120px] min-[1824px]:block min-[1920px]:[--side-banner-width:160px]";

const sideBannerOffset =
  "calc((100vw - 1520px) / 2 - var(--side-banner-width) - 16px)";

export default function BannerLeftRight() {
  const { banner } = useStateStore();
  const bannerLeft = banner[bannerKeys.bannerLeftScreen]?.advertises[0];
  const bannerRight = banner[bannerKeys.bannerRightScreen]?.advertises[0];

  if (!bannerLeft && !bannerRight) return null;

  return (
    <>
      {/* Banner Left */}
      {bannerLeft && (
        <motion.div
          className={sideBannerClassName}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ left: sideBannerOffset }}
        >
          <Link
            href={bannerLeft.link || "#"}
            target={bannerLeft.target || "_blank"}
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity"
          >
            <Image
              src={bannerLeft.picture}
              alt={bannerLeft.title}
              width={bannerLeft.width}
              height={bannerLeft.height}
              className="h-auto w-[var(--side-banner-width)] rounded-lg shadow-lg"
              priority
            />
          </Link>
        </motion.div>
      )}

      {/* Banner Right */}
      {bannerRight && (
        <motion.div
          className={sideBannerClassName}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ right: sideBannerOffset }}
        >
          <Link
            href={bannerRight.link}
            target={bannerRight.target}
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity"
          >
            <Image
              src={bannerRight.picture}
              alt={bannerRight.title}
              width={bannerRight.width}
              height={bannerRight.height}
              className="h-auto w-[var(--side-banner-width)] rounded-lg shadow-lg"
              priority
            />
          </Link>
        </motion.div>
      )}
    </>
  );
}
