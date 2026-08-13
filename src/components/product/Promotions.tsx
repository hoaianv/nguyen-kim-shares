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
      <div className=" bg-white  rounded-lg  border  p-3 shadow-sm">
        <h2 className="text-lg font-semibold text-[#111827] line-clamp-1  mb-2 flex gap-2 items-center">
          <div className="p-2 bg-[#FFD400]/10  rounded-lg ">
            <Gift className="h-6 w-6 text-[#FFD400]" />
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

