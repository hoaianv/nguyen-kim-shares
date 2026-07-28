"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IBrand } from "@/interfaces/models/ICategoryDetail.interface";
import { ESlugType } from "@/interfaces/models/ISlug.interface";

function FilterBrand({ listBrand }: { listBrand: IBrand[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = searchParams.get(ESlugType.Brand) ?? "";

  const toggle = (slug: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (selected === slug) next.delete(ESlugType.Brand);
    else next.set(ESlugType.Brand, slug);
    next.delete("page");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  if (!listBrand?.length) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-slate-900">Chọn theo thương hiệu</h2>
      <div className="flex flex-wrap gap-2">
        {listBrand.map((brand) => {
          const slug = brand.slug || (brand as { url?: string }).url || "";
          const active = selected === slug;

          return (
            <button
              key={brand.brandId ?? slug}
              type="button"
              onClick={() => toggle(slug)}
              aria-pressed={active}
              title={brand.title}
              className={`flex h-10 w-[106px] items-center justify-center rounded-sm border px-3 transition ${
                active
                  ? "border-brand bg-brand-soft"
                  : "border-slate-200 bg-white hover:border-brand"
              }`}
            >
              {brand.picture ? (
                <Image
                  src={brand.picture}
                  alt={brand.title}
                  width={80}
                  height={28}
                  className="max-h-6 w-auto max-w-full object-contain"
                />
              ) : (
                <span className="truncate text-xs font-semibold uppercase text-slate-700">
                  {brand.title}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default FilterBrand;
