"use client";

import Pagination from "@/components/ui/pagination";
import { IPagination } from "@/interfaces/common";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaginationDynamic({ data }: { data: IPagination }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onPageChange = (page?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page && page > 1) params.set("page", String(page));
    else params.delete("page");

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    data &&
    data?.lastPage > 1 && (
      <Pagination
        total={data?.total}
        currentPage={data.currentPage}
        itemsPerPage={data.perPage ?? 10}
        onPageChange={onPageChange}
      />
    )
  );
}
