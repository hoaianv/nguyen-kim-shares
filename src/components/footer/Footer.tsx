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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FooterColumn from "@/components/footer/FooterColumn";
import { bannerKeys } from "@/constants/values.constant";
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

const informationLinks = [
  { title: "Tin tức công nghệ", href: "/tin-tuc" },
  { title: "Tư vấn mua hàng", href: "/tu-van" },
  { title: "Liên hệ", href: "/lien-he-gop-y" },
  { title: "Xây dựng cấu hình", href: "/xay-dung-cau-hinh" },
];

const hotlineItems = [
  { label: "Hotline", value: "1900 88 88 77", href: "tel:1900888877" },
  { label: "CSKH", value: "0949.56.94.94", href: "tel:0949569494" },
  { label: "Kỹ thuật", value: "0933.808.960", href: "tel:0933808960" },
  { label: "ĐT bàn", value: "282 247 247 2", href: "tel:2822472472" },
];

const paymentMethods = [
  { title: "QR Code", icon: QrCode },
  { title: "Tiền mặt", icon: Banknote },
  { title: "Trả góp", icon: Clock },
  { title: "Internet Banking", icon: CreditCard },
];

const bankLogos = [
  { name: "ACB", src: "/images/banks/acb.png" },
  { name: "Vietcombank", src: "/images/banks/vietcom.png" },
  { name: "VietinBank", src: "/images/banks/viettin.png" },
];

const linkHref = (url?: string) => (url ? `/${url.replace(/^\/+/, "")}` : "/");

export default function Footer() {
  const { config, banner } = useStateStore();
  const moitCertificate = banner?.[bannerKeys.bannerBoCongThuong];
  const certificate = moitCertificate?.advertises?.[0];

  if (!config) return null;

  const companyName =
    config.companyInfo?.company || "Công ty TNHH Vi tính Nguyên Kim";
  const address = config.companyInfo?.address || config.settingLogo?.address;
  const supportEmail = "cskh@nguyenkimcomputer.vn";

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

      <section className="mx-auto w-full max-w-[1520px] px-3 py-8 sm:px-4 lg:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <FooterColumn title="Về chúng tôi">
            <div className="space-y-2">
              {config.aboutCompany?.slice(0, 6).map((item) => (
                <Link
                  key={item.id}
                  href={linkHref(item.url)}
                  className="block text-sm text-slate-600 transition hover:text-brand-strong"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </FooterColumn>

          <FooterColumn title="Chính sách & Điều khoản">
            <div className="space-y-2">
              {config.policies?.slice(0, 9).map((item) => (
                <Link
                  key={item.id}
                  href={`/chinh-sach/${item.url ?? ""}`}
                  className="block text-sm text-slate-600 transition hover:text-brand-strong"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </FooterColumn>

          <FooterColumn title="Thông tin">
            <div className="space-y-2">
              {informationLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-slate-600 transition hover:text-brand-strong"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </FooterColumn>

          <FooterColumn title="Tổng đài hỗ trợ">
            <div className="space-y-2 text-sm text-slate-600">
              {hotlineItems.map((item) => (
                <p key={item.label}>
                  <span className="font-medium text-slate-800">
                    {item.label}:{" "}
                  </span>
                  <a
                    className="font-semibold text-brand-hover hover:underline"
                    href={item.href}
                  >
                    {item.value}
                  </a>
                </p>
              ))}
              <p>
                <span className="font-medium text-slate-800">Email: </span>
                <a
                  className="break-all font-semibold text-brand-hover hover:underline"
                  href={`mailto:${supportEmail}`}
                >
                  {supportEmail}
                </a>
              </p>
            </div>
          </FooterColumn>

          <FooterColumn title="Cộng đồng Nguyên Kim Computer">
            <div className="space-y-2">
              {config.icons?.map((item) => (
                <Link
                  key={item.id}
                  href={item.url || "#"}
                  target={item.target || "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-brand-strong"
                >
                  {item.picture ? (
                    <Image
                      src={item.picture}
                      alt=""
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px] object-contain"
                    />
                  ) : null}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </FooterColumn>
        </div>

        <div className="mt-8 grid gap-8 border-t border-slate-200 pt-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.7fr)]">
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-950">
              Phương thức thanh toán
            </h3>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.title}
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

          <div>
            <h3 className="text-sm font-bold uppercase text-slate-950">
              Danh sách các ngân hàng thanh toán online
            </h3>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
              {bankLogos.map((bank) => (
                <div key={bank.name} className="relative h-8 w-20">
                  <Image
                    src={bank.src}
                    alt={bank.name}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-200/70">
        <div className="mx-auto grid w-full max-w-[1520px] gap-6 px-3 py-8 text-sm text-slate-700 sm:px-4 md:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_180px] lg:px-6">
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-950">
              {companyName}
            </h3>

            {config.companyInfo?.certificate ? (
              <div
                className="mt-1 leading-6 [&_a]:text-brand-strong [&_a]:hover:underline [&_p]:my-0"
                dangerouslySetInnerHTML={{
                  __html: config.companyInfo.certificate,
                }}
              />
            ) : null}
            {config.companyInfo?.website ? (
              <p className="mt-1 leading-6">
                Website: {config.companyInfo.website}
              </p>
            ) : null}
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-950">
              Địa chỉ trụ sở chính
            </h3>
            {address ? (
              <div
                className="mt-2 leading-6 [&_p]:my-0"
                dangerouslySetInnerHTML={{ __html: address }}
              />
            ) : null}
            {config.companyInfo?.workTime ? (
              <p className="mt-2 leading-6">
                <span className="font-semibold text-slate-900">
                  Thời gian làm việc:{" "}
                </span>
                {config.companyInfo.workTime}
              </p>
            ) : null}
            <p className="mt-2 break-all leading-6">Email: {supportEmail}</p>
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
