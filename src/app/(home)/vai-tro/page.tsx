"use client";

import { i18nText } from "@/lib/i18nText";
import Link from "next/link";
import { useState } from "react";
import { Users, UserCheck } from "lucide-react";

export default function RoleSelection() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{i18nText("AUTO.app.vai.tro.line16_0_lua_chon_vai_tro")}</h1>
          <p className="text-xl text-gray-600">{i18nText("AUTO.app.vai.tro.line19_1_chon_vai_tro_phu_hop")}</p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Partner Section */}
          <div
            onMouseEnter={() => setHoveredRole("partner")}
            onMouseLeave={() => setHoveredRole(null)}
            className="group relative"
          >
            <div
              className={`h-full rounded-lg border-2 p-8 md:p-12 transition-all duration-300 ${
                hoveredRole === "partner"
                  ? "border-orange-400 bg-gradient-to-br from-orange-50 to-amber-50 shadow-2xl scale-105"
                  : "border-gray-200 bg-white shadow-lg hover:shadow-xl hover:border-orange-300"
              }`}
            >
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-lg transition-colors ${
                    hoveredRole === "partner"
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                      : "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600"
                  }`}
                >
                  <Users size={32} />
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{i18nText("AUTO.app.vai.tro.line52_2_doi_tac")}</h2>

                {/* Badge */}
                <div className="inline-block mb-4">
                  <span className="rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-sm font-semibold text-white">
                    BUSINESS
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-8 flex-grow">{i18nText("AUTO.app.vai.tro.line64_3_dong_hanh_cung_chung_toi")}</p>

                {/* Benefits */}
                <ul className="space-y-2 mb-8 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-[#ffd500] to-amber-400 rounded-full mt-2"></span>
                    <span>{i18nText("AUTO.app.vai.tro.line73_4_duoc_huong_day_du_cac")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-[#ffd500] to-amber-400 rounded-full mt-2"></span>
                    <span>{i18nText("AUTO.app.vai.tro.line78_5_cap_nhat_thong_tin_san")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-[#ffd500] to-amber-400 rounded-full mt-2"></span>
                    <span>{i18nText("AUTO.app.vai.tro.line84_6_cap_nhat_gia_san_pham")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-[#ffd500] to-amber-400 rounded-full mt-2"></span>
                    <span>{i18nText("AUTO.app.vai.tro.line88_7_theo_doi_quan_ly_don")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-[#ffd500] to-amber-400 rounded-full mt-2"></span>
                    <span>{i18nText("AUTO.app.vai.tro.line93_8_uu_dai_bao_hanh_giam")}</span>
                  </li>
                </ul>

                {/* Button */}
                <Link href="/dang-ky" className="w-full">
                  <button
                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-bold transition-all duration-300 group/btn ${
                      hoveredRole === "partner"
                        ? "bg-gradient-to-r from-[#ffd500] to-amber-400 text-white hover:from-amber-500 hover:to-orange-500 shadow-lg"
                        : "bg-gradient-to-r from-[#ffd500] to-amber-400 text-white hover:from-amber-500 hover:to-orange-500 shadow-md"
                    }`}
                  >
                    <span>{i18nText("AUTO.app.vai.tro.line107_9_dang_ky_doi_tac")}</span>
                    <span
                      className={`transition-transform ${
                        hoveredRole === "partner" ? "translate-x-1" : ""
                      }`}
                    >
                      →
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Member Section - keeping existing */}
          <div
            onMouseEnter={() => setHoveredRole("member")}
            onMouseLeave={() => setHoveredRole(null)}
            className="group relative"
          >
            <div
              className={`h-full rounded-lg border-2 p-8 md:p-12 transition-all duration-300 ${
                hoveredRole === "member"
                  ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-2xl scale-105"
                  : "border-gray-200 bg-white shadow-lg hover:shadow-xl hover:border-emerald-300"
              }`}
            >
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-lg transition-colors ${
                    hoveredRole === "member"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                      : "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-600"
                  }`}
                >
                  <UserCheck size={32} />
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{i18nText("AUTO.app.vai.tro.line148_10_thanh_vien")}</h2>

                {/* Badge */}
                <div className="inline-block mb-4">
                  <span className="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-sm font-semibold text-white">
                    INDIVIDUAL
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-8 flex-grow">{i18nText("AUTO.app.vai.tro.line160_11_tro_thanh_thanh_vien_nhan")}</p>

                {/* Benefits */}
                <ul className="space-y-2 mb-8 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></span>{i18nText("AUTO.app.vai.tro.line169_12_truy_cap_noi_dung_doc")}</li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></span>{i18nText("AUTO.app.vai.tro.line173_13_uu_dai_giam_gia_dac")}</li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></span>{i18nText("AUTO.app.vai.tro.line177_14_tham_gia_cac_su_kien")}</li>
                </ul>

                {/* Button */}
                <Link
                  href="https://eu.vitinhnguyenkim.vn/dang-ky"
                  className="w-full"
                >
                  <button
                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-bold transition-all duration-300 group/btn ${
                      hoveredRole === "member"
                        ? "bg-gradient-to-r from-[#ffd500] to-amber-400 text-white hover:from-amber-500 hover:to-orange-500 shadow-lg"
                        : "bg-gradient-to-r from-[#ffd500] to-amber-400 text-white hover:from-amber-500 hover:to-orange-500 shadow-md"
                    }`}
                  >
                    <span>{i18nText("AUTO.app.vai.tro.line193_15_dang_ky_thanh_vien")}</span>
                    <span
                      className={`transition-transform ${
                        hoveredRole === "member" ? "translate-x-1" : ""
                      }`}
                    >
                      →
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >{i18nText("AUTO.app.vai.tro.line214_16_quay_lai")}</Link>
        </div>
      </div>
    </main>
  );
}

