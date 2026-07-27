"use client";

import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

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
  index: number;
  reduceMotion: boolean;
};

const CategoriesProductsSection = ({
  item,
  index,
  reduceMotion,
}: CategoriesProductsSectionProps) => {
  const t = useTranslations();
  const needs = item.customerNeeds ?? [];
  const [activeNeedId, setActiveNeedId] = useState<number | null>(
    needs[0]?.id ?? null
  );

  useEffect(() => {
    setActiveNeedId(needs[0]?.id ?? null);
  }, [item.id, item.customerNeeds]);

  const activeNeed =
    needs.find((need) => need.id === activeNeedId) ?? needs[0] ?? null;

  if (!needs.length || !activeNeed) return null;

  const categoryDescription =
    item.description ?? item.desciption ?? activeNeed.description;

  return (
    <motion.section
      className="mx-auto mt-3 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      <div className="overflow-hidden rounded-3xl bg-[#f5efff] shadow-sm ring-1 ring-white/60">
        <div className="border-b border-white/80 bg-white/70 ">
          <div className=" overflow-x-auto  ">
            <div className="grid min-w-max grid-flow-col auto-cols-[minmax(140px,1fr)] lg:min-w-0 lg:auto-cols-fr">
              {needs.map((need: ICategoryCustomerNeed) => {
                const isActive = need.id === activeNeed.id;

                return (
                  <button
                    key={need.id}
                    type="button"
                    onClick={() => setActiveNeedId(need.id)}
                    className={`relative flex h-11 items-center justify-center  px-4 text-sm font-semibold transition ${isActive
                      ? "bg-[#f5efff] text-[#e33b2f] shadow-[0_6px_18px_rgba(15,23,42,0.06)] ring-1 ring-white/70"
                      : "bg-white/85 text-[#ea6158] hover:bg-[#f5efff] hover:text-[#e33b2f]"
                      }`}
                  >
                    <span className="truncate">{need.title}</span>

                  </button>
                );
              })}
            </div>
          </div>

          {/* <div className="flex justify-end pb-1">
            <Link
              href={activeNeed.url || item.url || "/san-pham"}
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-950 transition hover:text-[#e33b2f]"
            >
              {t("COMMON.view_all")}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div> */}
        </div>

        <div className="grid items-center gap-3 p-3 sm:p-4 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)]">
          <Link
            href={item.url || "#"}
            className="group relative hidden min-h-[408px] overflow-hidden rounded-3xl bg-slate-950 lg:block lg:self-center"
          >
            <Image
              src={item.banner || item.picture}
              alt={item.title}
              fill
              sizes="230px"
              className="object-cover opacity-95 transition duration-300 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/18 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="w-fit rounded-full bg-[#ffb716] px-3 py-1 text-xs font-extrabold uppercase text-slate-950">
                {activeNeed.title}
              </p>
              <p className="mt-3 text-2xl font-extrabold leading-tight">
                {item.title}
              </p>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/78">
                {activeNeed.description || categoryDescription}
              </p>
            </div>
          </Link>

          <div className="min-w-0 lg:self-center">
            <SwiperProducts data={activeNeed.items} id={item.id} />
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
      {data.map((item, index) => (
        <CategoriesProductsSection
          key={item.id}
          item={item}
          index={index}
          reduceMotion={reduceMotion}
        />
      ))}
    </>
  );
};

CategoriesProducts.displayName = "CategoriesProducts";

export default CategoriesProducts;
