import { findOne, getSlugMeta } from "@/apis/models/slug.apis";
import CategoryDetail from "@/components/category/CategoryDetail";
import News from "@/components/detailNews/news";
import Promotion from "@/components/detailPromotion/promotion";
import Product from "@/components/product/product";
import { LazySection } from "@/components/ui/lazySection";
import { SkeletonLoader } from "@/components/ui/skeletonLoader";
import { metaNotFound } from "@/constants";
import { Props } from "@/interfaces/common";
import {
  ESlug,
  SlugData,
  SlugMetaData,
} from "@/interfaces/models/ISlug.interface";
import { getValidData } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";

const NotFoundPage = dynamic(() => import("@/components/common/NotFoundPage"), {
  loading: () => <SkeletonLoader height="h-48" />,
  ssr: false,
});

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const response = await getSlugMeta(slug);
  const data = getValidData<SlugMetaData>(response);

  if (!data) {
    return metaNotFound;
  }

  const { type, meta } = data;

  switch (type) {
    case ESlug.Product:
      return meta;
    case ESlug.Category:
      return meta;
    case ESlug.News:
      return meta;
    case ESlug.Promotion:
      return meta;
    default:
      return metaNotFound;
  }
}
export default async function page({ params, searchParams }: Props) {
  const res = await findOne(params.slug);
  const data = getValidData<SlugData>(res);
  if (!data)
    return (
      <LazySection height="h-48">
        <NotFoundPage />
      </LazySection>
    );

  const { type } = data;

  return (
    <div className="mx-auto w-full max-w-[1520px] px-3 py-8 sm:px-4 lg:px-6">
      {(() => {
        switch (type) {
          case ESlug.Product:
            return <Product slug={params.slug} data={data} />;
          case ESlug.News:
            return <News data={data} slug={params.slug} />;

          case ESlug.Category:
            return (
              <CategoryDetail
                data={data}
                slug={params.slug}
                searchParams={searchParams}
              />
            );
          case ESlug.Promotion:
            return <Promotion slug={params.slug} data={data} />;

          default:
            return (
              <LazySection height="h-48">
                <NotFoundPage />
              </LazySection>
            );
        }
      })()}
    </div>
  );
}
