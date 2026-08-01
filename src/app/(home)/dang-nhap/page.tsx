"use client";
import { i18nText } from "@/lib/i18nText";
import GoogleLogin from "@/components/login/GoogleLogin";
import LoginForm from "@/components/login/loginForm";
import VerificationModal from "@/components/account/verificationModal";
import { hotline } from "@/constants/company.constant";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      setShowVerificationModal(true);
      // Remove token from URL after showing modal
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.history.replaceState({}, "", url.toString());
    }
  }, [token]);

  const closeModal = () => {
    setShowVerificationModal(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Mobile và Desktop layout khác nhau */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Panel trái: Hình ảnh - Ẩn trên mobile */}
              <div className="hidden lg:block relative">
                <Image
                  width={500}
                  height={500}
                  src="/images/login/login-banner.png"
                  alt={i18nText("AUTO.app.dang.nhap.line46_0_banner_login")}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Panel phải: Form đăng nhập */}
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <div className="w-full max-w-sm mx-auto lg:max-w-full lg:mx-0">
                  {/* Header */}
                  <div className="text-center lg:text-left mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{i18nText("AUTO.app.dang.nhap.line57_1_dang_nhap")}</h1>
                    <p className="text-gray-600 text-sm">{i18nText("AUTO.app.dang.nhap.line60_2_chao_mung_tro_lai")}</p>
                  </div>

                  {/* Login Form */}
                  <LoginForm />

                  {/* Registration Section */}
                  <div className="mt-4 p-4 rounded-lg border border-[#ffd500]/30 bg-gradient-to-r from-[#ffd500]/5 to-yellow-50">
                    <h3 className="text-sm text-[#1435c3] font-semibold mb-1">{i18nText("AUTO.app.dang.nhap.line70_3_chua_khoan")}</h3>
                    <p className="text-xs text-gray-600 mb-3">{i18nText("AUTO.app.dang.nhap.line73_4_lien_he_dang_ky_khoan")}</p>

                    {/* Hotline */}
                    <div className="mb-3 rounded-lg border-l-4 border-[#1435c3] bg-white p-3">
                      <Link
                        href={`tel:${hotline}`}
                        className="inline-flex items-center gap-2 text-sm text-[#1435c3] font-semibold hover:text-[#1435c3]/80 transition-all duration-200 group"
                      >
                        <div className="p-1 bg-[#ffd500] rounded-lg group-hover:scale-110 transition-transform">
                          <Phone size={14} className="text-white" />
                        </div>
                        <span>Hotline: {hotline}</span>
                      </Link>
                    </div>

                    {/* Register Button */}
                    <Link
                      href="/vai-tro"
                      className="block w-full rounded-lg bg-[#ffd500] px-4 py-2.5 text-sm font-semibold text-white text-center transition-all duration-200 hover:bg-[#ffd500]/90"
                    >{i18nText("AUTO.app.dang.nhap.line94_5_dang_ky_khoan")}</Link>
                  </div>

                  {/* Google Login */}
                  {/* <div className="mt-4">
                    <GoogleLogin />
                  </div> */}

                  {/* Benefits Section - Thu gọn */}
                  <div className="mt-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-[#1435c3] mb-2">{i18nText("AUTO.app.dang.nhap.line107_6_uu_dai_danh_doi_tac")}</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-[#ffd500] shrink-0">•</span>
                          <span>{i18nText("AUTO.app.dang.nhap.line112_7_uu_dai_mua_hang_bao")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#ffd500] shrink-0">•</span>
                          <span>{i18nText("AUTO.app.dang.nhap.line116_8_theo_doi_don_hang_diem")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#ffd500] shrink-0">•</span>
                          <span>{i18nText("AUTO.app.dang.nhap.line120_9_tin_tuc_khuyen_mai_moi")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Success Modal */}
      <VerificationModal isOpen={showVerificationModal} onClose={closeModal} />
    </>
  );
}

