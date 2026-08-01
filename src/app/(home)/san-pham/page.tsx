import { i18nText } from "@/lib/i18nText";
import { getAll } from "@/apis/models/menu.apis";
import { getBestSeller } from "@/apis/models/products.apis";
import PaginationDynamic from "@/components/ui/PaginationDynamic";
import { Props } from "@/interfaces/common";
import { getValidData } from "@/lib/utils";
import dynamic from "next/dynamic";
import CategoryTree from "@/components/products/CategoryTree";
import Link from "next/link";

const CardProduct = dynamic(() => import("@/components/ui/cardProduct"), {
  ssr: false,
});
const EmptyProducts = dynamic(
  () => import("@/components/products/EmptyProducts"),
  {
    ssr: false,
  }
);

export default async function page({ searchParams }: Props) {
  const query = searchParams["q"] ?? "";
  const page = searchParams["page"] ?? "1";

  const [categories, products] = await Promise.all([
    getAll(),
    getBestSeller(query, page),
  ]);

  const dataCategories = getValidData(categories);
  const dataProducts = getValidData(products);

  return (
    <main className="mx-auto mt-3 h-full w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-16 2xl:max-w-[1520px] 2xl:px-20">
      <section className="border border-border bg-background p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{i18nText("AUTO.app.san.pham.line38_0_catalog_showroom")}</p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{i18nText("AUTO.app.san.pham.line41_1_danh_muc_san_pham")}</h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{i18nText("AUTO.app.san.pham.line44_2_kham_pha_nhom_hang_theo")}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex h-9 items-center border border-border bg-background px-3 text-xs font-medium uppercase tracking-[0.18em] text-foreground">
                {dataProducts?.items?.length ?? 0}{i18nText("AUTO.app.san.pham.line50_3_san_pham")}</span>
              <span className="inline-flex h-9 items-center border border-border bg-background px-3 text-xs font-medium uppercase tracking-[0.18em] text-foreground">
                {dataCategories?.length ?? 0}{i18nText("AUTO.app.san.pham.line53_4_danh_muc")}</span>
              {query ? (
                <span className="inline-flex h-9 items-center border border-amber-300 bg-amber-50 px-3 text-xs font-medium uppercase tracking-[0.18em] text-amber-800">{i18nText("AUTO.app.san.pham.line57_5_tu_khoa")}{query}
                </span>
              ) : null}
            </div>
          </div>

          <div className="border border-border bg-muted/20 p-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{i18nText("AUTO.app.san.pham.line66_6_loi_vao_nhanh")}</p>
              <p className="text-xs text-muted-foreground">
                {dataCategories?.length ?? 0}{i18nText("AUTO.app.san.pham.line69_7_nhom")}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(dataCategories ?? []).slice(0, 4).map((item) => (
                <Link
                  key={item.id}
                  href={`/${item.url}`}
                  className="group flex min-h-20 flex-col justify-between border border-border bg-background p-3 transition hover:border-amber-300 hover:bg-amber-50/40"
                >
                  <span className="line-clamp-2 text-sm font-medium text-foreground">
                    {item.title}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{i18nText("AUTO.app.san.pham.line83_8_kham_pha")}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 border border-border bg-background p-3">
            <div className="mb-3 border-b border-border pb-3">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{i18nText("AUTO.app.san.pham.line97_9_danh_muc_phu")}</p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">{i18nText("AUTO.app.san.pham.line100_10_kham_pha_nhanh")}</h2>
            </div>
            <CategoryTree categories={dataCategories ?? []} />
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-4 flex items-end justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{i18nText("AUTO.app.san.pham.line111_11_best_seller")}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                {dataProducts?.title || i18nText("AUTO.app.san.pham.line114_12_san_pham_noi_bat")}
              </h2>
            </div>
            <div className="text-sm text-muted-foreground">
              {dataProducts?.items?.length ?? 0}{i18nText("AUTO.app.san.pham.line118_13_san_pham")}</div>
          </div>

          {dataProducts?.items && dataProducts.items.length > 0 ? (
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(228px, 1fr))",
              }}
            >
              {dataProducts.items.map((item) => (
                <div key={item.id} className="w-full">
                  <CardProduct item={item} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyProducts />
          )}

          {dataProducts?.pagination ? (
            <div className="flex justify-center pt-8 sm:pt-10 lg:pt-12">
              <PaginationDynamic data={dataProducts.pagination} />
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
