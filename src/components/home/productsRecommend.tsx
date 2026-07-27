"use client";

import { IProduct } from "@/interfaces/models/IProduct.interface";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import HomeSectionHeader from "./HomeSectionHeader";
import CardProduct from "@/components/ui/cardProduct";

type ProductRecommendProps = {
  data: IProduct[];
};

export default function ProductsRecommend({ data }: ProductRecommendProps) {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();

  if (!data?.length) return null;

  const [featured, ...rest] = data;

  return (
    <motion.section
      className="mx-auto mt-3 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      <div className="overflow-hidden rounded-md bg-white shadow-sm">
        <HomeSectionHeader
          eyebrow="Gợi ý"
          title={t("TITLE.you_may_like")}
          description="Các sản phẩm phù hợp để tiếp tục so sánh sau nhóm bán chạy."
          actionLabel={t("COMMON.view_all")}
          actionHref="/san-pham"
        />

        <div className="grid gap-3 p-3 xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
          <div className="w-full max-w-[420px]">
            <CardProduct item={featured} />
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {rest.slice(0, 8).map((item) => (
              <CardProduct key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
