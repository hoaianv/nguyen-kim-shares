"use client";
import { i18nText } from "@/lib/i18nText";
import { bannerKeys } from "@/constants/values.constant";
import { useStateStore } from "@/stores/stateStore";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

const HeroBanner: React.FC = () => {
  const { banner } = useStateStore();
  const bannerMain = banner?.[bannerKeys.bannerPageProduct]?.advertises?.[0];
  const bannerMini =
    banner?.[bannerKeys.bannerMiniPageProduct]?.advertises || [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const mainBannerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const miniBannerVariants = {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  // Early return if no banner data
  if (!banner || !bannerMain) {
    return (
      <section className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="lg:col-span-2 bg-gray-200 animate-pulse rounded-lg h-64"></div>
          <div className="space-y-2">
            <div className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
            <div className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Main Banner */}
        <motion.div
          className="lg:col-span-2 relative rounded-lg overflow-hidden group cursor-pointer shadow-lg"
          variants={mainBannerVariants}
          whileHover="hover"
        >
          <div className="relative overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                width={bannerMain.width}
                height={bannerMain.height}
                src={bannerMain.picture}
                alt={bannerMain.title || i18nText("AUTO.components.products.herobanner.line121_0_main_banner")}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>

            {/* Overlay gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-transparent to-slate-950/30"
              variants={overlayVariants}
              initial="hidden"
              whileHover="hover"
            />

            {/* Animated border */}
            <motion.div
              className="absolute inset-0 border-2 border-white/20 rounded-lg"
              whileHover={{
                borderColor: "rgba(255, 255, 255, 0.4)",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Mini Banners */}
        <motion.div className="space-y-2" variants={containerVariants}>
          {bannerMini.length > 0
            ? bannerMini.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  className="relative rounded-lg overflow-hidden group cursor-pointer shadow-md"
                  variants={miniBannerVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <div className="relative overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <Image
                        width={item.width}
                        height={item.height}
                        src={item.picture}
                        alt={item.title || i18nText("AUTO.components.products.herobanner.line167_1_mini_banner", { value0: index + 1 })}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"
                      variants={overlayVariants}
                      initial="hidden"
                      whileHover="hover"
                    />

                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                      whileHover={{
                        translateX: "200%",
                        transition: { duration: 0.8, ease: "easeInOut" },
                      }}
                    />

                    {/* Animated border */}
                    <motion.div
                      className="absolute inset-0 border border-white/10 rounded-lg"
                      whileHover={{
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))
            : // Fallback for empty mini banners
              Array.from({ length: 2 }).map((_, index) => (
                <motion.div
                  key={`fallback-${index}`}
                  className="bg-gray-200 animate-pulse rounded-lg h-32"
                  variants={miniBannerVariants}
                />
              ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroBanner;

