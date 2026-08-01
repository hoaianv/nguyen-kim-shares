"use client";

import { i18nText } from "@/lib/i18nText";
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
      router.push("/dang-nhap");
      return;
    }

    if (token) {
      setAuthCookie(token);
      setStatus("success");
      router.push("/");
    } else {
      setStatus("error");
      router.push("/dang-nhap");
    }
  }, [params, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <Loading size="lg" />

        {/* Trạng thái */}
        {status === "loading" && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{i18nText("AUTO.app.auth.callback.line45_0_dang_xu_ly_dang_nhap")}</h2>
            <p className="text-gray-500 text-sm">{i18nText("AUTO.app.auth.callback.line48_1_vui_long_doi_giay_lat")}{name}{i18nText("AUTO.app.auth.callback.line48_2_dang_xac_thuc_khoan")}</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-xl font-semibold text-green-600 mb-2">{i18nText("AUTO.app.auth.callback.line57_3_dang_nhap_thanh_cong")}</h2>
            <p className="text-gray-500 text-sm">{i18nText("AUTO.app.auth.callback.line60_4_he_thong_dang_chuyen_huong")}{name}...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-xl font-semibold text-red-600 mb-2">{i18nText("AUTO.app.auth.callback.line68_5_dang_nhap_that_bai")}</h2>
            <p className="text-gray-500 text-sm">{i18nText("AUTO.app.auth.callback.line71_6_da_loi_xay_ra_vui")}</p>
          </>
        )}
      </div>
    </div>
  );
}
