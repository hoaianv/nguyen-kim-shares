import { i18nText } from "@/lib/i18nText";
import { getListPromotion } from "@/apis/models/promotion.apis";
import CardPromotion from "@/components/promotion/cardPromotion";
import HeadPromotion from "@/components/promotion/HeadPromotion";
import { PromotionEmpty } from "@/components/promotion/PromotionEmpty";
import Breadcrumb from "@/components/ui/breadcrumb";
import PaginationDynamic from "@/components/ui/PaginationDynamic";
import { getValidData } from "@/lib/utils";

interface PageProps {
  searchParams: { [key: string]: string };
}

export default async function page({ searchParams }: PageProps) {
  const page = searchParams["page"] ?? "1";

  const response = await getListPromotion(page);
  const data = getValidData(response) as any;

  return (
    <div className="">
      <div
        className="mx-auto h-full w-full max-w-7xl 2xl:max-w-[1520px]
px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20"
      >
        {/* Breadcrumb */}
        <div className="pt-2">
          <Breadcrumb
            items={[{ name: i18nText("AUTO.app.tin.khuyen.mai.line28_0_tin_khuyen_mai"), url: "/tin-khuyen-mai" }]}
          />
        </div>

        {data && data?.items.length > 0 ? (
          <section className="mt-3 sm:mt-4">
            {/* Header khu vực */}
            <HeadPromotion />

            {/* Grid responsive: 1 → 2 → 3 → 4 cột */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {data.items.map((item: any) => (
                <CardPromotion key={item.id} item={item} />
              ))}
            </div>

            {/* Pagination có khoảng đệm */}
            <div className="mt-4 sm:mt-6">
              <PaginationDynamic data={data?.pagination} />
            </div>
          </section>
        ) : (
          <div className="mt-6">
            <PromotionEmpty />
          </div>
        )}
      </div>
    </div>
  );
}
