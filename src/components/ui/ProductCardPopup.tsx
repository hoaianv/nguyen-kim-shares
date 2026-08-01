import { i18nText } from "@/lib/i18nText";
import { List, CheckCircle } from "lucide-react";
import { calcDiscountPercentage, getMarketPrice, getPrice } from "@/lib/utils";
import { hotline } from "@/constants/company.constant";
import { IProduct } from "@/interfaces/models/IProduct.interface";
import { ITechnology } from "@/interfaces/common";

interface ProductPopupProps {
  data: IProduct;
  specs: ITechnology[];
  className?: string;
  warranty: string;
}

export default function ProductCardPopup({
  data,
  specs,
  className,
}: ProductPopupProps) {
  return (
    <div
      className={`w-[360px] overflow-hidden rounded-lg border border-border bg-background shadow-[0_18px_48px_-34px_rgba(15,23,42,0.48)] ${
        className || ""
      }`}
    >
      <div className="border-b border-border bg-slate-950 px-4 py-3">
        <h3 className="text-sm font-semibold uppercase leading-tight text-white">
          {data.name}
        </h3>
      </div>

      <div className="border-b border-border px-4 py-3">
        <div className="mb-2 space-y-2">
          <div className="flex flex-col space-y-1">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-lg font-semibold text-rose-600">
                {getPrice(data)}
                <span className="ml-1 text-xs font-normal text-muted-foreground">{i18nText("AUTO.components.ui.productcardpopup.line38_0_da_bao_gom_vat")}</span>
              </span>
              {data.isInStock &&
                data.marketPrice &&
                calcDiscountPercentage(data.price, data.marketPrice) > 0 && (
                  <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700">
                    {-calcDiscountPercentage(data.price, data.marketPrice)}%
                  </span>
                )}
            </div>
          </div>

          {getMarketPrice(data) && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">{i18nText("AUTO.components.ui.productcardpopup.line54_1_gia_thi_truong")}</span>
              <span className="text-xs text-muted-foreground line-through">
                {getMarketPrice(data)}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">{i18nText("AUTO.components.ui.productcardpopup.line63_2_bao_hanh")}</span>
            <span className="text-xs font-medium text-foreground">
              <span
                className="text-xs font-medium text-foreground"
                dangerouslySetInnerHTML={{ __html: data.warranty || "" }}
              />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">{i18nText("AUTO.components.ui.productcardpopup.line73_3_tinh_trang")}</span>
            {data?.isInStock ? (
              <p className="flex items-center gap-1 text-xs font-medium text-emerald-700">
                <CheckCircle size={14} />{i18nText("AUTO.components.ui.productcardpopup.line77_4_san_sang_giao_ngay")}</p>
            ) : (
              <h3
                onClick={() => (window.location.href = `tel:${hotline}`)}
                className="flex cursor-pointer items-center gap-1 text-xs font-medium text-rose-700"
              >{i18nText("AUTO.components.ui.productcardpopup.line84_5_lien_he_duoc_ho_tro")}</h3>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-amber-300 hover:bg-amber-50">
          <List size={18} />{i18nText("AUTO.components.ui.productcardpopup.line94_6_thong_so_san_pham")}</button>
      </div>

      <div className="space-y-2 px-4 pb-4 text-sm">
        {specs.map((spec, index) => (
          <div
            key={spec.id}
            className="grid grid-cols-[104px_1fr] items-start gap-3"
          >
            <span className="font-medium text-foreground">{spec.title}:</span>
            <span
              className="line-clamp-3 leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: spec.description }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

