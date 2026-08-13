import { useTranslations } from "next-intl";

export default function HeadPromotion() {
  const t = useTranslations();

  return (
    <div className="mb-3 sm:mb-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] sm:text-xs font-medium text-emerald-700">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
        {t("PROMOTION.ongoing_offers")}
      </div>
      <h1 className="mt-2 text-lg sm:text-2xl font-semibold  text-zinc-900">
        {t("PROMOTION.promotion_news")}
      </h1>
      <p className="mt-1 text-xs sm:text-sm text-zinc-600">
        {t("PROMOTION.daily_offers_summary")}
      </p>
    </div>
  );
}
