"use client";
import { useState } from "react";
import { IImage } from "@/interfaces/common";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Image from "next/image";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ImageWithFallback from "../ImageWithFallback";

type ImageProps = {
  data: IImage[];
  nameProduct: string;
};

const ProductGallery = ({ data, nameProduct }: ImageProps) => {
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
    <div className=" p-3">
      <Lightbox
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
            aspectRatio: "3 / 2",
            margin: "0 auto",
          },
        }}
      />
      <div className="flex gap-2 flex-wrap  justify-center mt-4">
        <Swiper spaceBetween={5} modules={[Pagination]} className="mySwiper">
          {data?.length > 0 &&
            data.map((item, idx) => (
              <SwiperSlide className="!w-[95px] !h-[95px]" key={item.id}>
                <div
                  onClick={() => setIndex(idx)}
                  className={`w-full h-full flex items-center justify-center  p-[3px] border-[1px]  rounded-lg  cursor-pointer transition-all duration-200 hover:border-[#aec6fd] hover:shadow-md ${
                    index === idx ? "border-[#aec6fd]" : "border-slate-200/10"
                  }`}
                >
                  <ImageWithFallback
                    loading="lazy"
                    src={item.src}
                    width={90}
                    height={90}
                    alt={nameProduct + idx}
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
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

