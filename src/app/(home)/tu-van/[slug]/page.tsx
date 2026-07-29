import { getAll, findOne } from "@/apis/models/advise.apis";
import Breadcrumb from "@/components/ui/breadcrumb";
import { Props } from "@/interfaces/common";
import { getValidData } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import FormAdvise from "@/components/advise/FormAdvise";

const EmptyAdvise = dynamic(() => import("@/components/advise/EmptyAdvise"), {
  ssr: false,
});

export default async function page({ params, searchParams }: Props) {
  const [all, detail] = await Promise.all([getAll(), findOne(params.slug)]);

  const detailData = getValidData(detail);
  const allData = getValidData(all);

  if (!detailData) return null;

  const { breadcrumb, items } = detailData;

  return detailData ? (
    <main
      // Mobile: padding nhỏ hơn; Tablet: vừa; Desktop: giữ nguyên
      className="max-w-6xl mx-auto px-3 sm:px-4 py-1 mt-2"
    >
      <Breadcrumb items={breadcrumb ?? []} />

      <article className="bg-white rounded-lg shadow-sm overflow-hidden mt-4">
        {/* Mobile: p-3 | Tablet: p-4~6 | Desktop (lg+): p-8 giữ nguyên */}
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          {allData && (
            <div className="mb-4">
              <div
                className={[
                  "flex gap-2 overflow-x-auto -mx-2 px-2 whitespace-nowrap snap-x snap-mandatory",
                  "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                  "md:flex-wrap md:justify-center md:overflow-visible md:whitespace-normal",
                  "lg:flex lg:flex-wrap lg:justify-center lg:gap-2",
                ].join(" ")}
              >
                {allData.map((item) => {
                  const isActive = item.url === params.slug;
                  return (
                    <Link
                      href={"/tu-van/" + item.url}
                      key={item.id}
                      className="snap-start flex-shrink-0 md:flex-shrink"
                    >
                      <div
                        className={[
                          "inline-block rounded-lg font-medium transition-all duration-200 cursor-pointer",
                          "px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base",
                          isActive
                            ? "bg-yellow-500 text-white border border-yellow-600 shadow-md"
                            : "bg-white text-gray-800 border border-yellow-400/50 shadow-sm hover:bg-yellow-50 hover:border-yellow-500 hover:shadow-md active:translate-y-[1px] active:shadow-inner",
                        ].join(" ")}
                      >
                        <h2 className="font-medium">{item.title}</h2>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Form đứng trước nội dung, padding tối ưu theo thiết bị */}
          <div className="rounded-lg border border-gray-100 bg-white">
            <div className="p-3 sm:p-4 md:p-5">
              {/* tablet gọn hơn */}
              <FormAdvise advises={allData ?? []} />
            </div>
          </div>

          {/* Tiêu đề bài tư vấn */}
          <article className="bg-white rounded-lg shadow-sm overflow-hidden mt-4">
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
              <div>
                <div className="text-center">
                  {/* Mobile: text-2xl | Tablet: 3xl | Desktop: 4xl (y như cũ) */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                    {items?.advise?.title}
                  </h1>
                </div>

                {/* Meta thời gian: thu nhỏ khoảng cách trên mobile */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 justify-center">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} />
                    <time dateTime={items?.advise?.createdAt}>
                      {items?.advise?.createdAt}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Danh sách FAQ */}
          {items?.faqs?.length > 0 ? (
            <div className="space-y-3 sm:space-y-4 mt-3">
              {items.faqs.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Câu hỏi của khách */}
                  <div className="px-3 py-2.5 sm:px-4 sm:py-3 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                    <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
                      Khách hàng hỏi
                    </span>
                    <h2 className="text-gray-900 font-semibold text-sm sm:text-base leading-snug">
                      {item.title}
                    </h2>
                  </div>

                  {/* Trả lời của admin */}
                  <div className="px-3 py-2.5 sm:px-4 sm:py-3">
                    <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
                      Admin trả lời
                    </span>
                    {item.description ? (
                      <div
                        className="
    prose prose-sm sm:prose md:prose-lg max-w-none
    overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400
    prose-img:w-full
    [&_table]:min-w-[640px] [&_table]:w-full [&_th]:text-left [&_td]:align-top
  "
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      />
                    ) : (
                      <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
                        Chờ admin trả lời...
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 sm:mt-4">
              <EmptyAdvise />
            </div>
          )}
        </div>
      </article>
    </main>
  ) : null;
}
