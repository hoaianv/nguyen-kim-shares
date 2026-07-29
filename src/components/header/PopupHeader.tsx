"use client";

import ButtonLogout from "@/components/ui/ButtonLogout";
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

  return (
    authenticated &&
    user && (
      <div className="w-[280px] p-2">
        <div className="border border-border bg-background p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border border-border bg-muted/60">
              <span className="text-sm font-semibold text-foreground">
                {getLastNameFirstLetter(user.fullName)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-foreground">
                {user.fullName ?? t("HEADER.not_updated")}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {user.email ?? t("HEADER.not_updated")}
              </span>
            </div>
          </div>
        </div>

        <nav className="mt-2 border border-border bg-background">
          {ACCOUNT_LINKS.map((item, index) => {
            const Icon = ICONS[item.icon];

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted/60 ${
                  index !== ACCOUNT_LINKS.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span>{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-2 border border-rose-200 bg-rose-50/70">
          <ButtonLogout className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-rose-700 transition hover:bg-rose-50">
            <LogOut className="h-4 w-4" />
            {t("ACCOUNT.logout")}
          </ButtonLogout>
        </div>
      </div>
    )
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
    <div className="w-[340px] p-2 md:w-[400px]">
      <div className="border border-border bg-background p-3">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="text-base font-semibold text-foreground">Giỏ hàng</div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {cart.totalItem} sản phẩm
          </div>
        </div>

        {isEmpty ? (
          <div className="py-5 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center border border-border bg-muted/60 text-muted-foreground">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">Giỏ hàng trống</p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href="/san-pham"
                className="border border-foreground bg-foreground px-3 py-2 text-center text-sm font-medium text-background transition hover:opacity-95"
              >
                Mua sắm ngay
              </Link>
              <Link
                href="/gio-hang"
                className="border border-border bg-background px-3 py-2 text-center text-sm font-medium text-foreground transition hover:bg-muted/60"
              >
                Xem giỏ hàng
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="max-h-64 divide-y divide-border overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-3 py-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden border border-border bg-muted">
                    <Image
                      width={70}
                      height={70}
                      src={item.picture}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/${item.url}`}
                      className="line-clamp-2 text-sm font-medium text-foreground transition hover:text-brand"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                      <span className="font-semibold text-foreground">
                        {getPrice(item)}
                      </span>
                      {getMarketPrice(item) && (
                        <s className="text-xs text-muted-foreground">
                          {getMarketPrice(item)}
                        </s>
                      )}
                      <span className="text-xs text-muted-foreground">
                        x{item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-sm">
              <div className="text-muted-foreground">Tổng cộng</div>
              <div className="text-right font-semibold text-foreground">
                {formatPrice(cart.totalPrice)}
              </div>
            </div>

            <div className="mt-3">
              <Link
                href="/gio-hang"
                className="flex w-full items-center justify-center border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-95"
              >
                Xem giỏ hàng
              </Link>
            </div>
          </>
        )}
      </div>
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
      className="w-[320px] border border-border bg-popover p-3 text-popover-foreground shadow-[0_24px_70px_-34px_rgba(15,23,42,0.45)] sm:w-[520px] lg:w-[620px]"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Object.entries(support).map(([group, members], groupIndex) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.05 }}
            className="border border-border bg-background p-3"
          >
            <h4 className="mb-2 text-sm font-semibold text-foreground">
              {group}
            </h4>
            <ul className="space-y-2">
              {members.map((m) => (
                <motion.li
                  key={m.id}
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="border border-border px-2 py-2 transition hover:bg-muted/50"
                >
                  <div className="text-sm font-medium text-foreground">
                    {m.title}
                  </div>
                  <div className="mt-1 flex items-center text-muted-foreground">
                    <Mail size={14} className="mr-1 flex-shrink-0 text-[#e6a414]" />
                    <a
                      href={`mailto:${m.email}`}
                      className="truncate text-xs transition hover:underline md:text-sm"
                    >
                      {m.email}
                    </a>
                  </div>
                  <div className="mt-1 flex items-center text-muted-foreground">
                    <Phone size={14} className="mr-1 flex-shrink-0 text-emerald-600" />
                    <a href={`tel:${m.phone}`} className="text-xs transition hover:underline md:text-sm">
                      {m.phone}
                    </a>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
