import { getProductsViewed } from "@/apis/models/products.apis";
import EmptyViewed from "@/components/productViewed/EmptyViewed";
import ProductsViewed from "@/components/productViewed/ProductsViewed";
import { IProductsViewed } from "@/interfaces/models/IProduct.interface";
import { getValidData } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams["page"] ?? "1";
  const perPage = "8";

  const response = await getProductsViewed(page, perPage);
  const data = getValidData<IProductsViewed>(response);
  if (!data) {
    return <EmptyViewed />;
  }

  const hasItems = data.items && data.items.length > 0;

  return (
    <div className="  lg:p-3">
      <h2 className="text-2xl font-semibold mb-3">Sản phẩm đã xem</h2>
      {hasItems ? (
        <ProductsViewed data={data.items} pagination={data.pagination} />
      ) : (
        <EmptyViewed />
      )}
    </div>
  );
}
