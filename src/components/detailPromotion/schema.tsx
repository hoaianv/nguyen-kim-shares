import { IPromotionSchema } from "@/interfaces/models/IPromotion.interface";
import Script from "next/script";

type PromotionProps = {
  data: IPromotionSchema | null;
};

export default function Schema({ data }: PromotionProps) {
  return (
    <>
      <Script
        id={`json-ld-promotion-breadcrumb`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data?.breadcrumb) || "",
        }}
      />
      <Script
        id={`json-ld-promotion`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data?.promotionSchema) || "",
        }}
      />
    </>
  );
}
