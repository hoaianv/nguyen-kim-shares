"use client";

import type React from "react";
import { Home, ShoppingBag } from "lucide-react";
import Button from "@/components/ui/button";
import InputSearch from "@/components/ui/inputSearch";

import { useSearchActions } from "@/hooks/useSearchActions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const { debouncedChange, handleKeyDown } = useSearchActions();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="  bg-[#F5F6FA]">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-5 py-16">
        {/* 404 Illustration */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <div className="text-[120px] md:text-[180px] font-bold text-[#FFD400] leading-none">
              404
            </div>
            <div className="text-6xl md:text-8xl opacity-20 -mt-8">🔍</div>
          </div>

          {/* Message Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              404 - Không tìm thấy trang
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
          </div>

          {/* Search Bar */}
          {/* <div className="mb-8 max-w-md mx-auto">
            <InputSearch onChange={debouncedChange} onKeyDown={handleKeyDown} />
          </div> */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="warning" icon={Home}>
              <Link href="/">Trang Chủ</Link>
            </Button>

            <Button variant="outline" icon={ShoppingBag} onClick={handleGoBack}>
              Quay lại trang trước
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
