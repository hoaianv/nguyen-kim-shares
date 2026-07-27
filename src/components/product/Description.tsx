"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { IDescription } from "@/interfaces/models/IProduct.interface";
import { useTranslations } from "next-intl";
import Post from "../ui/Post";
import { FileText } from "lucide-react";

type DescriptionProps = {
  data: IDescription | null;
};

const Description = ({ data }: DescriptionProps) => {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations();

  if (!data?.description) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-lg shadow-sm h-full flex flex-col items-center justify-center p-8 space-y-4"
      >
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
          <FileText className="w-8 h-8 text-blue-400" />
        </div>
        <div className="text-center">
          <p className="text-base font-medium mb-1">
            Đang trong quá trình cập nhật
          </p>
          <p className="text-gray-400 text-sm">
            Nội dung sản phẩm sẽ được bổ sung sớm nhất
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-lg p-3 shadow-sm"
    >
      <Post data={data.description} />

      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-center py-2"
      >
        <span className="text-[#1435C3] text-sm cursor-pointer">
          {expanded ? t("PRODUCT.show_less") : t("PRODUCT.view_more")}
        </span>
      </div>
    </motion.div>
  );
};

export default Description;

