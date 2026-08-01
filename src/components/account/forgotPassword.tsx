"use client";
import { i18nText } from "@/lib/i18nText";
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
      toast.error(i18nText("AUTO.components.account.forgotpassword.line27_0_vui_long_nhap_email_hop"));
      return;
    }

    startTransition(async () => {
      setLoading(true);
      const response = await forgetPassword({ email });
      setLoading(false);

      if (response?.status && response?.errorCode === 200) {
        toast.success(i18nText("AUTO.components.account.forgotpassword.line37_1_thanh_cong"), {
          description:
            i18nText("AUTO.components.account.forgotpassword.line39_2_mot_email_da_duoc_gui"),
          position: "top-center",
          duration: 5000,
        });
        setEmail("");
        onClose();
      } else {
        toast.error(response.message || i18nText("AUTO.components.account.forgotpassword.extra47_0_loi_xay_ra"));
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
          <h3 className="text-xl font-semibold text-gray-900">{i18nText("AUTO.components.account.forgotpassword.line70_3_quen_mat_khau")}</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <p className="text-sm text-gray-600 mb-6">{i18nText("AUTO.components.account.forgotpassword.line81_4_nhap_email_nhan_link_khoi")}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="forgot-email"
            label={i18nText("AUTO.components.account.forgotpassword.extra88_1_email")}
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
            >{i18nText("AUTO.components.account.forgotpassword.line102_5_huy")}</Button>

            <Button
              type="submit"
              disabled={loading || !email}
              variant="success"
              size="md"
              className="flex-1"
            >
              {loading ? i18nText("AUTO.components.account.forgotpassword.line112_6_dang_gui") : i18nText("AUTO.components.account.forgotpassword.line112_7_gui_email")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
