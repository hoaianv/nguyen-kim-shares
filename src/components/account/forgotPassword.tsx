"use client";
import React, { useState, useTransition } from "react";
import { X } from "lucide-react";
import InputField from "@/components/ui/input";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { forgetPassword } from "@/apis/common/auth.apis";
import { useStateStore } from "@/stores/stateStore";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { setLoading } = useStateStore();
  const [email, setEmail] = useState("");
  const [loading, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Vui lòng nhập email hợp lệ");
      return;
    }

    startTransition(async () => {
      setLoading(true);
      const response = await forgetPassword({ email });
      setLoading(false);

      if (response?.status && response?.errorCode === 200) {
        toast.success("Thành công!", {
          description:
            "Một email đã được gửi đến mail của bạn. Hãy vào hộp thư thực hiện xác nhận để đổi mật khẩu.",
          position: "top-center",
          duration: 5000,
        });
        setEmail("");
        onClose();
      } else {
        toast.error(response.message || "Có lỗi xảy ra!");
      }
    });
  };

  const handleClose = () => {
    setEmail("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Quên mật khẩu</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <p className="text-sm text-gray-600 mb-6">
          Nhập email của bạn để nhận link khôi phục mật khẩu
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="forgot-email"
            label="Email"
            type="email"
          />

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              size="md"
              className="flex-1"
              disabled={loading}
            >
              Hủy
            </Button>

            <Button
              type="submit"
              disabled={loading || !email}
              variant="success"
              size="md"
              className="flex-1"
            >
              {loading ? "Đang gửi..." : "Gửi email"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
