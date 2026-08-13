"use client";

import { i18nText } from "@/lib/i18nText";
import { Check } from "lucide-react";

const PaymentSection: React.FC<{}> = ({}) => {
  return (
    <div className="rounded-[28px] border theme-border bg-[var(--theme-section-bg)]/95 p-4 shadow-sm sm:p-6">
      <h3 className="mb-1 text-base font-semibold text-slate-950 sm:text-lg">{i18nText("AUTO.components.checkout.paymentsection.line9_0_phuong_thuc_thanh_toan")}</h3>
      <p className="mb-4 text-xs text-slate-500 sm:text-sm">{i18nText("AUTO.components.checkout.paymentsection.line12_1_thong_tin_thanh_toan_se")}</p>

      <div className="relative overflow-hidden rounded-[24px] border border-[var(--brand-primary)] bg-[var(--theme-section-soft)] p-4">
        <div className="absolute right-0 top-0 h-0 w-0 border-t-0 border-r-[30px] border-b-[30px] border-l-0 border-solid border-transparent border-r-amber-400 sm:border-r-[36px] sm:border-b-[36px]" />

        <Check
          size={14}
          className="absolute right-2 top-2 text-white sm:h-4 sm:w-4"
        />

        <div className="flex items-center">
          <label htmlFor="vnpay" className="flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="text-sm font-medium text-slate-950 sm:text-base">{i18nText("AUTO.components.checkout.paymentsection.line27_2_thanh_toan_chuyen_khoan_truc")}</span>
              <span className="w-fit rounded-full bg-slate-950 px-2 py-1 text-xs text-white">{i18nText("AUTO.components.checkout.paymentsection.line30_3_pho_bien_nhat")}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">{i18nText("AUTO.components.checkout.paymentsection.line34_4_ho_tro_thanh_toan_qua")}</p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
