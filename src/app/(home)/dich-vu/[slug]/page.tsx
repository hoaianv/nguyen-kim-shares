import { findOne } from "@/apis/models/services.apis";
import Breadcrumb from "@/components/ui/breadcrumb";
import { classPost } from "@/constants";
import { Props } from "@/interfaces/common";
import { getValidData } from "@/lib/utils";
import { Calendar } from "lucide-react";

export default async function page({ params, searchParams }: Props) {
  const response = await findOne(params.slug);
  const data = getValidData(response);
  if (!data) return null;

  const { breadcrumb, items } = data;
  return data ? (
    <main
      className="mx-auto 
      px-4 
      py-1 
      mt-2
      max-w-sm
      sm:max-w-2xl
      md:max-w-4xl
      lg:max-w-6xl"
    >
      <Breadcrumb items={breadcrumb ?? []} />

      <article
        className="bg-white 
        rounded-lg 
        shadow-sm 
        overflow-hidden 
        mt-4"
      >
        <div
          className="p-4 
          sm:p-6 
          md:p-8"
        >
          <div>
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
              <div className="flex items-center gap-1">
                <Calendar size={14} className="sm:w-4 sm:h-4" />
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
