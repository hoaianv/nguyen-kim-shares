"use client";
import Button from "@/components/ui/button";
import { name } from "@/constants/company.constant";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-blue-50 px-4">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-8">
          <div className="relative mx-auto mb-6 h-20 w-32">
            <div className="relative h-16 w-28 rounded-lg border-4 border-yellow-400 bg-gradient-to-r from-yellow-100 to-blue-100">
              <div className="absolute -right-2 top-1/2 h-6 w-2 -translate-y-1/2 rounded-r bg-yellow-400" />
              <div className="absolute inset-2 rounded bg-gradient-to-r from-yellow-300 to-blue-400 opacity-60" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <svg
                  className="h-6 w-6 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" />
                </svg>
              </div>
            </div>
            <div className="absolute -right-2 -top-2 h-4 w-4 animate-pulse rounded-full bg-blue-500" />
            <div className="absolute -bottom-1 -left-2 h-3 w-3 animate-pulse rounded-full bg-yellow-400 delay-300" />
          </div>
        </div>

        <div className="mb-8">
          <h1 className="mb-4 text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-blue-600">
            404
          </h1>
          <h2 className="mb-4 text-2xl font-semibold text-slate-800">
            Trang không tìm thấy
          </h2>
          <p className="mb-6 leading-relaxed text-slate-600">
            Trang bạn đang tìm kiếm đã bị ngắt kết nối hoặc không tồn tại. Hãy quay
            về trang chủ để khám phá các sản phẩm công nghệ chính hãng của {name}.
          </p>
        </div>

        <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-400 to-blue-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:from-yellow-500 hover:to-blue-700 hover:shadow-xl"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Về trang chủ
          </Link>

          <Button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-yellow-400 px-6 py-3 font-medium text-yellow-600 transition-all duration-300 hover:bg-yellow-50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Quay lại trang trước
          </Button>
        </div>

        <div className="text-sm text-slate-500">
          <p className="mb-1 font-medium text-yellow-600">
            {name} - Giải pháp công nghệ chính hãng
          </p>
          <p>Laptop, PC, Server, thiết bị mạng từ HP, Dell, Asus, Lenovo</p>
        </div>
      </div>
    </div>
  );
}
