"use client";

import { i18nText } from "@/lib/i18nText";
import { PackageX } from "lucide-react";

export default function EmptyViewed() {
  return (
    <div className="col-span-8 p-6 flex flex-col items-center justify-center text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
        <PackageX className="h-10 w-10 text-gray-500" />
      </div>

      <h2 className="text-xl font-semibold text-gray-800">{i18nText("AUTO.components.productviewed.emptyviewed.line13_0_khong_san_pham_nao_da")}</h2>
      <p className="mt-2 text-gray-500 max-w-sm">{i18nText("AUTO.components.productviewed.emptyviewed.line16_1_hay_kham_pha_san_pham")}</p>

      <a
        href="/"
        className="mt-6 inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >{i18nText("AUTO.components.productviewed.emptyviewed.line23_2_tiep_tuc_mua_sam")}</a>
    </div>
  );
}

