"use client";
import { motion } from "framer-motion";
import { useStateStore } from "@/stores/stateStore";
import { bannerKeys } from "@/constants/values.constant";
import Image from "next/image";
import Link from "next/link";

const bannerImageClassName =
  "h-[525px] w-[140px] rounded-lg object-fill shadow-lg";

export default function BannerLeftRight() {
  const { banner } = useStateStore();
  const bannerLeft = banner[bannerKeys.bannerLeftScreen]?.advertises[0];
  const bannerRight = banner[bannerKeys.bannerRightScreen]?.advertises[0];

  if (!bannerLeft && !bannerRight) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 hidden min-[1880px]:block">
      <div className="sticky top-[23vh] flex justify-between px-2 2xl:px-4">
        {/* Banner Left */}
        {bannerLeft && (
          <motion.div
            className="pointer-events-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
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
                className={bannerImageClassName}
                priority
              />
            </Link>
          </motion.div>
        )}

        {/* Banner Right */}
        {bannerRight && (
          <motion.div
            className="pointer-events-auto ml-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
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
                className={bannerImageClassName}
                priority
              />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
