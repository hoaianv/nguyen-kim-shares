"use client";

import { i18nText } from "@/lib/i18nText";
import { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { useCategoriesStore } from "@/stores/useCategories";

import HomeSectionHeader from "./HomeSectionHeader";

const DEFAULT_VISIBLE_COUNT = 14;

export const FeaturedCategories = () => {
  const t = useTranslations();
  const { categories } = useCategoriesStore();
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  if (!categories?.length) return null;

  const hasMoreCategories = categories.length > DEFAULT_VISIBLE_COUNT;
  const visibleCategories =
    expanded || !hasMoreCategories
      ? categories
      : categories.slice(0, DEFAULT_VISIBLE_COUNT);

  return (
    <motion.section
      className="mx-auto mt-3 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >


      <div className="overflow-hidden rounded-md shadow-sm">
        <div className="bg-white rounded-md">
          <HomeSectionHeader
            title={t("TITLE.featured_categories")}
            actionLabel={t("COMMON.view_all")}
            actionHref="/san-pham"
          />

        </div>
        <div className="grid grid-cols-2 gap-[2px] bg-slate-200 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7">
          {visibleCategories.map((item) => (
            <Link
              key={item.id}
              href={`/${item.url}`}
              className="group flex min-h-[132px] flex-col items-center justify-center bg-white p-3 text-center transition hover:bg-[#fff7da]"
            >
              <span className="relative h-[101px] w-[182px] shrink-0 overflow-hidden rounded transition group-hover:bg-white">
                {item.picture ? (
                  <Image
                    src={item.picture}
                    alt={item.title}
                    fill
                    sizes="182px"
                    className="object-contain p-2 transition duration-300 group-hover:scale-[1.06]"
                  />
                ) : null}
              </span>
              <span className="mt-3 line-clamp-2 min-h-[2.25rem] text-sm font-bold leading-snug text-slate-900 group-hover:text-[#e6a414]">
                {item.title}
              </span>

            </Link>
          ))}
        </div>

        {hasMoreCategories ? (
          <div className="bg-slate-200 px-3 pb-3 pt-2">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
              className="mx-auto inline-flex h-9 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-[#e6a414] hover:bg-[#fff7da] hover:text-slate-900"
            >
              {expanded ? (
                <>{i18nText("AUTO.components.home.featuredcategories.line86_0_thu_gon")}<ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>{i18nText("AUTO.components.home.featuredcategories.line91_1_xem_them")}<ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        ) : null}
      </div>
    </motion.section>
  );
};

FeaturedCategories.displayName = "FeaturedCategories";
