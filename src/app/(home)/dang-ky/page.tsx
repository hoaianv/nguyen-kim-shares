import { i18nText } from "@/lib/i18nText";
import React from "react";
import Link from "next/link";
import RegisterForm from "@/components/register/registerForm";

export default function RegisterPage() {
  return (
    <div className="min-h-0 ">
      <div className="container mx-auto px-4 py-8">
        {/* Main content: 2 cột */}
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Panel trái: Hình ảnh + thông tin */}
              <div className="relative flex flex-col justify-between overflow-hidden">
                {/* Background image */}
                <div
                  className="h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url("/images/register/register-banner.png")`,
                    minHeight: "auto",
                  }}
                ></div>
              </div>

              {/* Panel phải: Form đăng ký */}
              <div className="flex flex-col">
                <div className="flex-1 p-4 lg:p-8">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900 lg:text-2xl">{i18nText("AUTO.app.dang.ky.line30_0_dang_ky_khoan")}</h2>
                    <p className="mt-1 text-sm text-gray-600 lg:text-base">{i18nText("AUTO.app.dang.ky.line33_1_dien_thong_tin_tro_thanh")}</p>
                  </div>

                  <div>
                    <RegisterForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nav dưới cùng */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-800">{i18nText("AUTO.app.dang.ky.line49_2_chinh_sach_bao_mat")}</Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="hover:text-gray-800">{i18nText("AUTO.app.dang.ky.line53_3_tro_giup")}</Link>
          <span className="text-gray-300">|</span>
          <Link href="/dieu-khoan-su-dung" className="hover:text-gray-800">{i18nText("AUTO.app.dang.ky.line57_4_dieu_khoan_su_dung")}</Link>
        </div>
      </div>
    </div>
  );
}

