"use client";

import { IAdPosition } from "@/interfaces/models/IAdvertise.interface";
import { useStateStore } from "@/stores/stateStore";
import { useEffect } from "react";

export function BannerInitializer({
  data,
}: {
  data: { [key: string]: IAdPosition } | null;
}) {
  const { setBanner } = useStateStore();

  useEffect(() => {
    if (data) {
      setBanner(data);
    }
  }, [data]);

  return null;
}
