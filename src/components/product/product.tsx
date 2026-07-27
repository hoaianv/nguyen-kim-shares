import {
  getCompare,
  getProductDescription,
  getProductProperties,
  getProductRelated,
  getSchema,
} from "@/apis/models/products.apis";
import ProductInfo from "@/components/product/ProductInfo";
import Schema from "@/components/product/Schema";
import Breadcrumb from "@/components/ui/breadcrumb";
import { LazySection } from "@/components/ui/lazySection";
import { SkeletonLoader } from "@/components/ui/skeletonLoader";
import { ESlug, SlugData } from "@/interfaces/models/ISlug.interface";
import { getValidData } from "@/lib/utils";
import dynamic from "next/dynamic";
import PoliciesCardServer from "./PoliciesCardServer";

const CompareProducts = dynamic(
  () => import("@/components/product/CompareProducts"),
  {
    loading: () => <SkeletonLoader height="h-48" />,
    ssr: false,
  }
);
const RelatedProducts = dynamic(
  () => import("@/components/product/RelatedProducts"),
  {
    loading: () => <SkeletonLoader height="h-48" />,
    ssr: false,
  }
);
const PropertiesTable = dynamic(
  () => import("@/components/product/SpecificationsTable"),
  {
    loading: () => <SkeletonLoader height="h-48" />,
    ssr: false,
  }
);
const Description = dynamic(() => import("@/components/product/Description"), {
  loading: () => <SkeletonLoader height="h-48" />,
  ssr: false,
});

const InfoRegisterForm = dynamic(
  () => import("@/components/product/InfoRegisterForm"),
  { ssr: false, loading: () => <SkeletonLoader height="h-48" /> }
);

type ProductProps = {
  data: Extract<SlugData, { type: ESlug.Product }>;
  slug: string;
};

export default async function Product({ data, slug }: ProductProps) {
  const { breadcrumb, items } = data;
  const [properties, description, related, schema, compare] = await Promise.all(
    [
      getProductProperties(slug),
      getProductDescription(slug),
      getProductRelated(slug),
      getSchema(slug),
      getCompare(slug),
    ]
  );

  return (
    <main className="bg-[#F1F8FE] pb-8 pt-3 sm:pb-10 sm:pt-4">
      <Schema data={getValidData(schema) || null} />

      <div className="mx-auto w-full max-w-[1520px] space-y-3 px-3 sm:space-y-4 sm:px-4 lg:px-6">
        <div className="border border-slate-200 bg-white px-3 py-2 shadow-sm sm:px-4">
          <Breadcrumb
            items={breadcrumb ?? []}
            className="text-xs text-slate-500 sm:text-sm"
          />
        </div>

        <section aria-label="Product information" className="scroll-mt-24">
          <ProductInfo data={items} />
        </section>

        {items && !items.isInStock && (
          <section
            aria-label="Back in stock registration"
            className="scroll-mt-24"
          >
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-10 lg:items-stretch">
              <div className="order-2 lg:order-1 lg:col-span-7">
                <InfoRegisterForm productName={items.name} slug={slug} />
              </div>
              <div
                className="order-1 lg:order-2 lg:col-span-3"
                aria-hidden="true"
              >
                <PoliciesCardServer />
              </div>
            </div>
          </section>
        )}

        <section
          aria-label="Product description and specifications"
          className="scroll-mt-24"
        >
          <div className="mb-2 flex items-center justify-between border-b-2 border-[#ffb716] bg-white px-3 py-2">
            <h2 className="text-sm font-extrabold uppercase text-red-600 sm:text-base">
              Thông tin sản phẩm
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-10 lg:items-start">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <LazySection height="h-48">
                <Description data={getValidData(description)} />
              </LazySection>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-3">
              <LazySection height="h-48">
                <PropertiesTable data={getValidData(properties)} />
              </LazySection>
            </div>
          </div>
        </section>

        <section
          aria-label="Product comparison"
          className="scroll-mt-24 border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
        >
          <LazySection height="h-48">
            <CompareProducts data={getValidData(compare) || []} />
          </LazySection>
        </section>

        <section aria-label="Related products" className="scroll-mt-24">
          <LazySection height="h-48">
            <RelatedProducts data={getValidData(related)} />
          </LazySection>
        </section>
      </div>
    </main>
  );
}
