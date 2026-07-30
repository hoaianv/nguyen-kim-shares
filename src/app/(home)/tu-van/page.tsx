import { getAll, getList } from "@/apis/models/advise.apis";

import Breadcrumb from "@/components/ui/breadcrumb";
import { Props } from "@/interfaces/common";
import { getValidData } from "@/lib/utils";
import Link from "next/link";
import dynamic from "next/dynamic";
import FormAdvise from "@/components/advise/FormAdvise";

const EmptyAdvise = dynamic(() => import("@/components/advise/EmptyAdvise"), {
  ssr: false,
});
export default async function page({ params, searchParams }: Props) {
  const [all, detail] = await Promise.all([getAll(), getList()]);

  const detailData = getValidData(detail);
  const allData = getValidData(all);

  if (!detailData) return null;

  const { breadcrumb, title, faqs } = detailData;

  return detailData ? (
    <main className="max-w-6xl mx-auto px-4 pt-1 pb-8">
      <Breadcrumb items={breadcrumb ?? []} />

      <article className="mt-4 overflow-hidden rounded-lg bg-white shadow-[0_14px_32px_-20px_rgba(15,23,42,0.38)]">
        <div className="p-6 md:p-8">
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

          <FormAdvise advises={allData ?? []} />

          <article className="bg-white rounded-lg shadow-sm overflow-hidden mt-4">
            <div className="p-6 md:p-8">
              <div>
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {title}
                  </h1>
                </div>
              </div>
            </div>
          </article>

          {faqs?.length > 0 ? (
            faqs.map((item) => (
              <div
                key={item.id}
                className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Câu hỏi của khách */}
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                  <span className="block text-sm font-medium text-gray-500 mb-1">
                    Khách hàng hỏi
                  </span>
                  <h2 className="text-gray-900 font-semibold">{item.title}</h2>
                </div>

                <div className="px-4 py-3">
                  <span className="block text-sm font-medium text-gray-500 mb-1">
                    Admin trả lời
                  </span>
                  {item.description ? (
                    <h2
                      className="prose prose-sm sm:prose md:prose-lg max-w-none overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 prose-img:w-full [&_table]:min-w-[640px] [&_table]:w-full [&_th]:text-left [&_td]:align-top"
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    />
                  ) : (
                    <p className={"text-gray-800 leading-relaxed"}>
                      {"Chờ admin trả lời..."}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <EmptyAdvise />
          )}
        </div>
      </article>
    </main>
  ) : null;
}
