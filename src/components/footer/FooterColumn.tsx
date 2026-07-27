"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FooterColumn: React.FC<FooterColumnProps> = ({
  title,
  children,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const contentId = `footer-content-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={className}>
      <button
        type="button"
        className="flex w-full items-center justify-between border-b border-slate-200 py-3 text-left text-sm font-bold uppercase text-slate-950 md:hidden"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls={`${contentId}-mobile`}
      >
        <span>{title}</span>
        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.18 }}
          className="inline-flex"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <h3 className="hidden border-b-2 border-[#ffb716] pb-2 text-sm font-extrabold uppercase text-slate-950 md:block">
        {title}
      </h3>

      <div className="md:hidden">
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              id={`${contentId}-mobile`}
              initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pt-3">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div id={contentId} className="hidden md:block">
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
};

export default FooterColumn;
