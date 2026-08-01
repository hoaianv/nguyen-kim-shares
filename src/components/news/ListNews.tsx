"use client";
import { i18nText } from "@/lib/i18nText";
import PaginationDynamic from "@/components/ui/PaginationDynamic";
import { IPagination } from "@/interfaces/common";
import { INews } from "@/interfaces/models/INews.interface";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type ListNewsData = { items: INews[]; pagination: IPagination };

export default function ListNews({ data }: { data?: ListNewsData }) {
  const { items = [], pagination } = data ?? {};
  const t = useTranslations();

  return (
    <div
      className="col-span-1 
      lg:col-span-7 
      order-1"
    >
      <div className="flex items-center gap-2">
        <span
          className="text-[#2a83e9] 
          font-semibold 
          shrink-0
          text-xl
          sm:text-2xl"
        >
          {t("NEWS.news")}
        </span>
        <div className="bg-[#D9EDF9] w-full h-1" />
      </div>

      <div className="mt-2">
        {items?.map((item) => (
          <Link key={item.id} href={item.slug}>
            <div
              className="group 
              my-2 
              flex 
              gap-3 
              items-start 
              rounded-lg 
              bg-white 
              transition-all 
              duration-300 
              hover:-translate-y-1 
              hover:shadow-lg 
              cursor-pointer
              flex-col
              sm:flex-row"
            >
              <figure
                className="relative 
                shrink-0 
                overflow-hidden 
                rounded-l-md
                w-full
                h-[200px]
                sm:w-[160px] 
                sm:h-[120px]
                lg:w-[220px] 
                lg:h-[160px]"
              >
                <Image
                  src={item.picture || "/placeholder.png"}
                  alt={item.title}
                  fill
                  className="object-cover 
                    transition-transform 
                    duration-300 
                    group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 160px, 220px"
                />
              </figure>

              <div
                className="flex 
                flex-col 
                p-3
                sm:pr-3 
                sm:py-2
                sm:pl-0"
              >
                <span
                  className="line-clamp-2 
                  font-semibold 
                  text-slate-800 
                  group-hover:text-blue-600 
                  transition-colors
                  text-base
                  sm:text-lg"
                >
                  {item.title}
                </span>
                <span
                  className="text-gray-500
                  text-sm
                  mt-1"
                >
                  {item.categoryName}
                </span>

                <div
                  className="mt-auto 
                  flex 
                  gap-2 
                  items-center 
                  text-gray-500
                  text-xs
                  sm:text-sm
                  pt-2"
                >
                  <span className="flex gap-1 items-center">
                    <Eye
                      size={15}
                      strokeWidth={1.5}
                      className="sm:w-4 sm:h-4"
                    />
                    {item.views}{i18nText("AUTO.components.news.listnews.line121_0_luot_xem")}</span>
                  <span>•</span>
                  <span>{item.createdAt}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        <PaginationDynamic data={pagination!} />
      </div>
    </div>
  );
}

