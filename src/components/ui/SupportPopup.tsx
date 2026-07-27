"use client";

import { X, Phone, Mail, User } from "lucide-react";

interface SupportPopupProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function SupportPopup({ isOpen, setIsOpen }: SupportPopupProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 animate-in fade-in bg-slate-950/60 backdrop-blur-sm duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Popup - Reduced max-width and padding */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100">
          <div className="relative bg-gradient-to-br from-[#ffb716] via-[#ffc850] to-[#ffb716] px-5 py-6">
            <div className="absolute inset-0 bg-[url('/abstract-wave-pattern.png')] opacity-10 mix-blend-overlay" />
            <div className="relative flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Hỗ Trợ Khách Hàng
                </h2>
                <p className="text-white/90 text-xs">
                  Chúng tôi luôn sẵn sàng hỗ trợ bạn
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all duration-200"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content - Reduced padding from p-6 to p-4 and space-y from 5 to 3 */}
          <div className="p-4 space-y-3 bg-gradient-to-b from-gray-50/50 to-white">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#ffb716] to-[#ffa500] flex items-center justify-center shadow-lg">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-lg border-2 border-white" />
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">
                    Kinh doanh Online
                  </p>
                  <p className="text-lg font-bold text-gray-900 mb-0.5">
                    Trịnh Bảo Nhi
                  </p>
                  <p className="text-xs text-gray-600">
                    Tư vấn viên chuyên nghiệp
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {/* Zalo - Reduced padding from p-4 to p-3 */}
              <a
                href="tel:0938808447"
                className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-blue-50 border border-gray-200 hover:border-blue-500 transition-all duration-200 group shadow-sm hover:shadow-md"
              >
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium mb-0.5">
                    Zalo
                  </p>
                  <p className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    0938808105
                  </p>
                </div>
                <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </a>

              {/* Email - Reduced padding from p-4 to p-3 */}
              <a
                href="mailto:antt.vn"
                className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-blue-50 border border-gray-200 hover:border-blue-500 transition-all duration-200 group shadow-sm hover:shadow-md"
              >
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium mb-0.5">
                    Email liên hệ
                  </p>
                  <p className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    nhitb@nguyenkimvn.vn
                  </p>
                </div>
                <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 pt-1">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Phản hồi trong vòng 5 phút</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

