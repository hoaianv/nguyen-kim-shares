import { PackageX } from "lucide-react";
import Link from "next/link";

export default function EmptyProducts() {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-border bg-background px-6 py-14 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center border border-border bg-muted/30 text-muted-foreground">
        <PackageX className="h-8 w-8" />
      </div>

      <h2 className="text-xl font-semibold text-foreground">
        Không có sản phẩm nào phù hợp
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        Thử lại với từ khóa khác hoặc quay về danh mục để xem thêm lựa chọn.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center border border-border bg-background px-5 text-sm font-medium text-foreground transition hover:border-amber-300 hover:bg-amber-50"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
}
