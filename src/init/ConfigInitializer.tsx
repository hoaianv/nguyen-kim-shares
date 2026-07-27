"use client";

import { IFooter } from "@/interfaces/models/IFooter.interface";
import { useStateStore } from "@/stores/stateStore";

import { useEffect } from "react";

export function ConfigInitializer({ data }: { data: IFooter | null }) {
  const { setConfig } = useStateStore();

  useEffect(() => {
    if (data) {
      setConfig(data);
    }
  }, [data]);

  return null;
}
