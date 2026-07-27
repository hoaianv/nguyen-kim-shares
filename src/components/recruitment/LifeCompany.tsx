"use client";

import { bannerKeys } from "@/constants/values.constant";
import { useStateStore } from "@/stores/stateStore";
import Image from "next/image";
import { useState } from "react";

import {
  RenderImageContext,
  RenderImageProps,
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/rows.css";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        className="rounded-lg cursor-pointer"
        fill
        src={photo}
        alt={alt}
        title={title}
        loading="lazy"
        sizes={sizes}
      />
    </div>
  );
}

export default function LifeCompany() {
  const { banner } = useStateStore();
  const banners = banner[bannerKeys.bannerLifeAtCompany] || [];
  const [index, setIndex] = useState(-1);

  return (
    banners?.advertises &&
    banners?.advertises.length > 0 && (
      <section className="py-20 px-4 bg-background">
        <div className="mx-auto 2xl:max-w-[1520px] xl:max-w-6xl lg:max-w-4xl md:max-w-lg sm:max-w-md max-w-sm">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              {banners.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {banners.description}
            </p>
          </div>

          <div className="">
            <RowsPhotoAlbum
              onClick={({ index }) => setIndex(index)}
              targetRowHeight={150}
              spacing={5}
              photos={
                banners?.advertises.map((item) => ({
                  src: item.picture,
                  alt: item.title,
                  width: 1600,
                  height: 900,
                })) ?? []
              }
              render={{ image: renderNextImage }}
              defaultContainerWidth={1200}
              sizes={{
                size: "1168px",
                sizes: [
                  {
                    viewport: "(max-width: 1200px)",
                    size: "calc(100vw - 32px)",
                  },
                ],
              }}
            />
          </div>
        </div>
        <Lightbox
          slides={
            banners?.advertises.map((item) => ({
              src: item.picture,
              alt: item.title,
            })) ?? []
          }
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          // enable optional lightbox plugins
          plugins={[Slideshow, Thumbnails]}
        />
      </section>
    )
  );
}

