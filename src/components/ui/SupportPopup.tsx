"use client";

import { i18nText } from "@/lib/i18nText";
import { ChevronRight, Headset, Mail, Phone, User, X } from "lucide-react";

interface SupportPopupProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const supportContacts = [
  {
    label: "Zalo",
    value: "0938808814",
    href: "tel:0938808814",
    icon: Phone,
  },
  {
    label: i18nText("AUTO.components.ui.supportpopup.line18_0_email_lien_he"),
    value: "linhhtm@nguyenkimcomputer.vn",
    href: "mailto:linhhtm@nguyenkimcomputer.vn",
    icon: Mail,
  },
];

export function SupportPopup({ isOpen, setIsOpen }: SupportPopupProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-popup-title"
    >
      <button
        type="button"
        aria-label={i18nText("AUTO.components.ui.supportpopup.line37_1_dong_ho_tro_khach_hang")}
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.45)] animate-in fade-in zoom-in-95 slide-in-from-bottom-3 duration-200">
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
              <Headset className="h-5 w-5" />
            </span>
            <div>
              <h2
                id="support-popup-title"
                className="text-base font-bold text-slate-950"
              >{i18nText("AUTO.components.ui.supportpopup.line53_2_ho_tro_khach_hang")}</h2>
              <p className="mt-0.5 text-sm text-slate-500">{i18nText("AUTO.components.ui.supportpopup.line56_3_chung_toi_luon_san_sang")}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-brand-soft hover:text-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label={i18nText("AUTO.components.ui.supportpopup.line64_4_dong")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3 p-5">
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
              <User className="h-6 w-6" />
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{i18nText("AUTO.components.ui.supportpopup.line78_5_kinh_doanh_online")}</p>
              <p className="mt-0.5 text-base font-bold text-slate-950">{i18nText("AUTO.components.ui.supportpopup.line81_6_ho_thi_my_linh")}</p>
              <p className="text-sm text-slate-600">{i18nText("AUTO.components.ui.supportpopup.line84_7_tu_van_vien_chuyen_nghiep")}</p>
            </div>
          </div>

          <div className="space-y-2">
            {supportContacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition hover:border-brand hover:bg-brand-soft/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep transition group-hover:bg-brand group-hover:text-slate-950">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium text-slate-500">
                      {contact.label}
                    </span>
                    <span className="block truncate text-sm font-semibold text-slate-900">
                      {contact.value}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:text-brand-deep" />
                </a>
              );
            })}
          </div>

          <p className="pt-1 text-center text-xs text-slate-500">{i18nText("AUTO.components.ui.supportpopup.line116_8_phan_hoi_vong_5_phut")}</p>
        </div>
      </div>
    </div>
  );
}
