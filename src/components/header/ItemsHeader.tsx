"use client";

import Link from "next/link";
import { ReactNode, memo } from "react";
import { Bell, ChevronDown, ShoppingCart, UserRound } from "lucide-react";
import { useAuthStore } from "@/stores/useAuth";
import { useCartStore } from "@/stores/useCartStore";
import { useTranslations } from "next-intl";

type HeaderIconItemProps = {
  icon: ReactNode;
  label: ReactNode;
  href?: string;
  badgeCount?: number;
  className?: string;
  eyebrow?: ReactNode;
  showAccountCaret?: boolean;
};

const ItemHeader = memo(function ItemHeader({
  icon,
  label,
  href,
  badgeCount,
  className = "",
  eyebrow,
  showAccountCaret = false,
}: HeaderIconItemProps) {
  const Wrapper: any = href ? Link : "button";
  const wrapperProps = href ? { href } : { type: "button" };

  return (
    <Wrapper {...wrapperProps}>
      <div
        className={`group inline-flex h-12 items-center gap-2 rounded-sm bg-white px-2 text-left text-[#737373] transition-all duration-200 hover:text-brand ${className}`}
        role="button"
        aria-label={typeof label === "string" ? label : "header-item"}
      >
        <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center text-[#737373] transition-colors group-hover:text-brand">
          {icon}
          {badgeCount !== undefined && (
            <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#df1f26] px-1 text-[11px] font-semibold leading-5 text-white shadow-sm">
              {badgeCount > 99 ? "99+" : badgeCount}
            </span>
          )}
        </span>

        <span className="hidden min-w-0 flex-col leading-tight xl:flex">
          {eyebrow ? (
            <span className="text-[13px] text-[#737373]">{eyebrow}</span>
          ) : null}
          <span className="flex items-center gap-0.5 truncate text-[15px] font-bold text-[#595959] group-hover:text-brand">
            {label}
            {showAccountCaret ? <ChevronDown className="h-3 w-3" /> : null}
          </span>
        </span>
      </div>
    </Wrapper>
  );
});

export function AuthItem() {
  const t = useTranslations();
  const { user, authenticated } = useAuthStore();
  const lastName = user?.fullName?.split(" ").pop() ?? "";
  const label =
    authenticated && user ? `${lastName}` : "Tài khoản";

  return (
    <ItemHeader
      icon={<UserRound size={28} strokeWidth={1.8} />}
      eyebrow={authenticated && user ? t("HEADER.hello") : 'Đăng nhập/Đăng ký'}
      label={label}
      href={authenticated ? "/tai-khoan" : "/dang-nhap"}
      showAccountCaret
    />
  );
}

export function NotificationItem() {
  const t = useTranslations();
  const unread = 0;

  return (
    <ItemHeader
      icon={<Bell size={27} strokeWidth={1.8} />}
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
      icon={<ShoppingCart size={30} strokeWidth={1.8} />}
      label={t("HEADER.cart")}
      href="/gio-hang"
      badgeCount={cart.totalItem}
    />
  );
}
