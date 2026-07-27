"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { name } from "@/constants/company.constant";
import Loading from "@/components/ui/loading";
import { setAuthCookie } from "@/apis/common/auth.apis";

export default function CallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const token = params.get("token");
    const error = params.get("error");

    if (error) {
      setStatus("error");
      router.push("/login");
      return;
    }

    if (token) {
      setAuthCookie(token);
      setStatus("success");
      router.push("/");
    } else {
      setStatus("error");
      router.push("/login");
    }
  }, [params, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <Loading size="lg" />

        {/* Trạng thái */}
        {status === "loading" && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Đang xử lý đăng nhập Google...
            </h2>
            <p className="text-gray-500 text-sm">
              Vui lòng đợi trong giây lát, hệ thống {name} đang xác thực tài
              khoản của bạn.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Đăng nhập thành công!
            </h2>
            <p className="text-gray-500 text-sm">
              Hệ thống đang chuyển hướng bạn về trang chủ {name}...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Đăng nhập thất bại!
            </h2>
            <p className="text-gray-500 text-sm">
              Đã có lỗi xảy ra, vui lòng thử lại hoặc đăng nhập bằng tài khoản
              khác.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
