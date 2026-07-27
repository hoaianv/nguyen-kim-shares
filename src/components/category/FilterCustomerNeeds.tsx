"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ESlugType } from "@/interfaces/models/ISlug.interface";
import type { ICustomerNeeds } from "@/interfaces/models/ICategoryDetail.interface";

export default function FilterCustomerNeeds({
  needs,
}: {
  needs: ICustomerNeeds[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const selected = sp.get(ESlugType.Demand) ?? "";

  const setParam = (value?: string) => {
    const next = new URLSearchParams(sp.toString());
    if (!value) next.delete(ESlugType.Demand);
    else next.set(ESlugType.Demand, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  if (!needs?.length) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Nhu cầu
        </h2>
        {selected ? (
          <button
            type="button"
            onClick={() => setParam(undefined)}
            className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            Bỏ chọn
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
        {needs.map((need) => {
          const isActive = selected === need.url;
          return (
            <button
              key={need.id}
              type="button"
              onClick={() => setParam(isActive ? undefined : need.url)}
              className={`group flex min-h-[96px] flex-col items-start rounded-md border p-3 text-left transition ${
                isActive
                  ? "border-amber-300 bg-amber-50"
                  : "border-border/60 bg-muted/20 hover:border-amber-300 hover:bg-amber-50/70"
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-border/60 bg-background">
                <Image
                  src={need.picture || "/images/categories/laptop_demand.png"}
                  alt={need.title}
                  width={40}
                  height={40}
                  className="h-7 w-7 object-contain"
                />
              </span>

              <span
                className={`mt-3 text-sm font-medium leading-snug ${
                  isActive ? "text-amber-800" : "text-foreground"
                }`}
              >
                {need.title}
              </span>

              {need.description ? (
                <span className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                  {need.description}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
