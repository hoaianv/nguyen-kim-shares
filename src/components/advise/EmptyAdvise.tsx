"use client";
import Button from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function EmptyAdvise() {
  return (
    <div className="text-center py-14 px-6 rounded-lg border border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-sm">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100">
          <MessageSquare className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      {/* Tiêu đề */}
      <h3 className="text-xl font-semibold text-gray-800">
        Hiện chưa có câu hỏi tư vấn nào
      </h3>

      {/* Mô tả */}
      <p className="mt-2 text-gray-600 max-w-md mx-auto">
        Hãy là người đầu tiên gửi câu hỏi để được đội ngũ{" "}
        <span className="font-medium text-gray-900">chuyên gia</span> của chúng
        tôi tư vấn chi tiết và nhanh chóng ✨
      </p>
    </div>
  );
}

