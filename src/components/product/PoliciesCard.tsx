"use client";

import { i18nText } from "@/lib/i18nText";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";

type Policy = { label: string; href: string };

const defaultPolicies: Policy[] = [
  { label: i18nText("AUTO.components.product.policiescard.line9_0_chinh_sach_cookie"), href: "/chinh-sach-cookie" },
  { label: i18nText("AUTO.components.product.policiescard.line10_1_chinh_sach_bao_mat_tt"), href: "/chinh-sach-bao-mat" },
  { label: i18nText("AUTO.components.product.policiescard.line11_2_giao_hang_lap_dat"), href: "/giao-hang-lap-dat" },
  { label: i18nText("AUTO.components.product.policiescard.line12_3_chinh_sach_bao_hanh_doi"), href: "/bao-hanh-doi-tra" },
  { label: i18nText("AUTO.components.product.policiescard.line13_4_quy_dinh_thanh_toan"), href: "/quy-dinh-thanh-toan" },
  { label: i18nText("AUTO.components.product.policiescard.line14_5_huong_dan_mua_hang_online"), href: "/huong-dan-mua-online" },
];

export default function PoliciesCard({
  items = defaultPolicies,
}: {
  items?: Policy[];
}) {
  return (
    <aside className="h-full rounded-lg bg-white border border-gray-200 shadow-sm p-3 sm:p-4">
      <h3 className="text-base sm:text-base font-semibold text-gray-800 mb-3">{i18nText("AUTO.components.product.policiescard.line25_6_chinh_sach_mua_hang")}</h3>
      <ul className="space-y-2">
        {items.map((p) => (
          <li key={p.href}>
            <Link
              href={`/chinh-sach/${p.href}` || "#"}
              className="flex items-start gap-2 text-[13px] sm:text-sm text-blue-600 hover:text-blue-700"
            >
              <FileText size={16} className="mt-[2px]" />
              <span className="flex-1">{p.label}</span>
              <ChevronRight
                size={16}
                className="text-blue-400 hidden sm:block"
              />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

