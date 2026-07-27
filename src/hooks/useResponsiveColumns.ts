"use client";

import { useEffect, useRef, useState } from "react";

type ColumnOptions = {
  minWidth: number;
  maxColumns?: number;
  gap?: number;
  fallback?: number;
};

export function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      setWidth(Math.round(el.getBoundingClientRect().width));
    };

    update();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }

    const observer = new ResizeObserver(() => update());
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { ref, width };
}

export function getResponsiveColumnCount(
  width: number,
  { minWidth, maxColumns = 6, gap = 12, fallback = 1 }: ColumnOptions
) {
  if (!width) return fallback;
  const count = Math.floor((width + gap) / (minWidth + gap));
  return Math.max(fallback, Math.min(maxColumns, count || fallback));
}
