"use client";

import { i18nText } from "@/lib/i18nText";
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
    title: i18nText("AUTO.components.footer.footer.line23_0_chinh_sach_giao_hang"),
    description: i18nText("AUTO.components.footer.footer.line24_1_nhan_hang_thanh_toan_nha"),
    icon: Truck,
  },
  {
    title: i18nText("AUTO.components.footer.footer.line28_2_doi_tra_dang"),
    description: i18nText("AUTO.components.footer.footer.line29_3_1_doi_1_7_ngay"),
    icon: RefreshCcw,
  },
  {
    title: i18nText("AUTO.components.footer.footer.line33_4_gia_luon_luon_tot_nhat"),
    description: i18nText("AUTO.components.footer.footer.line34_5_gia_ca_hop_ly_nhieu"),
    icon: BadgePercent,
  },
  {
    title: i18nText("AUTO.components.footer.footer.line38_6_ho_tro_nhiet_tinh"),
    description: i18nText("AUTO.components.footer.footer.line39_7_tu_van_giai_dap_moi"),
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
    <footer className="relative overflow-hidden border-t theme-border bg-[var(--theme-footer-bg)] text-[var(--theme-footer-text)]">
      <span className="theme-corner-decor bottom-0 left-0 h-28 w-28" />
      <span className="theme-corner-decor bottom-0 right-0 h-28 w-28 rotate-180" />
      <section>
        <div className="mx-auto grid w-full max-w-[1520px] gap-7 px-3 py-6 sm:grid-cols-2 sm:px-4 lg:grid-cols-4 lg:px-6">
          {serviceItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex items-center gap-4">
                <Icon className="h-8 w-8 shrink-0 text-[var(--brand-primary)] sm:h-9 sm:w-9" />
                <div>
                  <p className="text-base font-bold uppercase leading-tight text-[var(--theme-text)]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-5 theme-muted">
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
            <div className="mt-8 grid gap-8 border-t theme-border pt-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.7fr)]">
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

      <section className="bg-[var(--theme-section-soft)]">
        <div className="mx-auto grid w-full max-w-[1520px] gap-6 px-3 py-8 text-sm text-slate-700 sm:px-4 md:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_180px] lg:px-6">
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-950">
              {companyAddress?.company || i18nText("AUTO.components.footer.footer.line221_8_cong_ty_tnhh_vi_tinh")}
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
              {companyAddress?.title || i18nText("AUTO.components.footer.footer.line247_9_dia_chi_tru_so_chinh")}
            </h3>
            {companyAddress?.address ? (
              <div
                className="mt-2 leading-6 [&_p]:my-0"
                dangerouslySetInnerHTML={{ __html: companyAddress.address }}
              />
            ) : null}
            {companyAddress?.workTime ? (
              <p className="mt-2 leading-6">
                <span className="font-semibold text-slate-900">{i18nText("AUTO.components.footer.footer.line258_10_thoi_gian_lam_viec")}{" "}
                </span>
                {companyAddress.workTime}
              </p>
            ) : null}
            {companyAddress?.email ? (
              <p className="mt-2 break-all leading-6">{i18nText("AUTO.components.footer.footer.extra265_0_email")}{companyAddress.email}
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
                  alt={certificate.title || i18nText("AUTO.components.footer.footer.line280_11_da_thong_bao_bo_cong")}
                  fill
                  className="object-contain object-left lg:object-right"
                />
              </Link>
            ) : (
              <span className="inline-flex h-14 items-center rounded-md bg-sky-600 px-3 text-xs font-bold text-white">{i18nText("AUTO.components.footer.footer.line287_12_da_thong_bao")}<br />{i18nText("AUTO.components.footer.footer.line289_13_bo_cong_thuong")}</span>
            )}
          </div>
        </div>
      </section>
    </footer>
  );
}
