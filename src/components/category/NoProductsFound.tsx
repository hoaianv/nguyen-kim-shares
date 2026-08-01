import { i18nText } from "@/lib/i18nText";
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
      <h3 className="text-lg font-semibold text-foreground">{i18nText("AUTO.components.category.noproductsfound.line17_0_khong_san_pham_phu_hop")}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{i18nText("AUTO.components.category.noproductsfound.line20_1_thu_bot_bo_loc_hoac")}</p>

      <Link
        href={resetHref}
        className="mt-6 inline-flex h-11 items-center rounded-md border border-border/60 bg-background px-4 text-sm font-medium text-foreground transition hover:border-amber-300 hover:bg-amber-50/70"
      >{i18nText("AUTO.components.category.noproductsfound.line27_2_quay_lai_danh_muc")}</Link>
    </div>
  );
}
