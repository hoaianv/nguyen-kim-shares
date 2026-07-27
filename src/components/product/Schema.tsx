import { IProductSchema } from "@/interfaces/models/IProduct.interface";
import Script from "next/script";

type ProductsProps = {
  data: IProductSchema | null;
};

export default function Schema({ data }: ProductsProps) {
  return (
    <>
      <Script
        id={`json-ld-breadcrumb-${data?.productId}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data?.breadcrumb) || "",
        }}
      />{" "}
      <Script
        id={`json-ld-product`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data?.product) || "",
        }}
      />
    </>
  );
}
