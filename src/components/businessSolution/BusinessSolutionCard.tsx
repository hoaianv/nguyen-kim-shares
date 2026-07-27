import React from "react";
import Link from "next/link";
import { INews } from "@/interfaces/models/INews.interface";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import ImageWithFallback from "../ImageWithFallback";

interface IProps {
  item: INews;
}

const BusinessSolutionCard = ({ item }: IProps) => {
  return (
    <Link
      href={`/${item.slug}`}
      className="group flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 cursor-pointer"
    >
      {/* Hình ảnh */}
      <div className="relative aspect-[16/9] overflow-hidden block">
        <ImageWithFallback
          src={item.picture || ""}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        <div className="mb-2">
          <span className="uppercase text-blue-600 text-xs font-bold bg-blue-50 px-2 py-1 rounded inline-block">
            {item.categoryName || "Giải pháp"}
          </span>
        </div>

        {/* Title */}
        <div className="block mb-3">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
        </div>

        {/* Meta Info (Date & Views) */}
        <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5" title="Ngày đăng">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{item.createdAt ? item.createdAt : ""}</span>
          </div>

          <div className="flex items-center gap-1.5" title="Lượt xem">
            <Eye className="w-4 h-4 text-gray-400" />
            <span>{item.views ?? 0} lượt xem</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50">
          <div className="text-sm font-medium text-blue-600 group-hover:underline flex items-center gap-1">
            Xem chi tiết
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BusinessSolutionCard;
