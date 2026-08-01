"use client";

import { i18nText } from "@/lib/i18nText";
import Button from "@/components/ui/button";

export default function EmptyOrder() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-600 text-lg">{i18nText("AUTO.components.paymentconfirm.emptyorder.line10_0_khong_tim_thay_thong_tin")}</p>
        <Button className="mt-4" onClick={() => (window.location.href = "/")}>{i18nText("AUTO.components.paymentconfirm.emptyorder.line13_1_quay_lai_trang_chu")}</Button>
      </div>
    </main>
  );
}
