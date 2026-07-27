import { ICategorySchema } from "@/interfaces/models/ICategories.interface";
import Script from "next/script";

type CategoryProps = {
  data: { categoryId?: number; category: ICategorySchema } | null;
};

export default function Schema({ data }: CategoryProps) {
  return (
    <>
      <Script
        id={`json-ld-category`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data?.category) || "",
        }}
      />
    </>
  );
}
