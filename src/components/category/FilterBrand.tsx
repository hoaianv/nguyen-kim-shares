"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IBrand } from "@/interfaces/models/ICategoryDetail.interface";
import { ESlugType } from "@/interfaces/models/ISlug.interface";

function FilterBrand({ listBrand }: { listBrand: IBrand[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const selected = sp.get(ESlugType.Brand) ?? "";

  const setParam = (key: string, value?: string) => {
    const next = new URLSearchParams(sp.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggle = (slug: string) => {
    if (selected === slug) setParam(ESlugType.Brand);
    else setParam(ESlugType.Brand, slug);
  };

  if (!listBrand?.length) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Thương hiệu
        </h2>
        {selected ? (
          <button
            type="button"
            onClick={() => setParam(ESlugType.Brand)}
            className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            Bỏ chọn
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
        {listBrand.map((b) => {
          const slug = b.slug || (b as any).url || "";
          const active = selected === slug;

          return (
            <button
              key={b.brandId ?? slug}
              type="button"
              onClick={() => toggle(slug)}
              aria-pressed={active}
              title={b.title}
              className={`group flex h-12 items-center gap-2 rounded-md border px-3 text-left transition ${
                active
                  ? "border-amber-300 bg-amber-50 text-amber-800"
                  : "border-border/60 bg-muted/20 text-foreground hover:border-amber-300 hover:bg-amber-50/70"
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border/60 bg-background">
                {b.picture ? (
                  <Image
                    src={b.picture}
                    alt={b.title}
                    width={80}
                    height={28}
                    className="max-h-5 w-auto object-contain"
                  />
                ) : (
                  <span className="h-4 w-4 rounded-sm bg-border" />
                )}
              </span>

              <span className="min-w-0 flex-1 truncate text-xs font-medium uppercase tracking-[0.14em]">
                {b.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default FilterBrand;
