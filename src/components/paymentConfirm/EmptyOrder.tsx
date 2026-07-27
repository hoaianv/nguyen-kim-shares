"use client";

import Button from "@/components/ui/button";

export default function EmptyOrder() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-600 text-lg">
          Không tìm thấy thông tin đơn hàng
        </p>
        <Button className="mt-4" onClick={() => (window.location.href = "/")}>
          Quay lại trang chủ
        </Button>
      </div>
    </main>
  );
}
