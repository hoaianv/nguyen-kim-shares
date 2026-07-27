"use client";

import { hotline, technicalHotline } from "@/constants/company.constant";
import { BadgeCheck, Headset, RefreshCcw, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const trustItems = [
  {
    title: "Cam kết chính hãng",
    description: "Nguồn hàng rõ ràng, hóa đơn đầy đủ",
    icon: BadgeCheck,
    href: "/chinh-sach",
  },
  {
    title: "Đổi trả linh hoạt",
    description: "Quy trình tiếp nhận minh bạch",
    icon: RefreshCcw,
    href: "/chinh-sach",
  },
  {
    title: "Bảo hành tận tâm",
    description: "Theo dõi và hỗ trợ sau bán",
    icon: ShieldCheck,
    href: "/chinh-sach",
  },
  {
    title: "Tư vấn kỹ thuật",
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
            <p className="text-xs font-bold uppercase text-slate-800/70">
              Tổng đài bán hàng
            </p>
            <p className="mt-1 text-2xl font-extrabold leading-none">{hotline}</p>
          </div>
          <span className="rounded bg-white/70 px-3 py-2 text-xs font-semibold uppercase text-slate-950">
            Gọi ngay
          </span>
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
