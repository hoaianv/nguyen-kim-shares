import {
  getCategories,
  getListNews,
  getMostViewedNews,
  getPromotionNews,
  newsMain,
} from "@/apis/models/news.apis";
import Categories from "@/components/news/categories";
import ListNews from "@/components/news/ListNews";
import MainNews from "@/components/news/mainNews";
import MostViewedNews from "@/components/news/MostViewedNews";
import Promotion from "@/components/news/Promotion";
import { getValidData } from "@/lib/utils";

interface PageProps {
  searchParams: { [key: string]: string };
}

export default async function page({ searchParams }: PageProps) {
  const params = searchParams["danh-muc"] ?? "danh-gia-san-pham-moi";
  const page = searchParams["page"] ?? "1";

  const [categories, mainNews, listNews, promotionNews, topViews] =
    await Promise.all([
      getCategories(),
      newsMain(params),
      getListNews(params, page),
      getPromotionNews(),
      getMostViewedNews(),
    ]);

  return (
    <div
      className={
        "mx-auto h-full w-full max-w-7xl 2xl:max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20"
      }
    >
      <Categories data={getValidData(categories) ?? []} />
      <MainNews data={getValidData(mainNews) ?? []} />
      <div
        className="grid 
  grid-cols-1 
  lg:grid-cols-10 
  mt-3 
  gap-4 
  lg:gap-2"
      >
        <ListNews data={getValidData(listNews) ?? undefined} />
        <Promotion data={getValidData(promotionNews) ?? []} />
      </div>
      <MostViewedNews data={getValidData(topViews) ?? []} />
    </div>
  );
}
