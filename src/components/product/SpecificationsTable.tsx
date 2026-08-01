"use client";

import { i18nText } from "@/lib/i18nText";
import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { IProperties } from "@/interfaces/models/IProduct.interface";
import Modal from "@/components/ui/Modal";

type PropertiesProps = { data: IProperties[] | null };

const SpecificationsList = ({ data }: { data: IProperties[] }) => (
  <div className="border border-slate-200">
    {data.map((item, index) => (
      <div
        key={item.id}
        className={`grid grid-cols-1 border-b border-slate-200 text-sm last:border-b-0 sm:grid-cols-2 ${
          index % 2 === 0 ? "bg-white" : "bg-slate-50/70"
        }`}
      >
        <div className="border-b border-slate-200 px-3 py-2.5 font-medium text-slate-800 sm:border-b-0 sm:border-r">
          {item.name}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: item.description }}
          className="px-3 py-2.5 text-slate-700 [&>*]:m-0"
        />
      </div>
    ))}
  </div>
);

const PropertiesTable = ({ data }: PropertiesProps) => {
  const [open, setOpen] = useState(false);

  if (!data || data.length === 0) return null;

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white"
      >
        <h2 className="mb-4 text-lg font-extrabold uppercase text-slate-900 sm:text-xl">{i18nText("AUTO.components.product.specificationstable.line46_0_thong_so_ky_thuat")}</h2>

        <div className="relative h-[360px] overflow-hidden lg:h-[420px]">
          <SpecificationsList data={data} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/95 to-transparent"
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mx-auto mt-4 flex w-full max-w-[340px] items-center justify-center gap-1 rounded-sm border border-blue-500 px-4 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" />{i18nText("AUTO.components.product.specificationstable.line63_1_xem_them")}</button>
      </motion.section>

      <Modal isOpen={open} onClose={() => setOpen(false)} size="xl" title={i18nText("AUTO.components.product.specificationstable.line67_2_thong_so_ky_thuat")}>
        <div className="max-h-[70vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 sm:max-h-[600px] sm:p-3">
          <SpecificationsList data={data} />
        </div>
      </Modal>
    </>
  );
};

export default PropertiesTable;
