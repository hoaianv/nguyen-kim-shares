"use client";
import React from "react";
import { ShoppingCart, CheckCircle, X } from "lucide-react";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Header with gradient */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={handleCloseClick}
              className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
              type="button"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-full">
              <CheckCircle size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold">Xác thực thành công!</h3>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 w-20 h-20 bg-white/10 rounded-full opacity-50"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full opacity-30"></div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="text-green-600" size={28} />
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Tài khoản đã được xác thực
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Giờ đây bạn có thể đăng nhập để mua hàng và trải nghiệm đầy đủ
                các tính năng của chúng tôi.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:via-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
            type="button"
          >
            Bắt đầu đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
