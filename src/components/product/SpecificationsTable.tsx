"use client";
import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { IProperties } from "@/interfaces/models/IProduct.interface";
import Modal from "@/components/ui/Modal";
import { useTranslations } from "next-intl";

type PropertiesProps = { data: IProperties[] | null };

type SpecsListProps = {
  data: IProperties[];
  limit?: number; // số dòng tối đa (nếu cần)
  showSeeMore?: boolean; // có hiển thị nút xem thêm không
  onSeeMore?: () => void;
};

const SpecsList: React.FC<SpecsListProps> = ({
  data,
  limit,
  showSeeMore,
  onSeeMore,
}) => {
  const t = useTranslations();

  const items = useMemo(
    () => (limit ? data.slice(0, limit) : data),
    [data, limit]
  );

  return (
    <div className="grid gap-1">
      {items.map((item, index) => (
        <div
          key={index}
          className={`grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 py-2 sm:py-3 px-2 rounded-lg transition
        ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
        hover:bg-blue-50 hover:shadow-sm hover:scale-[1.01]`}
        >
          <div className="font-medium text-[#111827] mb-1 lg:mb-0 text-xs sm:text-sm break-words overflow-hidden">
            {item.name}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: item.description }}
            className="text-gray-700 text-xs sm:text-sm break-words overflow-hidden text-ellipsis line-clamp-3 max-w-full"
          />
        </div>
      ))}

      {showSeeMore && onSeeMore && data.length > (limit ?? 0) && (
        <div className="flex items-center justify-center py-2">
          <button
            onClick={onSeeMore}
            className="text-[#1435C3] text-sm cursor-pointer"
          >
            {t("PRODUCT.view_more_content")}
          </button>
        </div>
      )}
    </div>
  );
};

const PropertiesTable: React.FC<PropertiesProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  if (!data || data.length <= 0) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-lg shadow-sm lg:sticky lg:top-32"
      >
        <div className="border-b border-gray-200 p-2 sm:p-3">
          <h3 className="text-lg sm:text-xl font-semibold text-[#111827]">
            {t("PRODUCT.specifications")}
          </h3>
        </div>

        <div className="p-2 sm:p-3">
          <SpecsList
            data={data}
            limit={8}
            showSeeMore
            onSeeMore={() => setOpen(true)}
          />
        </div>
      </motion.div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        size="xl"
        title={t("PRODUCT.specifications")}
      >
        <div
          className="p-2 sm:p-3 max-h-[400px] sm:max-h-[600px] overflow-y-auto
                scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
                hover:scrollbar-thumb-gray-400"
        >
          <SpecsList data={data} />
        </div>
      </Modal>
    </>
  );
};

export default PropertiesTable;

