"use client";

import {
  BadgePercent,
  Banknote,
  Clock,
  CreditCard,
  Headset,
  QrCode,
  RefreshCcw,
  Truck,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FooterColumn from "@/components/footer/FooterColumn";
import { bannerKeys } from "@/constants/values.constant";
import type { FooterItem } from "@/interfaces/models/IFooter.interface";
import { useStateStore } from "@/stores/stateStore";

const serviceItems = [
  {
    title: "Chính sách giao hàng",
    description: "Nhận hàng và thanh toán tại nhà",
    icon: Truck,
  },
  {
    title: "Đổi trả dễ dàng",
    description: "1 đổi 1 trong 7 ngày",
    icon: RefreshCcw,
  },
  {
    title: "Giá luôn luôn tốt nhất",
    description: "Giá cả hợp lý, nhiều ưu đãi tốt",
    icon: BadgePercent,
  },
  {
    title: "Hỗ trợ nhiệt tình",
    description: "Tư vấn, giải đáp mọi thắc mắc",
    icon: Headset,
  },
];

const paymentIcons: Record<string, LucideIcon> = {
  qr_code: QrCode,
  cash: Banknote,
  installment: Clock,
  internet_banking: CreditCard,
};

const isExternalHref = (href: string) => /^(https?:|mailto:|tel:)/i.test(href);

const normalizeFooterHref = (url: string) =>
  isExternalHref(url) ? url : `/${url.replace(/^\/+/, "")}`;

function FooterItemLink({
  item,
  showImage = false,
}: {
  item: FooterItem;
  showImage?: boolean;
}) {
  const className =
    "flex items-center gap-2 text-sm text-slate-600 transition hover:text-brand";
  const content = (
    <>
      {showImage && item.image ? (
        <Image
          src={item.image}
          alt=""
          width={18}
          height={18}
          className="h-[18px] w-[18px] shrink-0 object-contain"
        />
      ) : null}
      <span>{item.title}</span>
    </>
  );

  if (!item.isLink || !item.url) {
    return <p className={className}>{content}</p>;
  }

  const href = normalizeFooterHref(item.url);

  if (isExternalHref(href)) {
    const opensNewTab = /^https?:/i.test(href);

    return (
      <a
        href={href}
        target={opensNewTab ? "_blank" : undefined}
        rel={opensNewTab ? "noopener noreferrer" : undefined}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export default function Footer() {
  const { banner, companyAddress, footerSections } = useStateStore();
  const moitCertificate = banner?.[bannerKeys.bannerBoCongThuong];
  const certificate = moitCertificate?.advertises?.[0];
  const sectionByKey = new Map(footerSections.map((section) => [section.key, section]));
  const navigationSections = ["about", "policy", "information", "support", "community"]
    .map((key) => sectionByKey.get(key))
    .filter((section): section is FooterItem => Boolean(section));
  const paymentSection = sectionByKey.get("payment_method");
  const bankSection = sectionByKey.get("online_bank");

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-900">
      <section>
        <div className="mx-auto grid w-full max-w-[1520px] gap-6 px-3 py-5 sm:grid-cols-2 sm:px-4 lg:grid-cols-4 lg:px-6">
          {serviceItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex items-center gap-3">
                <Icon className="h-7 w-7 shrink-0 text-brand-hover" />
                <div>
                  <p className="text-sm font-bold uppercase text-slate-950">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {(navigationSections.length > 0 || paymentSection || bankSection) && (
        <section className="mx-auto w-full max-w-[1520px] px-3 py-8 sm:px-4 lg:px-6">
          {navigationSections.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {navigationSections.map((section) => (
                <FooterColumn key={section.id} title={section.title}>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <FooterItemLink
                        key={item.id}
                        item={item}
                        showImage={section.key === "community"}
                      />
                    ))}
                  </div>
                </FooterColumn>
              ))}
            </div>
          ) : null}

          {paymentSection || bankSection ? (
            <div className="mt-8 grid gap-8 border-t border-slate-200 pt-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.7fr)]">
              {paymentSection ? (
                <div>
                  <h3 className="text-sm font-bold uppercase text-slate-950">
                    {paymentSection.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-4">
                    {paymentSection.items.map((method) => {
                      const Icon = paymentIcons[method.key] ?? CreditCard;

                      return (
                        <div
                          key={method.id}
                          className="flex w-11 flex-col items-center text-center"
                        >
                          <Icon className="h-7 w-7 text-slate-700" />
                          <span className="mt-1 text-xs leading-4 text-slate-700">
                            {method.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {bankSection ? (
                <div>
                  <h3 className="text-sm font-bold uppercase text-slate-950">
                    {bankSection.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                    {bankSection.items
                      .filter((bank) => Boolean(bank.image))
                      .map((bank) => (
                        <div key={bank.id} className="relative h-8 w-20">
                          <Image
                            src={bank.image!}
                            alt={bank.title}
                            fill
                            className="object-contain"
                            sizes="80px"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
      )}

      <section className="bg-slate-200/70">
        <div className="mx-auto grid w-full max-w-[1520px] gap-6 px-3 py-8 text-sm text-slate-700 sm:px-4 md:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_180px] lg:px-6">
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-950">
              {companyAddress?.company || "Công ty TNHH Vi tính Nguyên Kim"}
            </h3>

            {companyAddress?.certificate ? (
              <div
                className="mt-1 leading-6 [&_a]:text-brand-strong [&_a]:hover:underline [&_p]:my-0"
                dangerouslySetInnerHTML={{
                  __html: companyAddress.certificate,
                }}
              />
            ) : null}
            {companyAddress?.phone ? (
              <div
                className="mt-1 leading-6 [&_a]:text-brand-strong [&_a]:hover:underline [&_p]:my-0"
                dangerouslySetInnerHTML={{ __html: companyAddress.phone }}
              />
            ) : null}
            {companyAddress?.website ? (
              <p className="mt-1 leading-6">
                Website: {companyAddress.website}
              </p>
            ) : null}
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-950">
              {companyAddress?.title || "Địa chỉ trụ sở chính"}
            </h3>
            {companyAddress?.address ? (
              <div
                className="mt-2 leading-6 [&_p]:my-0"
                dangerouslySetInnerHTML={{ __html: companyAddress.address }}
              />
            ) : null}
            {companyAddress?.workTime ? (
              <p className="mt-2 leading-6">
                <span className="font-semibold text-slate-900">
                  Thời gian làm việc:{" "}
                </span>
                {companyAddress.workTime}
              </p>
            ) : null}
            {companyAddress?.email ? (
              <p className="mt-2 break-all leading-6">
                Email: {companyAddress.email}
              </p>
            ) : null}
          </div>

          <div className="flex items-start gap-3 lg:flex-col lg:items-end">
            {certificate?.picture ? (
              <Link
                href={certificate.link || "#"}
                target={certificate.target || "_blank"}
                rel="noopener noreferrer"
                className="relative block h-20 w-[190px]"
              >
                <Image
                  src={certificate.picture}
                  alt={certificate.title || "Đã thông báo Bộ Công Thương"}
                  fill
                  className="object-contain object-left lg:object-right"
                />
              </Link>
            ) : (
              <span className="inline-flex h-14 items-center rounded-md bg-sky-600 px-3 text-xs font-bold text-white">
                ĐÃ THÔNG BÁO
                <br />
                BỘ CÔNG THƯƠNG
              </span>
            )}
          </div>
        </div>
      </section>
    </footer>
  );
}
