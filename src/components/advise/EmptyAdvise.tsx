"use client";
import { i18nText } from "@/lib/i18nText";
import Button from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function EmptyAdvise() {
  return (
    <div className="text-center py-14 px-6 rounded-lg border border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-sm">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100">
          <MessageSquare className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      {/* Tiêu đề */}
      <h3 className="text-xl font-semibold text-gray-800">{i18nText("AUTO.components.advise.emptyadvise.line17_0_hien_chua_cau_hoi_tu")}</h3>

      {/* Mô tả */}
      <p className="mt-2 text-gray-600 max-w-md mx-auto">{i18nText("AUTO.components.advise.emptyadvise.line22_1_hay_nguoi_dau_tien_gui")}{" "}
        <span className="font-medium text-gray-900">{i18nText("AUTO.components.advise.emptyadvise.line23_2_chuyen_gia")}</span>{i18nText("AUTO.components.advise.emptyadvise.line23_3_chung_toi_tu_van_chi")}</p>
    </div>
  );
}

