"use client";

import { Headset } from "lucide-react";

interface SupportButtonProps {
  onClick: () => void;
}

export function SupportButton({ onClick }: SupportButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed left-6 bottom-6 z-30 w-16 h-16 rounded-lg bg-gradient-to-br from-[#ffb716] to-[#ffa500] shadow-2xl hover:shadow-[0_10px_40px_rgba(255,183,22,0.5)] flex items-center justify-center transition-all duration-300 hover:scale-110 group animate-in zoom-in-50 fade-in duration-500"
      aria-label="Hỗ trợ khách hàng"
    >
      <Headset className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-200" />

      {/* Ping animation */}
      <span className="absolute inset-0 rounded-lg bg-[#ffb716] animate-ping opacity-20" />

      {/* Tooltip */}
      <span className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Hỗ trợ khách hàng
      </span>
    </button>
  );
}

