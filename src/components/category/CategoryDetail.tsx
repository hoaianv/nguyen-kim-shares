import dynamic from "next/dynamic";
import { ESlug, SlugData } from "@/interfaces/models/ISlug.interface";
import { getSchema } from "@/apis/models/category.apis";
import Schema from "@/components/category/Schema";
import { getValidData } from "@/lib/utils";
import CategoryParentTabsServer from "@/components/category/CategoryParentTabsServer";
import { fetchCategoryProducts } from "@/helpers/productSearchParams.helper";
import CategoryCatalogView from "@/components/category/CategoryCatalogView";
import CategoryHero from "@/components/category/CategoryHero";

const CategoryBanners = dynamic(
  () => import("@/components/category/CategoryBanners"),
  {
    ssr: false,
  }
);

type CategoryDetailProps = {
  data: Extract<SlugData, { type: ESlug.Category }>;
  slug: string;
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function CategoryDetail({
  data: categoryData,
  slug: categorySlug,
  searchParams: searchParameters,
}: CategoryDetailProps) {
  const { items: productList, pagination } = await fetchCategoryProducts(
    categorySlug,
    searchParameters
  );

  const schema = await getSchema(categorySlug);

  return (
    <>
      <Schema data={getValidData(schema) || null} />

      <div className="space-y-5">
        <section className="space-y-4">
          <CategoryHero
            categoryTitle={categoryData?.nameCategory ?? ""}
          />

          <CategoryParentTabsServer />
          <CategoryBanners />
        </section>

        <CategoryCatalogView
          categoryTitle={categoryData?.nameCategory ?? ""}
          categorySlug={categorySlug}
          listBrand={categoryData.listBrand ?? []}
          customerNeeds={categoryData.customerNeeds ?? []}
          options={categoryData.option}
          rangePrice={categoryData.rangePrice}
          searchParams={searchParameters}
          productList={productList ?? []}
          pagination={pagination}
        />
      </div>
    </>
  );
}
