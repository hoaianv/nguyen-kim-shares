"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ORDER_STATUS_LABEL } from "@/constants";

export default function OrderStatusTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") ?? "payment";

  const handleClick = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", key);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-5 rounded-[24px] border border-slate-200/80 bg-white/90 p-2 shadow-sm">
      <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 px-1 py-1">
        {Object.entries(ORDER_STATUS_LABEL).map(([key, label]) => {
          const isActive = currentStatus === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleClick(key)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-950 text-white shadow-sm"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
