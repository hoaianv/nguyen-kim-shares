"use client";

import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

import SwiperProducts from "@/components/home/swiperProducts";
import {
  ICategoriesProducts,
  ICategoryCustomerNeed,
} from "@/interfaces/models/ICategories.interface";

type CategoriesProductsProps = {
  data: ICategoriesProducts[];
};

type CategoriesProductsSectionProps = {
  item: ICategoriesProducts;
  reduceMotion: boolean;
};

const CategoriesProductsSection = ({
  item,
  reduceMotion,
}: CategoriesProductsSectionProps) => {
  const t = useTranslations();
  const needs = item.customerNeeds ?? [];
  const [activeNeedId, setActiveNeedId] = useState<number | null>(
    needs[0]?.id ?? null,
  );

  const activeNeed =
    needs.find((need) => need.id === activeNeedId) ?? needs[0] ?? null;
  const hasTabs = needs.length > 1;
  const viewAllHref = activeNeed?.url || item.url || "/san-pham";
  const sectionColor = item.color
    ? `#${item.color.replace(/^#/, "")}`
    : "#e1f1ff";

  if (!needs.length || !activeNeed) return null;

  return (
    <motion.section
      className="mx-auto mt-4 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
        {hasTabs ? (
          <div className="overflow-x-auto bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
            <div className="grid min-w-max grid-flow-col auto-cols-[minmax(170px,1fr)] lg:min-w-0 lg:auto-cols-fr">
              {needs.map((need: ICategoryCustomerNeed) => {
                const isActive = need.id === activeNeed.id;
                return (
                  <button
                    key={need.id}
                    type="button"
                    onClick={() => setActiveNeedId(need.id)}
                    style={{ "--item-color": sectionColor } as React.CSSProperties}
                    className={`relative flex min-h-[64px] items-center justify-center px-4 py-2 text-center transition-colors duration-200 sm:min-h-[70px] ${isActive
                      ? "rounded-t-lg bg-[var(--item-color)] text-red-600"
                      : "bg-white text-red-600 hover:bg-[var(--item-color)]"
                      }`}
                  >
                    <span className="line-clamp-2 text-[15px] font-bold leading-tight sm:text-[17px]">
                      {need.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[64px] items-stretch justify-between bg-white sm:min-h-[70px]">
            <div
              style={{ backgroundColor: sectionColor }}
              className="flex w-[46%] max-w-[280px] items-center justify-center rounded-t-lg px-3 py-2 text-center text-[15px] font-bold leading-tight text-red-600 sm:text-[17px]"
            >
              {item.title}
            </div>
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1 whitespace-nowrap px-4 text-sm font-medium text-slate-900 transition hover:text-red-600"
            >
              {t("COMMON.view_all")}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div
          style={{ backgroundColor: sectionColor }}
          className="p-3 sm:p-4"
        >
          {hasTabs ? (
            <div className="mb-3 flex justify-end">
              <Link
                href={viewAllHref}
                className="inline-flex items-center gap-1 text-sm font-medium text-slate-900 transition hover:text-red-600"
              >
                {t("COMMON.view_all")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ) : null}
          <div className="grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[265px_minmax(0,1fr)]">
            <Link
              href={item.url || "/san-pham"}
              className="group relative hidden min-h-[490px] overflow-hidden rounded-2xl bg-white lg:block"
            >
              <Image
                src={item.banner || item.picture}
                alt={item.title}
                fill
                sizes="(max-width: 1280px) 220px, 265px"
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </Link>
            <div className="min-w-0">
              <SwiperProducts data={activeNeed.items} id={item.id} variant="category" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const CategoriesProducts = ({ data }: CategoriesProductsProps) => {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <>
      {data.map((item) => (
        <CategoriesProductsSection
          key={item.id}
          item={item}
          reduceMotion={reduceMotion}
        />
      ))}
    </>
  );
};

CategoriesProducts.displayName = "CategoriesProducts";

export default CategoriesProducts;
