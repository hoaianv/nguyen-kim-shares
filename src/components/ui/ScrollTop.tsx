"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const threshold = window.innerWidth < 640 ? 200 : 300;

      setIsVisible(window.pageYOffset > threshold);
    };

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={scrollToTop}
          className="
              fixed z-50
              bottom-4 right-4
              sm:bottom-6 sm:right-6
              lg:bottom-8 lg:right-8
              inline-flex items-center justify-center
              h-11 w-11 sm:h-12 sm:w-12
              rounded-full
              border border-brand
              bg-gradient-to-br from-brand to-brand-hover text-brand-deep
              shadow-[0_14px_30px_-14px_rgba(226,185,10,0.8)]
              transition-all duration-300
              hover:brightness-105
              touch-manipulation
              select-none
            "
          style={{ WebkitTapHighlightColor: "transparent" }}
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <ChevronUp size={20} className="sm:h-6 sm:w-6 lg:h-6 lg:w-6" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollTop;

