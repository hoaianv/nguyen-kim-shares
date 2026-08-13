"use client";

import Image from "next/image";
import Link from "next/link";
import { useStateStore } from "@/stores/stateStore";
import type { IAdvertise } from "@/interfaces/models/IAdvertise.interface";
import type { ThemeAssetSlot } from "@/theme/types";

type ThemeAssetProps = {
  slot: ThemeAssetSlot;
  fallback?: IAdvertise | null;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  linked?: boolean;
};

export default function ThemeAsset({
  slot,
  fallback,
  className = "",
  imageClassName = "",
  sizes = "100vw",
  priority = false,
  fill = true,
  width,
  height,
  linked = true,
}: ThemeAssetProps) {
  const theme = useStateStore((state) => state.theme);
  const asset = theme?.assets?.[slot];
  const src = asset?.desktop || fallback?.picture;
  const alt = asset?.alt || fallback?.title || "";
  const href = asset?.href || fallback?.link;
  const target = fallback?.target;

  if (!src) return null;

  const wrapperClassName = fill && !className ? "absolute inset-0" : className;

  const image = fill ? (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      quality={92}
      sizes={sizes}
      className={imageClassName}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width ?? fallback?.width ?? 1200}
      height={height ?? fallback?.height ?? 400}
      priority={priority}
      quality={92}
      sizes={sizes}
      className={imageClassName}
    />
  );

  if (!linked || !href) {
    return <div className={wrapperClassName}>{image}</div>;
  }

  return (
    <Link href={href} target={target} className={wrapperClassName}>
      {image}
    </Link>
  );
}
