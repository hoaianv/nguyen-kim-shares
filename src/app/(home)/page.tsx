import { getNewsLatest } from "@/apis/models/news.apis";
import {
  getCategoriesProducts,
  getProductsHot,
  getProductsRecommend,
} from "@/apis/models/products.apis";
import BannerLeftRight from "@/components/home/BannerLeftRight";
import BannerPopup from "@/components/home/BannerPopup";
import HomeTrustBand from "@/components/home/HomeTrustBand";
import { FeaturedCategories } from "@/components/home/featuredCategories";
import { GroupBanner } from "@/components/home/groupBanner";
import { LazySection } from "@/components/ui/lazySection";
import { SkeletonLoader } from "@/components/ui/skeletonLoader";
import { getValidData } from "@/lib/utils";
import dynamic from "next/dynamic";

const NewsLatest = dynamic(() => import("@/components/home/newsLatest"), {
  ssr: false,
  loading: () => <SkeletonLoader height="h-64" />,
});

const Banner = dynamic(() => import("@/components/home/banner"), {
  ssr: false,
  loading: () => <SkeletonLoader height="h-64" />,
});

const CategoriesProducts = dynamic(
  () => import("@/components/home/categoriesProducts"),
  { loading: () => <SkeletonLoader height="h-48" />, ssr: false }
);

const TopSellingProducts = dynamic(
  () => import("@/components/home/topSellingProducts"),
  { loading: () => <SkeletonLoader height="h-48" />, ssr: false }
);

const ProductsRecommend = dynamic(
  () => import("@/components/home/productsRecommend"),
  {
    loading: () => <SkeletonLoader height="h-48" />,
    ssr: false,
  }
);

export default async function Home() {
  const [productsHot, categoriesProducts, productsRecommend, newsLatest] =
    await Promise.all([
      getProductsHot(),
      getCategoriesProducts(),
      getProductsRecommend(),
      getNewsLatest(),
    ]);

  return (
    <>
      <div className="bg-[#F1F8FE] pb-8">
        <Banner />
        <LazySection>
          <GroupBanner bannerKey="bannerBottom" columns={4} gap={3} />
        </LazySection>





        <LazySection height="h-48">
          <TopSellingProducts data={getValidData(productsHot) ?? []} />
        </LazySection>

        <LazySection height="h-48">
          <CategoriesProducts data={getValidData(categoriesProducts) ?? []} />
        </LazySection>

        <LazySection>
          <GroupBanner bannerKey="bannerMiddle" columns={3} gap={3} />
        </LazySection>

        {/* <LazySection height="h-48">
          <ProductsRecommend data={getValidData(productsRecommend) ?? []} />
        </LazySection> */}

        <FeaturedCategories />

        <LazySection>
          <BannerLeftRight />
        </LazySection>

        <LazySection height="h-48">
          <NewsLatest data={getValidData(newsLatest) ?? []} />
        </LazySection>
      </div>

      <BannerPopup />
    </>
  );
}
