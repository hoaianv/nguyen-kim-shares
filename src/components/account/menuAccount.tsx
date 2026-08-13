"use client";

import ButtonLogout from "@/components/ui/ButtonLogout";
import { ACCOUNT_LINKS, ICONS } from "@/constants";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuAccount() {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <aside
      className="h-fit rounded-md border border-slate-200/80 bg-white/90 p-3 shadow-sm ring-1 ring-white/60 backdrop-blur"
      aria-label={t("ACCOUNT.account_overview")}
    >
      <div className="p-3 pb-2">
        <div className="mb-3 h-1.5 w-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold  text-slate-950">
            {t("ACCOUNT.account_overview")}
          </span>
        </div>
      </div>

      <nav className="px-1 pb-2">
        <ul className="overflow-hidden rounded-md border border-slate-200/80 bg-slate-50/70">
          {ACCOUNT_LINKS.map((item) => {
            const Icon = ICONS[item.icon];
            const isActive = pathname === item.href;

            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "group flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                    isActive
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-700 hover:bg-white hover:text-slate-950",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t(item.labelKey)}</span>
                  <span className="ml-auto text-base opacity-0 transition group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-1 pb-1">
        <div className="mt-3 overflow-hidden rounded-md border border-rose-200/80 bg-rose-50/60">
          <ButtonLogout
            className={[
              "group flex w-full items-center gap-3 px-4 py-3 text-sm",
              "text-rose-600 hover:bg-rose-50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            ].join(" ")}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="truncate">{t("ACCOUNT.logout")}</span>
            <span className="ml-auto text-base opacity-0 transition group-hover:opacity-100">
              →
            </span>
          </ButtonLogout>
        </div>
      </div>
    </aside>
  );
}
