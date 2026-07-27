import { getProductsViewed } from "@/apis/models/products.apis";
import CardProduct from "@/components/ui/cardProduct";
import PaginationDynamic from "@/components/ui/PaginationDynamic";
import { IPagination } from "@/interfaces/common";
import { IProduct } from "@/interfaces/models/IProduct.interface";

interface ProductsViewedProps {
  data: IProduct[];
  pagination: IPagination;
}

export default function ProductsViewed({
  data,
  pagination,
}: ProductsViewedProps) {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {data.map((item) => (
          <CardProduct key={item.id} item={item} />
        ))}
      </div>

      <PaginationDynamic data={pagination} />
    </div>
  );
}
