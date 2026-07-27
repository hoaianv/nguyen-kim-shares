"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";
import { useStateStore } from "@/stores/stateStore";

export function useSearchActions() {
  const { search, setSearch } = useStateStore();
  const router = useRouter();

  const debouncedChange = useMemo(
    () =>
      debounce((value: string) => {
        setSearch((prev) => ({ ...prev, keyword: value }));
      }, 400),
    [setSearch]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const q = encodeURIComponent(search.keyword?.trim() ?? "");
      if (!q) return;
      router.replace(`/san-pham?q=${q}`);
    }
  };

  return { debouncedChange, handleKeyDown };
}
