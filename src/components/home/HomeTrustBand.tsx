"use client";

import { i18nText } from "@/lib/i18nText";
import { hotline, technicalHotline } from "@/constants/company.constant";
import { BadgeCheck, Headset, RefreshCcw, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const trustItems = [
  {
    title: i18nText("AUTO.components.home.hometrustband.line10_0_cam_ket_chinh_hang"),
    description: i18nText("AUTO.components.home.hometrustband.line11_1_nguon_hang_ro_rang_hoa"),
    icon: BadgeCheck,
    href: "/chinh-sach",
  },
  {
    title: i18nText("AUTO.components.home.hometrustband.line16_2_doi_tra_linh_hoat"),
    description: i18nText("AUTO.components.home.hometrustband.line17_3_quy_trinh_tiep_nhan_minh"),
    icon: RefreshCcw,
    href: "/chinh-sach",
  },
  {
    title: i18nText("AUTO.components.home.hometrustband.line22_4_bao_hanh_tan_tam"),
    description: i18nText("AUTO.components.home.hometrustband.line23_5_theo_doi_ho_tro_sau"),
    icon: ShieldCheck,
    href: "/chinh-sach",
  },
  {
    title: i18nText("AUTO.components.home.hometrustband.line28_6_tu_van_ky_thuat"),
    description: technicalHotline,
    icon: Headset,
    href: `tel:${technicalHotline}`,
  },
];

export default function HomeTrustBand() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="mx-auto mt-3 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      <div className="grid overflow-hidden rounded-md bg-white shadow-sm lg:grid-cols-[1.2fr_repeat(4,1fr)]">
        <Link
          href={`tel:${hotline}`}
          className="flex items-center justify-between gap-4 bg-[#ffb716] px-5 py-4 text-slate-950"
        >
          <div>
            <p className="text-xs font-bold uppercase text-slate-800/70">{i18nText("AUTO.components.home.hometrustband.line53_7_tong_dai_hang")}</p>
            <p className="mt-1 text-2xl font-extrabold leading-none">{hotline}</p>
          </div>
          <span className="rounded bg-white/70 px-3 py-2 text-xs font-semibold uppercase text-slate-950">{i18nText("AUTO.components.home.hometrustband.line58_8_goi_ngay")}</span>
        </Link>

        {trustItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
            className="group flex items-center gap-3 border-b border-slate-100 px-4 py-4 transition hover:bg-[#fff7da] lg:border-b-0 lg:border-r last:border-r-0"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-[#fff7da] text-[#e6a414] transition group-hover:bg-[#ffb716] group-hover:text-slate-950">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900">{item.title}</p>
                <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
}
