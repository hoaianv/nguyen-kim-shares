"use client";

import { i18nText } from "@/lib/i18nText";
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  Package,
  Truck,
  UserRound,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Modal from "@/components/ui/Modal";
import { bannerKeys } from "@/constants/values.constant";
import type { FooterItem } from "@/interfaces/models/IFooter.interface";
import type {
  IOrderDetail,
  OrderStatus,
} from "@/interfaces/models/IOrder.interface";
import { getPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { useStateStore } from "@/stores/stateStore";

const statusPresentation: Record<string, { label: string; className: string }> =
  {
    pending: { label: i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line32_0_xu_ly"), className: "bg-amber-100 text-amber-800" },
    payment: {
      label: i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line34_1_thanh_toan"),
      className: "bg-amber-100 text-amber-800",
    },
    paid: {
      label: i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line38_2_da_thanh_toan"),
      className: "bg-emerald-100 text-emerald-800",
    },
    delivered: { label: i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line41_3_da_giao_hang"), className: "bg-sky-100 text-sky-800" },
    finished: {
      label: i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line43_4_hoan_tat"),
      className: "bg-emerald-100 text-emerald-800",
    },
    fail: { label: i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line46_5_khong_thanh_cong"), className: "bg-rose-100 text-rose-800" },
    "customer-cancels": {
      label: i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line48_6_da_huy"),
      className: "bg-slate-200 text-slate-700",
    },
  };

function getStatusPresentation(status: OrderStatus) {
  return (
    statusPresentation[status] ?? {
      label: status || i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.extra57_0_da_ghi_nhan"),
      className: "bg-slate-100 text-slate-700",
    }
  );
}

function getShippingMethodText(method: string) {
  return method === "delivery" ? i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.extra64_1_giao_hang_tan_noi") : i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.extra64_2_nhan_hang");
}

function normalizeBankKey(value: string) {
  return value.trim().toLowerCase();
}

function DetailCard({
  icon: Icon,
  title,
  children,
  defaultOpen = true,
}: {
  icon: typeof UserRound;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group rounded-xl border border-slate-200 bg-white"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 text-sm font-semibold text-slate-950 marker:content-none sm:px-5">
        <Icon className="h-4 w-4 text-slate-700" />
        <span className="flex-1">{title}</span>
        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-slate-100 px-4 py-4 text-sm text-slate-700 sm:px-5">
        {children}
      </div>
    </details>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return value ? (
    <div className="grid gap-1 sm:grid-cols-[132px_1fr] sm:gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="break-words font-medium text-slate-900 sm:text-right">
        {value}
      </span>
    </div>
  ) : null;
}

export default function PaymentConfirmationPage({
  data,
}: {
  data: IOrderDetail;
}) {
  const selectedIds = useCartStore((state) => state.selectedIds);
  const removeItems = useCartStore((state) => state.removeItems);
  const clearSelected = useCartStore((state) => state.clearSelected);
  const footerSections = useStateStore((state) => state.footerSections);
  const banner = useStateStore((state) => state.banner);
  const router = useRouter();
  const hasClearedCheckoutItems = useRef(false);
  const [selectedBankKey, setSelectedBankKey] = useState<string | null>(null);
  const [isQrPreviewOpen, setIsQrPreviewOpen] = useState(false);
  const bankSection = footerSections.find(
    (section) => section.key === "online_bank",
  );
  const paymentBankBanners = banner[bannerKeys.paymentBankQr]?.advertises ?? [];
  const bannerByBankKey = new Map(
    paymentBankBanners.map((advertise) => [
      normalizeBankKey(advertise.title),
      advertise,
    ]),
  );
  const supportedBanks =
    bankSection?.items.filter(
      (bank) =>
        Boolean(bank.image) && bannerByBankKey.has(normalizeBankKey(bank.key)),
    ) ?? [];
  const activeBankKey =
    selectedBankKey &&
    supportedBanks.some((bank) => bank.key === selectedBankKey)
      ? selectedBankKey
      : supportedBanks[0]?.key;
  const activeQrBanner = activeBankKey
    ? bannerByBankKey.get(normalizeBankKey(activeBankKey))
    : undefined;
  const status = getStatusPresentation(data.status);

  useEffect(() => {
    if (hasClearedCheckoutItems.current || selectedIds.length === 0) {
      return;
    }

    hasClearedCheckoutItems.current = true;
    removeItems(selectedIds);
    clearSelected();
  }, [clearSelected, removeItems, selectedIds]);

  useEffect(() => {
    if (activeBankKey !== selectedBankKey) {
      setSelectedBankKey(activeBankKey ?? null);
    }
  }, [activeBankKey, selectedBankKey]);

  const copyOrderCode = async () => {
    try {
      await navigator.clipboard.writeText(data.orderCode);
      toast.success(i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line167_7_da_sao_chep_ma_don"));
    } catch {
      toast.error(i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line169_8_khong_sao_chep_ma_don"));
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] px-3 py-5 sm:px-5 sm:py-8 lg:px-8">
      <Card className="border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-7 w-7 text-emerald-700" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-slate-950 sm:text-2xl">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line182_9_cam_on_quy_khach_da")}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line185_10_don_hang_quy_khach_da")}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line194_11_ma_don_hang")}</p>
            <button
              type="button"
              onClick={copyOrderCode}
              className="mt-1 inline-flex items-center gap-1.5 font-semibold text-slate-950 hover:text-brand"
              aria-label={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line200_12_sao_chep_ma_don_hang")}
            >
              #{data.orderCode} <Clipboard className="h-4 w-4" />
            </button>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line207_13_ngay_dat_hang")}</p>
            <p className="mt-1 font-semibold text-slate-950">
              {data.dateOrder}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line215_14_trang_thai_don_hang")}</p>
            <span
              className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
            >
              {status.label}
            </span>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line225_15_phuong_thuc_thanh_toan")}</p>
            <p className="mt-1 font-semibold text-slate-950">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line228_16_chuyen_khoan_ngan_hang")}</p>
          </div>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)] lg:items-start">
        <div className="space-y-5">
          <Card className="border border-slate-200 bg-white p-4 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-slate-900" />
              <div>
                <h2 className="text-lg font-bold text-slate-950">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line241_17_thanh_toan_chuyen_khoan")}</h2>
                <p className="mt-0.5 text-sm text-slate-600">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line244_18_quet_ma_bang_ung_dung")}</p>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-sm font-semibold text-slate-950">
                {bankSection?.title || i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line251_19_danh_sach_cac_ngan_hang")}
              </h3>
              {supportedBanks.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {supportedBanks.map((bank: FooterItem) => {
                    const isSelected = bank.key === activeBankKey;

                    return (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setSelectedBankKey(bank.key)}
                        aria-pressed={isSelected}
                        className={`flex h-12 min-w-24 items-center justify-center rounded-lg border bg-white px-2 transition nk-focus-ring ${
                          isSelected
                            ? "border-primary ring-1 ring-primary"
                            : "border-slate-200 hover:border-primary/60"
                        }`}
                      >
                        <Image
                          src={bank.image!}
                          alt={bank.title}
                          width={80}
                          height={32}
                          className="h-8 w-20 object-contain"
                        />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-500">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line283_20_chua_qr_thanh_toan_duoc")}</p>
              )}
            </div>

            {activeQrBanner ? (
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setIsQrPreviewOpen(true)}
                  className="group relative block w-full cursor-zoom-in text-left nk-focus-ring"
                  aria-label={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line294_21_phong_ma_qr_thanh_toan")}
                >
                  <Image
                    src={activeQrBanner.picture}
                    alt={i18nText(
                      "AUTO.components.paymentconfirm.paymentconfirmationpage.line298_22_ma_qr_thong_tin_chuyen",
                      {
                        value0:
                          supportedBanks.find((bank) => bank.key === activeBankKey)
                            ?.title ||
                          i18nText(
                            "AUTO.components.paymentconfirm.paymentconfirmationpage.line300_23_ngan_hang",
                          ),
                      },
                    )}
                    width={activeQrBanner.width || 800}
                    height={activeQrBanner.height || 800}
                    priority
                    className="h-auto w-full"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <ZoomIn className="h-4 w-4" />{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line308_24_phong")}</span>
                </button>
              </div>
            ) : null}

          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {data.nameCompany ||
            data.addressCompany ||
            data.phoneCompany ||
            data.emailCompany ? (
              <DetailCard icon={Building2} title={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line321_25_thong_tin_mua_hang")}>
                <div className="space-y-3">
                  <InfoRow label={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line323_26_ten_cong_ty")} value={data.nameCompany} />
                  <InfoRow label={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line324_27_dien_thoai")} value={data.phoneCompany} />
                  <InfoRow label={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.extra311_3_email")} value={data.emailCompany} />
                  <InfoRow label={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line326_28_dia_chi")} value={data.addressCompany} />
                </div>
              </DetailCard>
            ) : null}
            <DetailCard icon={UserRound} title={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line330_29_thong_tin_nhan_hang")}>
              <div className="space-y-3">
                <InfoRow label={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line332_30_nguoi_nhan")} value={data.nameDelivery} />
                <InfoRow label={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line333_31_dien_thoai")} value={data.phoneDelivery} />
                <InfoRow label={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line334_32_dia_chi")} value={data.addressDelivery} />
                {data.note ? (
                  <InfoRow label={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line336_33_ghi_chu")} value={data.note} />
                ) : null}
              </div>
            </DetailCard>
            <DetailCard
              icon={Truck}
              title={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line342_34_phuong_thuc_van_chuyen")}
              defaultOpen={false}
            >
              <p className="font-medium text-slate-900">
                {getShippingMethodText(data.shippingMethod)}
              </p>
            </DetailCard>
          </div>
        </div>

        <Card className="border border-slate-200 bg-white shadow-sm lg:sticky lg:top-5 lg:flex lg:max-h-[calc(100vh-2.5rem)] lg:flex-col">
          <div className="shrink-0 border-b border-slate-200 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-slate-950">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line355_35_tom_tat_don_hang")}</h2>
          </div>
          <div className="flex flex-col p-5 sm:p-6 lg:min-h-0 lg:flex-1">
            <div className="max-h-[420px] overflow-y-auto pr-2 lg:min-h-0 lg:max-h-none lg:flex-1">
              {data.items?.length ? (
              <div className="space-y-4">
                {data.items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      <Image
                        src={item.picture || "/placeholder.svg"}
                        alt={item.name || i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line367_36_san_pham")}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold text-slate-950">
                        {item.name}
                      </p>
                      <div className="mt-1 flex items-end justify-between gap-2 text-sm">
                        <span className="text-slate-500">
                          SL: {item.quantity}
                        </span>
                        <span className="shrink-0 font-semibold text-slate-950">
                          {getPrice(item)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Package className="h-4 w-4" />{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line391_37_khong_san_pham_don_hang")}</div>
              )}
            </div>

            <div className="mt-5 shrink-0 space-y-3 border-t border-slate-200 pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-600">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line399_38_tam_tinh")}</span>
                <span className="font-medium text-slate-900">
                  {data.totalPrice.toLocaleString("vi-VN")}₫
                </span>
              </div>
              {data.couponCode ? (
                <div className="flex justify-between gap-4">
                  <span className="text-slate-600">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line407_39_giam_gia")}{data.couponCode})
                  </span>
                  <span className="font-medium text-emerald-700">
                    -{(data.couponValue || 0).toLocaleString("vi-VN")}₫
                  </span>
                </div>
              ) : null}
              <div className="flex items-end justify-between gap-4 border-t border-slate-200 pt-4">
                <span className="text-base font-bold text-slate-950">{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line416_40_tong_tien")}</span>
                <span className="text-xl font-bold text-rose-600">
                  {data.finalPrice.toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>

            <Button
              onClick={() => router.replace("/")}
              fullWidth
              size="lg"
              className="mt-6 shrink-0"
            >{i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line430_41_tiep_tuc_mua_sam")}</Button>
          </div>
        </Card>
      </div>

      {activeQrBanner ? (
        <Modal
          isOpen={isQrPreviewOpen}
          onClose={() => setIsQrPreviewOpen(false)}
          title={i18nText("AUTO.components.paymentconfirm.paymentconfirmationpage.line440_42_ma_qr_thanh_toan")}
          size="xl"
        >
          <Image
            src={activeQrBanner.picture}
            alt={i18nText(
              "AUTO.components.paymentconfirm.paymentconfirmationpage.line445_43_ma_qr_thong_tin_chuyen",
              {
                value0:
                  supportedBanks.find((bank) => bank.key === activeBankKey)
                    ?.title ||
                  i18nText(
                    "AUTO.components.paymentconfirm.paymentconfirmationpage.line447_44_ngan_hang",
                  ),
              },
            )}
            width={activeQrBanner.width || 800}
            height={activeQrBanner.height || 800}
            className="mx-auto h-auto max-h-[70vh] w-auto max-w-full object-contain"
          />
        </Modal>
      ) : null}
    </div>
  );
}
