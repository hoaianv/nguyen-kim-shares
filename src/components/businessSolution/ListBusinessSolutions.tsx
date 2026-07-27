"use client";
import React from "react";
import BusinessSolutionCard from "./BusinessSolutionCard";
import PaginationDynamic from "@/components/ui/PaginationDynamic";
import { IPagination } from "@/interfaces/common";
import { INews } from "@/interfaces/models/INews.interface";

type BusinessSolutionsData = { items: INews[]; pagination?: IPagination };

export default function ListBusinessSolutions({
  data,
  page = "1",
}: {
  data?: BusinessSolutionsData;
  page?: string | number;
}) {
  const { items = [], pagination } = data ?? {};

  if (!items || items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20 py-10 text-center text-gray-500">
        <p>Hiện chưa có bài viết nào trong mục Giải pháp doanh nghiệp.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <BusinessSolutionCard key={item.id} item={item} />
        ))}
      </div>

      {pagination && pagination.total > 1 && (
        <div className="mt-8 flex justify-center">
          <PaginationDynamic
            data={{ ...pagination, currentPage: Number(page) }}
          />
        </div>
      )}
    </div>
  );
}
