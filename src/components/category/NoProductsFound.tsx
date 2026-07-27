import { Package } from "lucide-react";
import Link from "next/link";

type NoProductsFoundProps = {
  resetHref?: string;
};

export default function NoProductsFound({
  resetHref = "/san-pham",
}: NoProductsFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/10 px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md border border-border/60 bg-background text-muted-foreground">
        <Package size={24} />
      </div>
      <h3 className="text-lg font-semibold text-foreground">
        Không có sản phẩm phù hợp với tiêu chí bạn đang chọn
      </h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Thử bớt bộ lọc hoặc quay lại danh mục để xem thêm lựa chọn khác.
      </p>

      <Link
        href={resetHref}
        className="mt-6 inline-flex h-11 items-center rounded-md border border-border/60 bg-background px-4 text-sm font-medium text-foreground transition hover:border-amber-300 hover:bg-amber-50/70"
      >
        Quay lại danh mục
      </Link>
    </div>
  );
}
