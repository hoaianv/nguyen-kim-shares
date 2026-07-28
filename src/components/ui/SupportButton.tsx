"use client";

import { Headset } from "lucide-react";

interface SupportButtonProps {
  onClick: () => void;
}

export function SupportButton({ onClick }: SupportButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group fixed bottom-6 left-6 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-brand-hover bg-brand-hover text-white shadow-[0_10px_28px_-12px_rgba(226,185,10,0.8)] transition duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 animate-in zoom-in-50 fade-in duration-500"
      aria-label="Hỗ trợ khách hàng"
    >
      <Headset className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />

      {/* Ping animation */}
      <span className="pointer-events-none absolute -inset-1 rounded-full border border-brand/70 animate-[spin_2.8s_linear_infinite]" />
      <span className="pointer-events-none absolute -inset-2 rounded-full border border-dashed border-brand/50 animate-[spin_4.5s_linear_infinite_reverse]" />
      <span className="pointer-events-none absolute -inset-1 rounded-full border border-brand/70 animate-ping" />

      {/* Tooltip */}
      <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Hỗ trợ khách hàng
      </span>
    </button>
  );
}

