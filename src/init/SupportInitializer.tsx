"use client";

import { useStateStore } from "@/stores/stateStore";
import { useEffect } from "react";
import type { SupportGroups } from "@/interfaces/models/ISupport.interface";

export default function SupportInitializer({
  data,
}: {
  data: SupportGroups | null;
}) {
  const { setSupport } = useStateStore();

  useEffect(() => {
    if (data) {
      setSupport(data);
    }
  }, [data, setSupport]);

  return null;
}
