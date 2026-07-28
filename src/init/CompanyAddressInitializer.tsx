"use client";

import { useEffect } from "react";
import type { CompanyAddress } from "@/interfaces/models/IFooter.interface";
import { useStateStore } from "@/stores/stateStore";

export function CompanyAddressInitializer({
  data,
}: {
  data: CompanyAddress[] | null;
}) {
  const { setCompanyAddress } = useStateStore();

  useEffect(() => {
    const companyAddress = data
      ?.filter((item) => item.display)
      .sort((a, b) => a.order - b.order)[0];

    setCompanyAddress(companyAddress ?? null);
  }, [data, setCompanyAddress]);

  return null;
}
