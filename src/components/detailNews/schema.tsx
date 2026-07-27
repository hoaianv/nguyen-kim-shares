import { INewsSchema } from "@/interfaces/models/INews.interface";
import Script from "next/script";

type CategoryProps = {
  data: { newsId?: number; news: INewsSchema } | null;
};

export default function Schema({ data }: CategoryProps) {
  return (
    <>
      <Script
        id={`json-ld-news`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data?.news) || "",
        }}
      />
    </>
  );
}
