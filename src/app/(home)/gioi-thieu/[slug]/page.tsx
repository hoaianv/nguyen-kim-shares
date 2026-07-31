import { findOne, getAll } from "@/apis/models/about.apis";
import Breadcrumb from "@/components/ui/breadcrumb";
import { classPost } from "@/constants";
import { Props } from "@/interfaces/common";
import { getValidData } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default async function page({ params, searchParams }: Props) {
  const [all, detail] = await Promise.all([getAll(), findOne(params.slug)]);

  const detailData = getValidData(detail);
  const allData = getValidData(all);

  if (!detailData) return null;

  const { breadcrumb, items } = detailData;
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
                      href={item.url}
                      key={item.id}
                      className="snap-start flex-shrink-0 rounded-lg nk-focus-ring md:flex-shrink"
                    >
                      <div
                        className={[
                          "inline-block rounded-lg font-medium transition-all duration-200 cursor-pointer",
                          "px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base",
                          isActive
                            ? "border border-brand-strong bg-brand text-brand-deep shadow-md hover:bg-brand-hover"
                            : "border border-brand/50 bg-white text-slate-800 shadow-sm hover:border-brand hover:bg-brand-soft hover:text-brand-strong hover:shadow-md active:translate-y-[1px] active:shadow-inner",
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

          <div>
            <div className="text-center">
              <h1
                className="font-bold 
                text-gray-900 
                mb-4 
                leading-tight
                text-xl
                sm:text-2xl
                md:text-3xl
                lg:text-4xl"
              >
                {items?.title}
              </h1>
            </div>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div
                className="flex 
                flex-col
                gap-2
                text-gray-500 
                mb-6
                sm:flex-row
                sm:flex-wrap 
                sm:items-center 
                sm:gap-4 
                text-xs
                sm:text-sm"
              >
                <Calendar size={16} />
                <time dateTime={items?.createdAt}>{items?.createdAt}</time>
              </div>
            </div>
          </div>

          <div
            className={classPost}
            dangerouslySetInnerHTML={{ __html: items?.description }}
          />
        </div>
      </article>
    </main>
  ) : null;
}
