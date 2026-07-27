"use client";

import { HeartOff } from "lucide-react";

export default function EmptyFavorites() {
  return (
    <div className="col-span-8 p-6 flex flex-col items-center justify-center text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 mb-4">
        <HeartOff className="h-10 w-10 text-pink-500" />
      </div>

      <h2 className="text-xl font-semibold text-gray-800">
        Chưa có sản phẩm yêu thích nào
      </h2>
      <p className="mt-2 text-gray-500 max-w-sm">
        Hãy thêm sản phẩm vào danh sách yêu thích để tiện theo dõi sau này.
      </p>

      <a
        href="/"
        className="mt-6 inline-flex items-center px-5 py-2.5 rounded-lg bg-pink-600 text-white font-medium hover:bg-pink-700 shadow transition-colors"
      >
        Khám phá ngay
      </a>
    </div>
  );
}

