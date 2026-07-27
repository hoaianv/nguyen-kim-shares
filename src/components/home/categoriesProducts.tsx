"use client";

import { ICategoriesProducts } from "@/interfaces/models/ICategories.interface";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import HomeSectionHeader from "./HomeSectionHeader";
import SwiperProducts from "@/components/home/swiperProducts";

type CategoriesProductsProps = {
  data: ICategoriesProducts[];
};

const CategoriesProducts = ({ data }: CategoriesProductsProps) => {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();

  return (
    <>
      {data.map(
        (item, index) =>
          item?.items?.length > 0 && (
            <motion.section
              key={item.id}
              className="mx-auto mt-3 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            >
              <div className="overflow-hidden rounded-md bg-white shadow-sm">
                <HomeSectionHeader
                  eyebrow={`Ngành hàng ${index + 1}`}
                  title={item.title}
                  description={
                    item.description ||
                    `${item.items.length} sản phẩm tiêu biểu đang được mở bán.`
                  }
                  actionLabel={t("COMMON.view_all")}
                  actionHref={item.url || "/san-pham"}
                />

                <div className="grid gap-3 p-3 lg:grid-cols-[260px_minmax(0,1fr)]">
                  <Link
                    href={item.url || "#"}
                    className="group relative hidden min-h-[420px] overflow-hidden rounded-sm bg-slate-950 lg:block"
                  >
                    <Image
                      src={item.banner || item.picture}
                      alt={item.title}
                      fill
                      sizes="260px"
                      className="object-cover opacity-90 transition duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="rounded bg-[#ffb716] px-2 py-1 text-xs font-extrabold uppercase text-slate-950 w-fit">
                        {item.items.length} sản phẩm
                      </p>
                      <p className="mt-3 text-2xl font-extrabold leading-tight">
                        {item.title}
                      </p>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/78">
                        {item.description || "Khám phá thêm sản phẩm trong danh mục."}
                      </p>
                    </div>
                  </Link>

                  <div className="min-w-0">
                    <SwiperProducts data={item.items} id={item.id} />
                  </div>
                </div>
              </div>
            </motion.section>
          )
      )}
    </>
  );
};

CategoriesProducts.displayName = "CategoriesProducts";

export default CategoriesProducts;
