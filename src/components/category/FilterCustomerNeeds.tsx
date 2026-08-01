"use client";

import { i18nText } from "@/lib/i18nText";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ESlugType } from "@/interfaces/models/ISlug.interface";
import type { ICustomerNeeds } from "@/interfaces/models/ICategoryDetail.interface";

export default function FilterCustomerNeeds({ needs }: { needs: ICustomerNeeds[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = searchParams.get(ESlugType.Demand) ?? "";

  const selectNeed = (value?: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(ESlugType.Demand, value);
    else next.delete(ESlugType.Demand);
    next.delete("page");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  if (!needs?.length) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-slate-900">{i18nText("AUTO.components.category.filtercustomerneeds.line27_0_chon_theo_nhu_cau")}</h2>
      <div className="flex flex-wrap gap-3">
        {needs.map((need) => {
          const active = selected === need.url;
          return (
            <button
              key={need.id}
              type="button"
              onClick={() => selectNeed(active ? undefined : need.url)}
              aria-pressed={active}
              className={`flex h-[94px] w-[112px] flex-col items-center justify-center rounded-sm border p-2 text-center transition ${
                active
                  ? "border-brand bg-brand-soft"
                  : "border-slate-200 bg-white hover:border-brand"
              }`}
            >
              <Image
                src={need.picture || "/images/categories/laptop_demand.png"}
                alt={need.title}
                width={52}
                height={52}
                className="h-12 w-12 object-contain"
              />
              <span className="mt-1 line-clamp-1 text-xs font-medium text-slate-800">
                {need.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
