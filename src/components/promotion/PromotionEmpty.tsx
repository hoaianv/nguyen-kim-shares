"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tag, RefreshCw, Home } from "lucide-react";

interface PromotionEmptyStateProps {
  backHref?: string;
  onReload?: () => void;
}

export function PromotionEmpty({
  backHref = "/",
  onReload,
}: PromotionEmptyStateProps) {
  const router = useRouter();

  const handleReload = () => {
    if (onReload) {
      onReload();
    } else {
      router.refresh();
    }
  };

  return (
    <div
      className={"container mx-auto max-w-lg px-4 py-12 text-center"}
      role="status"
      aria-label="Không có tin khuyến mãi"
    >
      {/* Icon */}
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
          <Tag
            className="h-12 w-12 text-gray-400 dark:text-gray-500"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Chưa có khuyến mãi nào
      </h2>

      {/* Description */}
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Hiện tại chưa có chương trình khuyến mãi nào. Vui lòng quay lại sau hoặc
        khám phá các sản phẩm khác.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={handleReload}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
          aria-label="Tải lại danh sách khuyến mãi"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Tải lại
        </button>

        <Link
          href={backHref}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Quay về trang chủ"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

