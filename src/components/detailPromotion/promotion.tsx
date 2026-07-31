import { getSchema } from "@/apis/models/promotion.apis";
import Schema from "@/components/detailPromotion/schema";
import Breadcrumb from "@/components/ui/breadcrumb";
import { ESlug, SlugData } from "@/interfaces/models/ISlug.interface";
import { getValidData } from "@/lib/utils";
import { Calendar, Eye } from "lucide-react";
import Post from "../ui/Post";

type PromotionProps = {
  data: Extract<SlugData, { type: ESlug.Promotion }>;
  slug: string;
};

export default async function Promotion({ data, slug }: PromotionProps) {
  const { breadcrumb, items } = data;

  const schema = await getSchema(slug);

  return (
    <>
      <Schema data={getValidData(schema) ?? null} />
      <main className="mx-auto py-1 max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
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
                text-center
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

            <Post data={items?.description} />
          </div>
        </article>
      </main>
    </>
  );
}

