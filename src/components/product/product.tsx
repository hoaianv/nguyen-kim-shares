import { i18nText } from "@/lib/i18nText";
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
  },
);
const RelatedProducts = dynamic(
  () => import("@/components/product/RelatedProducts"),
  {
    loading: () => <SkeletonLoader height="h-48" />,
    ssr: false,
  },
);
const PropertiesTable = dynamic(
  () => import("@/components/product/SpecificationsTable"),
  {
    loading: () => <SkeletonLoader height="h-48" />,
    ssr: false,
  },
);
const Description = dynamic(() => import("@/components/product/Description"), {
  loading: () => <SkeletonLoader height="h-48" />,
  ssr: false,
});

const InfoRegisterForm = dynamic(
  () => import("@/components/product/InfoRegisterForm"),
  { ssr: false, loading: () => <SkeletonLoader height="h-48" /> },
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
    ],
  );
  const propertiesData = getValidData(properties);

  return (
    <main className="pb-8 pt-2 sm:pb-10 sm:pt-4">
      <Schema data={getValidData(schema) || null} />

      <div className="mx-auto w-full max-w-[1520px] space-y-3 px-3 sm:space-y-4 sm:px-4 lg:px-6">
        <div className="rounded-sm border theme-border bg-[var(--theme-section-soft)] px-3 py-2 shadow-sm sm:px-4">
          <Breadcrumb
            items={breadcrumb ?? []}
            className="text-xs text-slate-500 sm:text-sm"
          />
        </div>

        <section aria-label={i18nText("AUTO.components.product.product.line79_0_product_information")} className="scroll-mt-24">
          <ProductInfo
            data={items}
            hasSpecifications={Boolean(propertiesData?.length)}
          />
        </section>

        {items && !items.isInStock && (
          <section
            aria-label={i18nText("AUTO.components.product.product.line88_1_back_in_stock_registration")}
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
          aria-label={i18nText("AUTO.components.product.product.line106_2_product_description_specifications")}
          className="scroll-mt-24"
        >
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-10 lg:items-start">
            <div
              id="product-description"
              tabIndex={-1}
              className="order-2 scroll-mt-40 focus:outline-none lg:order-1 lg:col-span-7 lg:scroll-mt-44"
            >
              <LazySection height="h-48">
                <Description data={getValidData(description)} />
              </LazySection>
            </div>
            <div
              id="product-specifications"
              tabIndex={-1}
              className="order-1 scroll-mt-40 focus:outline-none lg:order-2 lg:col-span-3 lg:scroll-mt-44"
            >
              <LazySection height="h-48">
                <PropertiesTable data={propertiesData} />
              </LazySection>
            </div>
          </div>
        </section>

        <section
          aria-label={i18nText("AUTO.components.product.product.line132_3_product_comparison")}
          className="scroll-mt-24"
        >
          <LazySection height="h-48">
            <CompareProducts data={getValidData(compare) || []} />
          </LazySection>
        </section>

        <section aria-label={i18nText("AUTO.components.product.product.line140_4_related_products")} className="scroll-mt-24">
          <LazySection height="h-48">
            <RelatedProducts data={getValidData(related)} />
          </LazySection>
        </section>
      </div>
    </main>
  );
}
