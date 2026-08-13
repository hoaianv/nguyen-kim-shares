import {
  getCategoriesProducts,
  getProductsFlashSale,
  getProductsHot,
} from "@/apis/models/products.apis";
import { getListPromotionHome } from "@/apis/models/promotion.apis";
import BannerLeftRight from "@/components/home/BannerLeftRight";
import BannerPopup from "@/components/home/BannerPopup";
import { FeaturedCategories } from "@/components/home/featuredCategories";
import { GroupBanner } from "@/components/home/groupBanner";
import ProductCarouselSection from "@/components/home/ProductCarouselSection";
import { LazySection } from "@/components/ui/lazySection";
import { SkeletonLoader } from "@/components/ui/skeletonLoader";
import { bannerKeys } from "@/constants/values.constant";
import { getValidData } from "@/lib/utils";
import dynamic from "next/dynamic";

const PromotionLatest = dynamic(() => import("@/components/home/PromotionLatest"), {
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






export default async function Home() {
  const [productsHot, categoriesProducts, promotionLatest, productsFlashSale] =
    await Promise.all([
      getProductsHot(),
      getCategoriesProducts(),
      getListPromotionHome(),
      getProductsFlashSale(),
    ]);

  return (
    <>
      <div className="  pb-8">
        <Banner />
        <LazySection>
          <GroupBanner bannerKey="bannerBottom" columns={4} gap={3} />
        </LazySection>



        <LazySection height="h-48">



          <ProductCarouselSection

            data={getValidData(productsHot) ?? []}
            bannerKey={bannerKeys.bannerTopSellingHome}
          />
        </LazySection>

        <LazySection height="h-48">
          <ProductCarouselSection
            data={getValidData(productsFlashSale) ?? []}
            bannerKey={bannerKeys.bannerFlashSale}
          />
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
          <PromotionLatest data={getValidData(promotionLatest) ?? []} />
        </LazySection>
      </div>

      <BannerPopup />
    </>
  );
}
