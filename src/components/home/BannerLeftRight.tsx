"use client";
import { motion } from "framer-motion";
import { useStateStore } from "@/stores/stateStore";
import { bannerKeys } from "@/constants/values.constant";
import Image from "next/image";
import Link from "next/link";

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
          className="fixed left-2 top-[28%] z-10 hidden xl:block 2xl:left-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "fixed" }}
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
              className="rounded-lg shadow-lg w-[100px] h-auto xl:w-[120px] 2xl:w-[160px]"
              priority
            />
          </Link>
        </motion.div>
      )}

      {/* Banner Right */}
      {bannerRight && (
        <motion.div
          className="fixed right-2 top-[28%] z-10 hidden xl:block 2xl:right-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "fixed" }}
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
              className="rounded-lg shadow-lg w-[100px] h-auto xl:w-[120px] 2xl:w-[160px]"
              priority
            />
          </Link>
        </motion.div>
      )}
    </>
  );
}