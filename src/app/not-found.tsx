import { i18nText } from "@/lib/i18nText";
import { name } from "@/constants/company.constant";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-8">
          <div className="relative mx-auto mb-6 h-20 w-32">
            <div
              className="relative h-16 w-28 rounded-lg border-4 bg-white"
              style={{
                borderColor: "#ffd500",
              }}
            >
              <div
                className="absolute -right-2 top-1/2 h-6 w-2 -translate-y-1/2 rounded-r"
                style={{
                  backgroundColor: "#ffd500",
                }}
              />
              <div
                className="absolute inset-2 rounded opacity-20"
                style={{
                  backgroundColor: "#ffd500",
                }}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <svg
                  className="h-6 w-6"
                  style={{ color: "#1435c3" }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" />
                </svg>
              </div>
            </div>
            <div
              className="absolute -right-2 -top-2 h-4 w-4 animate-pulse rounded-full"
              style={{
                backgroundColor: "#1435c3",
              }}
            />
            <div
              className="absolute -bottom-1 -left-2 h-3 w-3 animate-pulse rounded-full delay-300"
              style={{
                backgroundColor: "#ffd500",
              }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h1 className="mb-4 text-6xl font-semibold" style={{ color: "#ffd500" }}>
            404
          </h1>
          <h2 className="mb-4 text-2xl font-semibold text-slate-800">{i18nText("AUTO.app.not.found.line59_0_he_thong_khong_phan_hoi")}</h2>
          <p className="mb-6 leading-relaxed text-slate-600">{i18nText("AUTO.app.not.found.line62_1_trang_dang_tim_kiem_da")}</p>
        </div>

        <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl"
            style={{ backgroundColor: "#ffd500" }}
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
            </svg>{i18nText("AUTO.app.not.found.line87_2_ve_trang_chu")}</Link>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg border-2 px-6 py-3 font-medium transition-all duration-300"
            style={{
              borderColor: "#1435c3",
              color: "#1435c3",
            }}
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
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>{i18nText("AUTO.app.not.found.line111_3_san_pham")}{name}
          </Link>
        </div>

        <div className="text-sm text-slate-500">
          <p className="mb-1 font-medium" style={{ color: "#1435c3" }}>
            {name}{i18nText("AUTO.app.not.found.line117_4_cong_nghe_chinh_hang_dich")}</p>
          <p>{i18nText("AUTO.app.not.found.line119_5_kham_pha_giai_phap_cong")}</p>
        </div>
      </div>
    </div>
  );
}
