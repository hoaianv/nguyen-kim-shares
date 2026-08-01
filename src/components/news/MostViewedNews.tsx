import { i18nText } from "@/lib/i18nText";
import { INews } from "@/interfaces/models/INews.interface";
import { Calendar, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import ImageWithFallback from "../ImageWithFallback";

const MostViewedNews = ({ data }: { data: INews[] }) => {
  const t = useTranslations();

  return (
    <div
      className="grid 
      grid-cols-1 
      lg:grid-cols-10"
    >
      <div
        className="col-span-1 
        lg:col-span-7"
      >
        <div className="flex items-center gap-2">
          <span
            className="text-[#2a83e9] 
            font-semibold 
            shrink-0
            text-xl
            sm:text-2xl"
          >
            {t("TITLE.most_viewed")}
          </span>
          <div className="bg-[#D9EDF9] w-full h-1" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            {data.map((item, index) => (
              <Link key={item.id} href={item.slug}>
                <div
                  className="group 
                  flex 
                  gap-4 
                  p-4 
                  my-3 
                  bg-white 
                  dark:bg-gray-800 
                  rounded-lg 
                  shadow-md 
                  hover:shadow-lg 
                  transition-all 
                  duration-300 
                  cursor-pointer 
                  border 
                  border-gray-100 
                  dark:border-gray-700 
                  hover:border-blue-300 
                  dark:hover:border-blue-600
                  flex-col
                  sm:flex-row
                  sm:gap-3
                  lg:gap-4"
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
                    <ImageWithFallback
                      src={item?.picture || ""}
                      alt={item?.title || i18nText("AUTO.components.news.mostviewednews.line76_0_hinh_anh")}
                      fill
                      className="object-cover 
                        transition-transform 
                        duration-300 
                        group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 160px, 220px"
                    />
                  </figure>

                  <div
                    className="flex-1 
                    min-w-0
                    px-2
                    sm:px-0"
                  >
                    <div
                      className="flex 
                      items-center 
                      gap-2 
                      mb-2
                      flex-wrap"
                    >
                      <span
                        className="px-2 
                        py-0.5 
                        font-semibold 
                        text-blue-600 
                        bg-blue-50 
                        dark:bg-blue-900/30 
                        dark:text-blue-400 
                        rounded-full
                        text-xs"
                      >
                        #{index + 1}
                      </span>
                      <span
                        className="px-2 
                        py-0.5 
                        font-medium 
                        text-gray-600 
                        dark:text-gray-400 
                        bg-gray-100 
                        dark:bg-gray-700 
                        rounded-lg
                        text-xs"
                      >
                        {item.categoryName}
                      </span>
                    </div>

                    <h4
                      className="font-semibold 
                      text-gray-900 
                      dark:text-white 
                      leading-tight 
                      mb-2 
                      line-clamp-2 
                      group-hover:text-blue-600 
                      dark:group-hover:text-blue-400 
                      transition-colors
                      text-lg
                      sm:text-lg
                      lg:text-lg"
                    >
                      {item.title}
                    </h4>

                    <div
                      className="flex 
                      items-center 
                      gap-3 
                      text-gray-500 
                      dark:text-gray-400
                      text-xs
                      flex-wrap"
                    >
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{item.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostViewedNews;

