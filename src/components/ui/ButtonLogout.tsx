"use client";

import { i18nText } from "@/lib/i18nText";
import { ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner"; // hoặc lib bạn đang xài
import { useAuthStore } from "@/stores/useAuth";
import { logout as logoutApi } from "@/apis/common/auth.apis";
import { useStateStore } from "@/stores/stateStore";
import { useCartStore } from "@/stores/useCartStore";
import { useTranslations } from "next-intl";

interface ButtonLogoutProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ButtonLogout({
  children,
  ...props
}: ButtonLogoutProps) {
  const logout = useAuthStore((state) => state.logout);
  const setLoading = useStateStore((state) => state.setLoading);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();
  const t = useTranslations();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { message, status, errorCode } = await logoutApi();

      if (errorCode === 200 && status) {
        router.push("/");
        clearCart();
        logout();

        toast.success(message, {
          description: i18nText("AUTO.components.ui.buttonlogout.line36_0_da_dang_xuat_khoan"),
          position: "top-center",
        });
      } else {
        toast.warning(message, {
          description: i18nText("AUTO.components.ui.buttonlogout.line41_1_chua_dang_xuat_khoan"),
          position: "top-center",
        });
      }
    } catch (err: any) {
      toast.success(i18nText("AUTO.components.ui.buttonlogout.line46_2_dang_xuat_that_bai"), {
        description: i18nText("AUTO.components.ui.buttonlogout.line47_3_chua_dang_xuat_khoan"),
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button type="button" onClick={handleLogout} {...props}>
      {children ?? t("ACCOUNT.logout")}
    </button>
  );
}
