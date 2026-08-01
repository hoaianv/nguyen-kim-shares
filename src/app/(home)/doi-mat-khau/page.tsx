import { i18nText } from "@/lib/i18nText";
import React from "react";
import Link from "next/link";
import ChangePasswordForm from "@/components/account/changePasswordForm";

export default function ChangePasswordPage() {
  return (
    <div className="min-h-0 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
        {/* Main content: 2 cột */}
        <div className="mx-auto max-w-7xl w-full">
          <div className="overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-0">
              {/* Panel trái: Hình ảnh + thông tin */}
              <div className="relative overflow-hidden lg:flex lg:items-stretch">
                {/* Background image */}
                <div
                  className="w-full h-64 lg:h-auto bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url("/images/changePassword/changePassword.png")`,
                  }}
                ></div>
              </div>

              {/* Panel phải: Form đổi mật khẩu */}
              <div className="flex flex-col justify-center">
                <div className="p-4 lg:p-8">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900 lg:text-2xl">{i18nText("AUTO.app.doi.mat.khau.line29_0_doi_mat_khau")}</h2>
                    <p className="mt-1 text-sm text-gray-600 lg:text-base">{i18nText("AUTO.app.doi.mat.khau.line32_1_nhap_email_mat_khau_moi")}</p>
                  </div>

                  <div>
                    <ChangePasswordForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

