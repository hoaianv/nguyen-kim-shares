import React from "react";
import Link from "next/link";
import RegisterForm from "@/components/register/registerForm";

export default function RegisterPage() {
  return (
    <div className="min-h-0 bg-gradient-to-br from-blue-50 to-indigo-100">
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
                    <h2 className="text-xl font-bold text-gray-900 lg:text-2xl">
                      Đăng ký tài khoản
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 lg:text-base">
                      Điền thông tin để trở thành thành viên của chúng tôi
                    </p>
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
          <Link href="/" className="hover:text-gray-800">
            Chính sách bảo mật
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="hover:text-gray-800">
            Trợ giúp
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/dieu-khoan-su-dung" className="hover:text-gray-800">
            Điều khoản sử dụng
          </Link>
        </div>
      </div>
    </div>
  );
}

