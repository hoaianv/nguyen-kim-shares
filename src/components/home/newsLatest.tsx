"use client";

import { bannerKeys } from "@/constants/values.constant";
import { INews } from "@/interfaces/models/INews.interface";
import { useStateStore } from "@/stores/stateStore";
import { CalendarDays, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import HomeSectionHeader from "./HomeSectionHeader";

type NewsLatestProps = {
  data: INews[];
};

export default function NewsLatest({ data }: NewsLatestProps) {
  const { banner } = useStateStore();
  const t = useTranslations();
  const reduceMotion = useReducedMotion();

  const bannerNews = banner[bannerKeys.bannerNewsHome]?.advertises?.[0];

  if (!data?.length) return null;

  const [featured, ...rest] = data;

  return (
    <motion.section
      className="mx-auto mt-3 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div>
        <HomeSectionHeader
          eyebrow="news / insights"
          title={t("TITLE.latest_posts")}
          description="Bố cục news mới ưu tiên câu chuyện chính, sau đó là các tin ngắn để quét nhanh."
          actionLabel={t("COMMON.view_all")}
          actionHref="/tin-tuc"
          divider={false}
        />

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(280px,0.72fr)]">
          <div className="grid gap-4">
            <article className="group overflow-hidden rounded-lg border border-border bg-muted/20">
              <Link href={`/${featured.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={featured.picture || "/placeholder-16x9.png"}
                    alt={featured.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </div>
              </Link>

              <div className="border-t border-border p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  bài viết nổi bật
                </p>
                <Link
                  href={`/${featured.slug}`}
                  className="mt-2 block text-xl font-semibold text-foreground transition group-hover:text-slate-700 sm:text-2xl"
                >
                  {featured.title}
                </Link>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={14} />
                    {featured.createdAt}
                  </span>
                  {featured.categoryName ? (
                  <span className="inline-flex items-center rounded-full border border-border px-2 py-1 uppercase tracking-[0.18em]">
                    {featured.categoryName}
                  </span>
                ) : null}
                </div>
              </div>
            </article>

            <div className="grid gap-3 md:grid-cols-2">
              {rest.slice(0, 4).map((item) => (
                <article
                  key={item.id}
                  className="group grid grid-cols-[84px,1fr] gap-3 border-t border-border/70 pt-3 transition first:border-t-0 first:pt-0"
                >
                  <Link
                    href={`/${item.slug}`}
                    className="relative h-[60px] overflow-hidden rounded-lg bg-muted/20"
                  >
                    <Image
                      src={item.picture || "/placeholder-4x3.png"}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      sizes="92px"
                    />
                  </Link>

                  <div className="min-w-0">
                    <Link
                      href={`/${item.slug}`}
                      className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition group-hover:text-slate-700"
                    >
                      {item.title}
                    </Link>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays size={14} />
                        {item.createdAt}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {bannerNews?.picture ? (
              <Link
                href={bannerNews.link || "#"}
                target={bannerNews.target}
                className="group block overflow-hidden rounded-lg border border-border bg-muted/20"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <Image
                    alt={bannerNews.title}
                    src={bannerNews.picture}
                    fill
                    sizes="(max-width: 1024px) 100vw, 320px"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/84 via-slate-950/34 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#ffedb8] drop-shadow">
                      cập nhật mới
                    </p>
                    <p className="mt-2 line-clamp-3 text-lg font-semibold leading-snug drop-shadow-[0_1px_2px_rgba(15,23,42,0.45)]">
                      {bannerNews.title}
                    </p>
                  </div>
                </div>
              </Link>
            ) : null}

            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                tiếp tục đọc
              </p>
              <div className="mt-3 space-y-3">
                {rest.slice(4, 7).map((item) => (
                  <Link
                    key={item.id}
                    href={`/${item.slug}`}
                    className="group flex items-center justify-between gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="min-w-0 line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:text-slate-700">
                      {item.title}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

