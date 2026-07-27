import Link from "next/link";
import Breadcrumb from "@/components/ui/breadcrumb";
import type { IBreadcrumb } from "@/interfaces/common";
import type {
  IBrand,
  ICustomerNeeds,
} from "@/interfaces/models/ICategoryDetail.interface";
import { ESlugType } from "@/interfaces/models/ISlug.interface";

type CategoryHeroProps = {
  breadcrumb: IBreadcrumb[];
  categorySlug: string;
  categoryTitle: string;
  searchParams: Record<string, string | string[] | undefined>;
  totalProducts: number;
  listBrand: IBrand[];
  customerNeeds?: ICustomerNeeds[] | null;
};

const getSingleValue = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] : value ?? "";

const buildHref = (
  categorySlug: string,
  searchParams: Record<string, string | string[] | undefined>,
  updates?: Record<string, string | undefined>,
  clearAll = false
) => {
  const next = new URLSearchParams();

  if (!clearAll) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key === "page" || key === "perPage" || key === "catUrl") return;
      const current = getSingleValue(value);
      if (current) next.set(key, current);
    });
  }

  Object.entries(updates ?? {}).forEach(([key, value]) => {
    if (!value) next.delete(key);
    else next.set(key, value);
  });

  const qs = next.toString();
  return qs ? `/${categorySlug}?${qs}` : `/${categorySlug}`;
};

export default function CategoryHero({
  breadcrumb,
  categorySlug,
  categoryTitle,
  searchParams,
  totalProducts,
  listBrand,
  customerNeeds,
}: CategoryHeroProps) {
  const brandLinks = (listBrand ?? []).slice(0, 3);
  const needLinks = (customerNeeds ?? []).slice(0, 3);

  return (
    <section className="space-y-3 border-b border-border/60 pb-4">
      <Breadcrumb items={breadcrumb ?? []} className="text-sm text-muted-foreground" />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] uppercase tracking-[0.26em] text-muted-foreground">
              Danh mục {categoryTitle}
            </p>
            <span className="inline-flex h-7 items-center rounded-md border border-border/60 bg-background px-2.5 text-xs font-medium text-foreground">
              {totalProducts} sản phẩm
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {categoryTitle}
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            Chọn nhanh theo thương hiệu, nhu cầu, mức giá và cấu hình để duyệt nhiều
            mẫu laptop hơn mà không làm nặng giao diện.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent lg:max-w-[520px] lg:flex-wrap lg:justify-end lg:overflow-visible lg:pb-0">
          <Link
            href={buildHref(categorySlug, searchParams, undefined, true)}
            className="inline-flex h-9 shrink-0 items-center rounded-md border border-border/60 bg-background px-3 text-xs font-medium text-foreground transition hover:border-amber-300 hover:bg-amber-50/70"
          >
            Tất cả
          </Link>
          {brandLinks.map((brand) => (
            <Link
              key={brand.brandId ?? brand.slug}
              href={buildHref(categorySlug, searchParams, {
                [ESlugType.Brand]: brand.slug,
              })}
              className="inline-flex h-9 shrink-0 items-center rounded-md border border-border/60 bg-muted/20 px-3 text-xs font-medium text-foreground transition hover:border-amber-300 hover:bg-amber-50/70"
              title={brand.title}
            >
              {brand.title}
            </Link>
          ))}
          {needLinks.map((need) => (
            <Link
              key={need.id}
              href={buildHref(categorySlug, searchParams, {
                [ESlugType.Demand]: need.url,
              })}
              className="inline-flex h-9 shrink-0 items-center rounded-md border border-border/60 bg-muted/20 px-3 text-xs font-medium text-foreground transition hover:border-amber-300 hover:bg-amber-50/70"
              title={need.title}
            >
              {need.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
