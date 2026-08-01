"use client";

import { i18nText } from "@/lib/i18nText";
import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck,
  FileText,
  Images,
  ListTree,
  PhoneCall,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { IImage } from "@/interfaces/common";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ImageWithFallback from "../ImageWithFallback";

type ImageProps = {
  data: IImage[];
  nameProduct: string;
  warranty?: string;
  hotline: string;
  hasSpecifications: boolean;
  onNavigateToSection: (sectionId: string) => void;
};

const ProductGallery = ({
  data,
  nameProduct,
  warranty,
  hotline,
  hasSpecifications,
  onNavigateToSection,
}: ImageProps) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = (state: boolean) => () => setOpen(state);
  const [index, setIndex] = useState(0);
  const updateIndex =
    (when: boolean) =>
    ({ index: current }: { index: number }) => {
      if (when === open) {
        setIndex(current);
      }
    };

  return (
    <div className="p-3 sm:p-4">
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-start">
        <div className="order-2 min-w-0 lg:order-1 lg:w-[98px]">
          <Swiper
            spaceBetween={10}
            slidesPerView="auto"
            modules={[Pagination]}
            breakpoints={{
              1024: {
                direction: "vertical",
                slidesPerView: 5,
              },
            }}
            className="w-full lg:!h-[500px]"
          >
            {data?.map((item, idx) => (
              <SwiperSlide className="!h-[94px] !w-[94px]" key={item.id}>
                <button
                  type="button"
                  onClick={() => setIndex(idx)}
                  aria-label={i18nText("AUTO.components.product.productgallery.line74_0_chon_hinh_anh", { value0: idx + 1, value1: nameProduct })}
                  aria-current={index === idx ? "true" : undefined}
                  className={`flex h-full w-full items-center justify-center rounded-sm border p-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                    index === idx
                      ? "border-brand shadow-sm"
                      : "border-slate-200 hover:border-brand hover:shadow-md"
                  }`}
                >
                  <ImageWithFallback
                    loading="lazy"
                    src={item.src}
                    width={86}
                    height={86}
                    alt={i18nText("AUTO.components.product.productgallery.line87_1_hinh", { value0: nameProduct, value1: idx + 1 })}
                    className="object-contain"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="order-1 min-w-0 flex-1 lg:order-2">
          <Lightbox
            className="product-gallery-inline"
            index={index}
            slides={data}
            plugins={[Inline]}
            on={{
              view: updateIndex(false),
              click: toggleOpen(true),
            }}
            carousel={{
              padding: 0,
              spacing: 0,
              imageFit: "contain",
            }}
            inline={{
              style: {
                width: "100%",
                maxWidth: "900px",
                aspectRatio: "4 / 3",
                margin: "0 auto",
                background: "transparent",
              },
            }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={toggleOpen(true)}
          className="inline-flex w-[72px] flex-col items-center text-center text-xs leading-tight text-slate-700 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center border border-slate-300 bg-white transition hover:border-brand">
            <Images className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="mt-1">{i18nText("AUTO.components.product.productgallery.line133_2_hinh_anh_noi_bat")}</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigateToSection("product-specifications")}
          disabled={!hasSpecifications}
          aria-disabled={!hasSpecifications}
          title={
            hasSpecifications
              ? i18nText("AUTO.components.product.productgallery.line142_3_xem_thong_so_ky_thuat")
              : i18nText("AUTO.components.product.productgallery.line143_4_san_pham_chua_thong_so")
          }
          className="inline-flex w-[72px] flex-col items-center text-center text-xs leading-tight text-slate-700 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:text-slate-400"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center border border-slate-300 bg-white transition hover:border-brand">
            <ListTree className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="mt-1">{i18nText("AUTO.components.product.productgallery.line150_5_thong_so_ky_thuat")}</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigateToSection("product-description")}
          className="inline-flex w-[72px] flex-col items-center text-center text-xs leading-tight text-slate-700 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center border border-slate-300 bg-white transition hover:border-brand">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="mt-1">{i18nText("AUTO.components.product.productgallery.line160_6_mo_ta_san_pham")}</span>
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 border-y border-slate-200 text-sm sm:grid-cols-2">
        <div className="flex items-center gap-2 border-b border-slate-200 px-1 py-3 sm:border-r">
          <Truck className="h-6 w-6 shrink-0 rounded-full bg-teal-600 p-1 text-white" />
          <span className="text-slate-700">{i18nText("AUTO.components.product.productgallery.line167_7_chinh_sach_bao_hanh")}</span>
          <Link
            href="/chinh-sach/bao-hanh-doi-tra"
            className="text-brand-strong underline-offset-2 hover:underline"
          >{i18nText("AUTO.components.product.productgallery.line172_8_xem_chi_tiet")}</Link>
        </div>
        <div className="flex items-center gap-2 border-b border-slate-200 px-1 py-3 sm:pl-4">
          <ShieldCheck className="h-6 w-6 shrink-0 rounded-full bg-teal-600 p-1 text-white" />
          <span className="text-slate-700">{i18nText("AUTO.components.product.productgallery.line178_9_bao_hanh")}{warranty?.trim() || i18nText("AUTO.components.product.productgallery.line178_10_theo_tieu_chuan_hang")}
          </span>
        </div>
        <div className="flex items-center gap-2 border-b border-slate-200 px-1 py-3 sm:border-b-0 sm:border-r">
          <BadgeCheck className="h-6 w-6 shrink-0 rounded-full bg-teal-600 p-1 text-white" />
          <span className="text-slate-700">{i18nText("AUTO.components.product.productgallery.line183_11_gia_luon_tot_nhat")}</span>
        </div>
        <a
          href={`tel:${hotline}`}
          className="flex items-center gap-2 px-1 py-3 transition hover:text-brand-strong sm:pl-4"
        >
          <PhoneCall className="h-6 w-6 shrink-0 rounded-full bg-teal-600 p-1 text-white" />
          <span className="text-brand-strong">{hotline}</span>
        </a>
      </div>

      <Lightbox
        open={open}
        close={toggleOpen(false)}
        index={index}
        slides={data}
        plugins={[Thumbnails]}
        on={{ view: updateIndex(true) }}
        animation={{ fade: 0 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
      />
    </div>
  );
};

export default ProductGallery;
