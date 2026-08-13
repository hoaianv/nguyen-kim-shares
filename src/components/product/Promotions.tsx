"use client";
import { IPresent } from "@/interfaces/models/IProduct.interface";
import { motion } from "motion/react";
import { Gift } from "lucide-react";
import { useTranslations } from "next-intl";

type PromotionProps = {
  data: IPresent | null;
};

const Promotions = ({ data }: PromotionProps) => {
  const t = useTranslations();

  if (!data || !data.description) return;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-8"
    >
      <div className="rounded-lg border theme-border bg-[var(--theme-section-bg)] p-3 shadow-sm">
        <h2 className="mb-2 flex items-center gap-2 line-clamp-1 text-lg font-semibold text-[var(--theme-text)]">
          <div className="rounded-lg bg-[var(--theme-section-soft)] p-2">
            <Gift className="h-6 w-6 text-[var(--brand-primary-strong)]" />
          </div>
          {t("PRODUCT.gift_included")}
        </h2>
        <div
          className="prose prose-sm sm:prose md:prose-lg
  !max-w-none break-words
  prose-p:text-gray-700 prose-strong:text-gray-900
 
  prose-img:block prose-img:mx-auto prose-img:w-full prose-img:h-auto prose-img:rounded-lg"
        >
          <div dangerouslySetInnerHTML={{ __html: data?.description }} />
        </div>
      </div>
    </motion.div>
  );
};

export default Promotions;

