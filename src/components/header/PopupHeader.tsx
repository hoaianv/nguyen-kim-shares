"use client";

import ButtonLogout from "@/components/ui/ButtonLogout";
import GoogleLogin from "@/components/login/GoogleLogin";
import { ACCOUNT_LINKS, ICONS } from "@/constants";
import { formatPrice, getMarketPrice, getPrice } from "@/lib/utils";
import { useStateStore } from "@/stores/stateStore";
import { useAuthStore } from "@/stores/useAuth";
import { useCartStore } from "@/stores/useCartStore";
import { getLastNameFirstLetter } from "@/until";
import { Mail, Phone, LogOut, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function AuthPopup() {
  const t = useTranslations();
  const { user, authenticated } = useAuthStore();

  if (!authenticated || !user) {
    return (
      <div className="-mx-3 -my-2 w-[260px] rounded-lg bg-white p-3">
        <div className="space-y-2">
          <Link
            href="/login"
            className="flex h-10 w-full items-center justify-center rounded-md bg-brand px-3 text-sm font-semibold text-slate-950 transition hover:opacity-95"
          >
            Đăng nhập
          </Link>
          <Link
            href="/dang-ky"
            className="flex h-10 w-full items-center justify-center rounded-md bg-brand px-3 text-sm font-semibold text-slate-950 transition hover:opacity-95"
          >
            Tạo tài khoản
          </Link>
          <GoogleLogin className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-slate-100 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 disabled:opacity-50" />
        </div>
      </div>
    );
  }

  return (
    <div className="-mx-3 -my-2 w-[270px] rounded-lg bg-white p-2.5">
      <div className="rounded-md bg-gradient-to-r from-brand-soft/80 to-slate-50 p-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-brand-deep shadow-sm ring-2 ring-white">
            <span className="text-xs font-bold">
              {getLastNameFirstLetter(user.fullName)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <span
              className="block truncate text-[13px] font-semibold text-slate-900"
              title={user.fullName ?? undefined}
            >
              {user.fullName ?? t("HEADER.not_updated")}
            </span>
            <span
              className="mt-0.5 block truncate text-[11px] text-slate-500"
              title={user.email ?? undefined}
            >
              {user.email ?? t("HEADER.not_updated")}
            </span>
          </div>
        </div>
      </div>

      <nav className="mt-2 space-y-0.5">
        {ACCOUNT_LINKS.map((item) => {
          const Icon = ICONS[item.icon];

          return (
            <Link
              key={item.key}
              href={item.href}
              className="group flex items-center gap-2 rounded-md px-2 py-[7px] text-[13px] font-medium text-slate-700 transition-colors hover:bg-brand-soft hover:text-brand-deep"
            >
              <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center text-slate-500 transition-colors group-hover:text-brand-deep">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span>{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-2 rounded-md bg-rose-50/80">
        <ButtonLogout className="group flex w-full items-center gap-2 px-2 py-[7px] text-[13px] font-medium text-rose-700 transition hover:bg-rose-100">
          <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center text-rose-600">
            <LogOut className="h-3.5 w-3.5" />
          </span>
          {t("ACCOUNT.logout")}
        </ButtonLogout>
      </div>
    </div>
  );
}

export function NotificationPopup() {
  const t = useTranslations();

  return (
    <div className="w-[280px] p-2">
      <div className="border border-border bg-background p-3">
        <div className="text-sm font-semibold text-foreground">
          {t("HEADER.notifications")}
        </div>
        <div className="mt-2 border border-dashed border-border bg-muted/30 p-3 text-sm text-muted-foreground">
          Chưa có thông báo nào
        </div>
      </div>
    </div>
  );
}

export function CartPopup() {
  const cart = useCartStore((state) => state.cart);
  const isEmpty = useMemo(() => cart.items.length === 0, [cart.items.length]);

  return (
    <div className="-mx-3 -my-2 w-[360px] rounded-lg bg-white p-4 md:w-[380px]">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h3 className="text-base font-semibold text-slate-900">Giỏ hàng</h3>
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand-deep">
          {cart.totalItem} sản phẩm
        </span>
      </div>

      {isEmpty ? (
        <div className="py-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <p className="text-sm text-slate-500">Giỏ hàng của bạn đang trống</p>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <Link
              href="/san-pham"
              className="rounded-md bg-brand px-3 py-2.5 text-center text-sm font-semibold text-slate-950 transition hover:opacity-95"
            >
              Mua sắm ngay
            </Link>
            <Link
              href="/gio-hang"
              className="rounded-md border border-slate-200 bg-white px-3 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
            >
              Xem giỏ hàng
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="max-h-64 divide-y divide-slate-100 overflow-y-auto">
            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-3 py-3 first:pt-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                  <Image
                    width={72}
                    height={72}
                    src={item.picture}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/${item.url}`}
                    className="line-clamp-2 text-sm font-bold leading-5 text-slate-800 transition hover:text-brand"
                  >
                    {item.name}
                  </Link>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-base font-bold text-[#df1f26]">
                      {getPrice(item)}
                    </span>
                    {getMarketPrice(item) ? (
                      <s className="text-xs font-medium text-slate-400">
                        {getMarketPrice(item)}
                      </s>
                    ) : null}
                    <span className="text-xs text-slate-500">
                      x{item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between rounded-md bg-slate-50 px-3 py-3 text-sm">
            <span className="text-slate-500">Tổng cộng</span>
            <span className="font-semibold text-slate-900">
              {formatPrice(cart.totalPrice)}
            </span>
          </div>

          <Link
            href="/gio-hang"
            className="mt-3 flex w-full items-center justify-center rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:opacity-95"
          >
            Xem giỏ hàng
          </Link>
        </>
      )}
    </div>
  );
}

export function ContactPopup() {
  const support = useStateStore((state) => state.support);

  if (!support || Object.keys(support).length === 0) {
    return (
      <p className="px-3 py-2 text-sm text-muted-foreground">
        Chưa có thông tin liên hệ
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="w-[min(320px,calc(100vw-2rem))] text-slate-900 sm:w-[520px] lg:w-[620px]"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Object.entries(support).map(([group, members], groupIndex) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.05 }}
            className="rounded-lg bg-white p-4 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.28)]"
          >
            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-950">
              <span
                aria-hidden="true"
                className="h-4 w-1 shrink-0 rounded-full bg-brand"
              />
              {group}
            </h4>
            <ul className="space-y-6">
              {members.map((m) => (
                <li key={m.id} className="flex flex-col text-sm">
                  <div className="order-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                    {m.title}
                  </div>
                  <div className="order-2 mt-1 flex items-center gap-1.5 text-xs text-slate-600 sm:order-3 sm:mt-1.5">
                    <Mail
                      size={14}
                      className="shrink-0 text-brand-deep"
                    />
                    <a
                      href={`mailto:${m.email}`}
                      className="truncate transition hover:text-brand-strong hover:underline"
                    >
                      {m.email}
                    </a>
                  </div>
                  <div className="order-3 mt-3 flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 sm:order-2 sm:mt-1.5 sm:bg-transparent sm:p-0">
                    <Phone
                      size={16}
                      className="shrink-0 text-brand-deep"
                    />
                    <a
                      href={`tel:${m.phone}`}
                      className="text-base font-bold tracking-wide text-slate-950 transition hover:text-brand-strong hover:underline"
                    >
                      {m.phone}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
