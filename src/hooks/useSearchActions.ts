"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";
import { useStateStore } from "@/stores/stateStore";

export function useSearchActions() {
  const { setSearch } = useStateStore();
  const router = useRouter();

  const debouncedChange = useMemo(
    () =>
      debounce((value: string) => {
        setSearch((prev) => ({ ...prev, keyword: value }));
      }, 400),
    [setSearch]
  );

  const handleSearch = (keyword: string) => {
    const q = encodeURIComponent(keyword.trim());
    if (!q) return;
    router.replace(`/san-pham?q=${q}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e.currentTarget.value);
    }
  };

  return { debouncedChange, handleKeyDown, handleSearch };
}
