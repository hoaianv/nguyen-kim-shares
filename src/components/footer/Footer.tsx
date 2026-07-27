"use client";

import {
  BadgePercent,
  Clock,
  Headset,
  Mail,
  MapPin,
  Phone,
  RefreshCcw,
  Truck,
} from "lucide-react";
import FooterColumn from "@/components/footer/FooterColumn";
import SocialIcons from "@/components/footer/SocialIcons";
import BrandPartners from "@/components/footer/BrandPartners";
import Certificates from "@/components/footer/Certificates";

import Link from "next/link";
import Image from "next/image";
import { useStateStore } from "@/stores/stateStore";
import { bannerKeys } from "@/constants/values.constant";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useState } from "react";

const serviceItems = [
  {
    title: "Chính sách giao hàng",
    description: "Nhận hàng và thanh toán tại nhà",
    icon: Truck,
  },
  {
    title: "Đổi trả dễ dàng",
    description: "Quy trình tiếp nhận rõ ràng",
    icon: RefreshCcw,
  },
  {
    title: "Giá luôn tốt",
    description: "Nhiều ưu đãi theo từng ngành hàng",
    icon: BadgePercent,
  },
  {
    title: "Hỗ trợ nhiệt tình",
    description: "Tư vấn và giải đáp mọi thắc mắc",
    icon: Headset,
  },
];

const promoLinks = [
  { title: "Tổng hợp khuyến mãi", href: "/tin-khuyen-mai" },
  { title: "Trang tin tức - tư vấn", href: "/tin-tuc" },
  { title: "Xây dựng cấu hình", href: "/xay-dung-cau-hinh" },
];

export default function Footer() {
  const { config, banner } = useStateStore();
  const t = useTranslations();
  const [isEnglish, setIsEnglish] = useState(false);

  useLayoutEffect(() => {
    const checkCookie = () => {
      const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
      setIsEnglish(match?.[1] === "/vi/en");
    };

    checkCookie();
    const interval = setInterval(checkCookie, 1000);
    return () => clearInterval(interval);
  }, []);

  const {
    [bannerKeys.bannerDistributor]: distributor,
    [bannerKeys.bannerPartnerCertification]: partnerCertification,
    [bannerKeys.bannerBoCongThuong]: moitCertificate,
  } = banner || {};

  if (!config) return null;

  const companyName = isEnglish
    ? "Nguyen Kim Co., Ltd."
    : (config?.companyInfo?.company ?? "Công ty TNHH Vi tính Nguyễn Kim");

  const supportLinks = [
    {
      title: `CSKH: ${config?.settingLogo?.hotline ?? config?.companyInfo?.phone ?? ""}`,
      href: `tel:${config?.settingLogo?.hotline ?? ""}`,
    },
    { title: "Thông tin liên hệ", href: "/lien-he-gop-y" },
    { title: "Tra cứu bảo hành", href: "/chinh-sach" },
    { title: "Hỗ trợ doanh nghiệp", href: "/giai-phap-cho-doanh-nghiep" },
  ];

  return (
    <footer className="mt-8 bg-[#F1F8FE] text-slate-900">
      <div className="">
        <div className="mx-auto grid w-full max-w-[1520px] gap-px px-3 py-3 sm:px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
          {serviceItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-3 bg-white px-4 py-4"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#fff7da] text-[#e6a414]">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-extrabold uppercase text-slate-950">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1520px] px-3 py-8 sm:px-4 lg:px-6">
        <div className="grid gap-6 rounded-sm bg-white p-4 shadow-sm md:grid-cols-2 lg:grid-cols-4 lg:p-6">
          <FooterColumn title="Giới thiệu Nguyên Kim">
            <div className="space-y-2">
              {config?.aboutCompany?.slice(0, 6).map((policy, index) => (
                <Link
                  key={index}
                  href={`/${policy?.url ?? ""}`}
                  className="block py-1.5 text-sm text-slate-600 transition hover:text-[#e6a414]"
                >
                  {policy.title}
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <SocialIcons socialMedia={config?.icons ?? []} />
            </div>
          </FooterColumn>

          <FooterColumn title={t("FOOTER.policies_terms")}>
            <div className="space-y-2">
              {config?.policies?.slice(0, 9).map((policy, index) => (
                <Link
                  key={index}
                  href={`/chinh-sach/${policy?.url ?? ""}`}
                  className="block py-1.5 text-sm text-slate-600 transition hover:text-[#e6a414]"
                >
                  {policy.title}
                </Link>
              ))}
            </div>
          </FooterColumn>

          <FooterColumn title="Thông tin khuyến mãi">
            <div className="space-y-2">
              {promoLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block py-1.5 text-sm text-slate-600 transition hover:text-[#e6a414]"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {moitCertificate?.advertises?.[0]?.picture ? (
              <Link
                href={moitCertificate?.advertises?.[0]?.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex rounded-sm border border-slate-200 bg-white p-2 transition hover:border-[#ffb716]"
              >
                <Image
                  src={moitCertificate.advertises[0].picture}
                  alt="Bộ Công Thương"
                  width={130}
                  height={48}
                  className="h-9 w-auto object-contain"
                />
              </Link>
            ) : null}
          </FooterColumn>

          <FooterColumn title={t("FOOTER.support_hotline")}>
            <div className="space-y-3 text-sm text-slate-600">
              {supportLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block transition hover:text-[#e6a414]"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="mt-5 space-y-3 rounded-sm bg-[#f8fafc] p-4 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#e6a414]" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: config?.companyInfo?.phone ?? "",
                  }}
                />
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#e6a414]" />
                <span>{config?.companyInfo?.workTime}</span>
              </div>
            </div>
          </FooterColumn>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <div className="rounded-sm bg-white p-4 shadow-sm lg:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <Link href="/" className="block w-[145px] shrink-0">
                {config?.settingLogo?.logo && (
                  <Image
                    src={config.settingLogo.logo}
                    alt={companyName}
                    width={180}
                    height={120}
                    className="h-auto w-full object-contain"
                    priority
                  />
                )}
              </Link>

              <div className="min-w-0 flex-1">
                <h4 className="text-base font-extrabold uppercase text-slate-950">
                  {companyName}
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {config?.companyInfo?.title ??
                    "Hệ thống mua sắm công nghệ với thông tin rõ ràng, hỗ trợ nhanh và trải nghiệm mua hàng tin cậy."}
                </p>

                <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#e6a414]" />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: config?.companyInfo?.address ?? "",
                      }}
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#e6a414]" />
                    <span className="break-all">{config?.companyInfo?.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 rounded-sm bg-white p-4 shadow-sm sm:grid-cols-2 lg:p-6">
            <BrandPartners data={distributor} />
            <Certificates data={partnerCertification} />
          </div>
        </div>

        <div className="mt-4 rounded-sm bg-[#111827] px-4 py-3 text-xs leading-5 text-white/75">
          {companyName} | Hotline: {config?.settingLogo?.hotline ?? ""} | Email:{" "}
          {config?.companyInfo?.email}
        </div>
      </div>
    </footer>
  );
}
