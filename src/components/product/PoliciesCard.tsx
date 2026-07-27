"use client";

import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";

type Policy = { label: string; href: string };

const defaultPolicies: Policy[] = [
  { label: "Chính sách cookie", href: "/chinh-sach-cookie" },
  { label: "Chính sách bảo mật TT cá nhân", href: "/chinh-sach-bao-mat" },
  { label: "Giao hàng và lắp đặt", href: "/giao-hang-lap-dat" },
  { label: "Chính sách bảo hành đổi, trả", href: "/bao-hanh-doi-tra" },
  { label: "Quy định thanh toán", href: "/quy-dinh-thanh-toan" },
  { label: "Hướng dẫn mua hàng online", href: "/huong-dan-mua-online" },
];

export default function PoliciesCard({
  items = defaultPolicies,
}: {
  items?: Policy[];
}) {
  return (
    <aside className="h-full rounded-lg bg-white border border-gray-200 shadow-sm p-3 sm:p-4">
      <h3 className="text-base sm:text-base font-semibold text-gray-800 mb-3">
        CHÍNH SÁCH MUA HÀNG
      </h3>
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

