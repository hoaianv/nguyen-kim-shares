"use client";

import { useEffect } from "react";
import type { FooterSection } from "@/interfaces/models/IFooter.interface";
import { useStateStore } from "@/stores/stateStore";

export function FooterInitializer({
  data,
}: {
  data: FooterSection[] | null;
}) {
  const { setFooterSections } = useStateStore();

  useEffect(() => {
    if (data) {
      setFooterSections(data);
    }
  }, [data, setFooterSections]);

  return null;
}
