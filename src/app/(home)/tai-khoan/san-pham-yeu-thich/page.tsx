import { i18nText } from "@/lib/i18nText";
import { getAll } from "@/apis/models/favorite.apis";
import ProductsFavorites from "@/components/productsFavorites/ProductsFavorites";
import EmptyFavorites from "@/components/productsFavorites/EmptyFavorites";
import { IProductsFavorite } from "@/interfaces/models/IFavorite.interface";
import { getValidData } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams["page"] ?? "1";
  const perPage = "8";

  const response = await getAll(page, perPage);
  const data = getValidData<IProductsFavorite>(response);

  if (!data) {
    return <EmptyFavorites />;
  }

  const hasItems = data.items && data.items.length > 0;

  return (
    <div className=" lg:p-3">
      <h2 className="text-2xl font-semibold mb-3">{i18nText("AUTO.app.khoan.san.pham.yeu.line26_0_san_pham_yeu_thich")}</h2>
      {hasItems ? (
        <ProductsFavorites data={data.items} pagination={data.pagination} />
      ) : (
        <EmptyFavorites />
      )}
    </div>
  );
}
