"use client";

import Link from "next/link";
import { ReactNode, memo } from "react";
import { Bell, ShoppingCart, UserRound } from "lucide-react";
import { useAuthStore } from "@/stores/useAuth";
import { useCartStore } from "@/stores/useCartStore";
import { useTranslations } from "next-intl";

type HeaderIconItemProps = {
  icon: ReactNode;
  label: ReactNode;
  href?: string;
  badgeCount?: number;
  className?: string;
};

const ItemHeader = memo(function ItemHeader({
  icon,
  label,
  href,
  badgeCount,
  className = "",
}: HeaderIconItemProps) {
  const Wrapper: any = href ? Link : "button";
  const wrapperProps = href ? { href } : { type: "button" };

  const content = (
    <div
      className={`group inline-flex h-12 items-center gap-2 rounded-sm bg-white px-2 text-left transition-all duration-200 hover:text-[#e6a414] ${className}`}
      role="button"
      aria-label={typeof label === "string" ? label : "header-item"}
    >
      <span className="relative inline-flex h-10 w-10 flex-shrink-0 items-center justify-center text-slate-900 transition-colors group-hover:text-[#e6a414]">
        {icon}
        {!!badgeCount && badgeCount > 0 && (
          <span className="absolute right-0 top-0 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ffb716] px-1 text-[10px] leading-4 text-slate-950 shadow-sm">
            {badgeCount > 99 ? "99+" : badgeCount}
          </span>
        )}
      </span>

      <span className="hidden min-w-0 flex-col leading-tight xl:flex">
        <span className="text-xs text-slate-500">
          {href === "/gio-hang" ? "Giỏ hàng" : "Đăng nhập/Đăng ký"}
        </span>
        <span className="truncate text-sm font-bold text-slate-900 group-hover:text-[#e6a414]">
          {label}
        </span>
      </span>
    </div>
  );

  return <Wrapper {...wrapperProps}>{content}</Wrapper>;
});

export function AuthItem() {
  const t = useTranslations();
  const { user, authenticated } = useAuthStore();
  const lastName = user?.fullName?.split(" ").pop() ?? "";
  const label =
    authenticated && user ? `${t("HEADER.hello")} ${lastName}` : t("HEADER.auth");

  return (
    <ItemHeader
      icon={<UserRound size={24} strokeWidth={1.8} />}
      label={label}
      href={authenticated ? "/tai-khoan" : "/login"}
    />
  );
}

export function NotificationItem() {
  const t = useTranslations();
  const unread = 0;

  return (
    <ItemHeader
      icon={<Bell size={24} strokeWidth={1.8} />}
      label={t("HEADER.notifications")}
      badgeCount={unread}
    />
  );
}

export function CartItem() {
  const t = useTranslations();
  const { cart } = useCartStore();

  return (
    <ItemHeader
      icon={<ShoppingCart size={26} strokeWidth={1.8} />}
      label={t("HEADER.cart")}
      href="/gio-hang"
      badgeCount={cart.totalItem}
    />
  );
}

