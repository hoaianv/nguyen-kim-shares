"use client";

import { i18nText } from "@/lib/i18nText";
import { FileText } from "lucide-react";
import { motion } from "motion/react";
import { IDescription } from "@/interfaces/models/IProduct.interface";
import Post from "../ui/Post";

type DescriptionProps = {
  data: IDescription | null;
};

const Description = ({ data }: DescriptionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white"
    >
      <h2 className="mb-4 text-lg font-extrabold uppercase text-slate-900 sm:text-xl">{i18nText("AUTO.components.product.description.line21_0_mo_ta_san_pham")}</h2>

      {!data?.description ? (
        <div className="flex h-[360px] flex-col items-center justify-center gap-4 border border-slate-200 p-8 text-center lg:h-[420px]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
            <FileText className="h-7 w-7" />
          </div>
          <div>
            <p className="font-medium text-slate-800">{i18nText("AUTO.components.product.description.line30_1_dang_qua_trinh_cap_nhat")}</p>
            <p className="mt-1 text-sm text-slate-500">{i18nText("AUTO.components.product.description.line32_2_noi_dung_san_pham_se")}</p>
          </div>
        </div>
      ) : (
        <Post data={data.description} />
      )}
    </motion.section>
  );
};

export default Description;
