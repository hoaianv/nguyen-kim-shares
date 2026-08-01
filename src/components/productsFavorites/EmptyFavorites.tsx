"use client";

import { i18nText } from "@/lib/i18nText";
import { HeartOff } from "lucide-react";

export default function EmptyFavorites() {
  return (
    <div className="col-span-8 p-6 flex flex-col items-center justify-center text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 mb-4">
        <HeartOff className="h-10 w-10 text-pink-500" />
      </div>

      <h2 className="text-xl font-semibold text-gray-800">{i18nText("AUTO.components.productsfavorites.emptyfavorites.line13_0_chua_san_pham_yeu_thich")}</h2>
      <p className="mt-2 text-gray-500 max-w-sm">{i18nText("AUTO.components.productsfavorites.emptyfavorites.line16_1_hay_them_san_pham_vao")}</p>

      <a
        href="/"
        className="mt-6 inline-flex items-center px-5 py-2.5 rounded-lg bg-pink-600 text-white font-medium hover:bg-pink-700 shadow transition-colors"
      >{i18nText("AUTO.components.productsfavorites.emptyfavorites.line23_2_kham_pha_ngay")}</a>
    </div>
  );
}

