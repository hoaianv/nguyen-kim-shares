"use client";

import React, {
  useMemo,
  useState,
  useDeferredValue,
  useEffect,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import JobCard from "@/components/recruitment/JobCard";
import { IPagination } from "@/interfaces/common";
import { IHirePost } from "@/interfaces/models/IRecruitment.interfaces";
import { ICategoryRecruitment } from "@/interfaces/models/IRecruitment.interfaces"; // nếu bạn để file khác, đổi import cho đúng
import SelectField from "@/components/ui/select";
import InputField from "@/components/ui/input";
import { X, Filter, Search } from "lucide-react";
import PaginationDynamic from "@/components/ui/PaginationDynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { PARAMS_RECRUITMENT } from "@/constants/values.constant";

type RecruitmentList = {
  items: IHirePost[];
  pagination: IPagination;
};

interface JobGridProps {
  data?: RecruitmentList | null;
  categories?: ICategoryRecruitment[] | null;
  category: string;
  nameJob: string;
}

export default function JobGrid({
  data,
  categories = [],
  category,
  nameJob,
}: JobGridProps) {
  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const [search, setSearch] = useState(nameJob ?? "");

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSetParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, String(value));
    } else {
      params.delete(key);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    setSearch("");
    handleSetParams(PARAMS_RECRUITMENT.NAME, "");
    handleSetParams(PARAMS_RECRUITMENT.CATEGORY, "");
  };

  const debouncedSearch = useCallback(
    debounce((val: string) => {
      handleSetParams(PARAMS_RECRUITMENT.NAME, val);
    }, 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // cleanup khi component unmount
    };
  }, [debouncedSearch]);

  return (
    <section id="jobs" className="py-20 px-4 bg-muted/30">
      {/* Hero heading */}
      <div className="mx-auto 2xl:max-w-[1520px] xl:max-w-6xl lg:max-w-4xl md:max-w-lg sm:max-w-md max-w-sm">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-4xl md:text-5xl font-bold text-foreground text-balance"
          >
            Cơ hội nghề nghiệp
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="mt-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty"
          >
            Tham gia đội ngũ năng động và phát triển sự nghiệp cùng Nguyên Kim
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="sticky top-2 z-20 mb-8"
        >
          <div className="relative rounded-lg border border-slate-200/60 bg-white/60 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/50">
            <div className="pointer-events-none absolute inset-x-0 -top-[1px] h-[2px] bg-gradient-to-r from-[#FFD500] via-[#1435C3] to-fuchsia-500 rounded-t-2xl" />

            <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 items-center">
              <div className="md:col-span-7">
                <div className="relative">
                  <div className="pl-9">
                    <InputField
                      classProps="mb-0"
                      id="search"
                      label="Tìm theo tên công việc"
                      value={search}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSearch(val);
                        debouncedSearch(val);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Department select */}
              <div className="md:col-span-4">
                <SelectField
                  id="dept"
                  label=""
                  value={category}
                  onChange={(e) =>
                    handleSetParams(PARAMS_RECRUITMENT.CATEGORY, e.target.value)
                  }
                  options={(categories ?? []).map((c) => ({
                    value: String(c.url),
                    label: c.name,
                  }))}
                  placeholder="Chọn phòng ban"
                />
              </div>

              <div className="md:col-span-1 flex items-end">
                <div
                  onClick={handleClear}
                  className="w-full cursor-pointer h-[52px] md:h-[52px] rounded-lg border border-gray-300 hover:border-gray-400 bg-white text-gray-700 text-sm font-medium inline-flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                  aria-label="Xóa bộ lọc"
                >
                  <X className="h-4 w-4 text-[#999]" />
                  <span className="hidden text-[#999]  lg:inline">Xóa</span>
                </div>
              </div>
            </div>

            <div className="px-4 md:px-5 pb-4 -mt-2">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-gray-500">
                  {items.length} vị trí phù hợp
                </span>

                <AnimatePresence>
                  {category && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 bg-gradient-to-r from-[#FFD500]/20 to-[#1435C3]/10 border-[#1435C3]/20"
                    >
                      <Filter className="h-4 w-4 text-[#1435C3]" />
                      {
                        (categories ?? []).find(
                          (c) => String(c.url) === String(category)
                        )?.name
                      }
                      <div
                        onClick={() =>
                          handleSetParams(PARAMS_RECRUITMENT.CATEGORY, "")
                        }
                        className="ml-1 hover:opacity-80 transition cursor-pointer"
                        aria-label="Bỏ lọc phòng ban"
                      >
                        <X className="h-4 w-4" />
                      </div>
                    </motion.span>
                  )}
                  {search && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 bg-gradient-to-r from-fuchsia-500/10 to-[#1435C3]/10 border-fuchsia-500/20"
                    >
                      “{search}”
                      <div
                        onClick={() => {
                          handleSetParams(PARAMS_RECRUITMENT.NAME, "");
                          setSearch("");
                        }}
                        className="ml-1 hover:opacity-80 transition"
                        aria-label="Xóa từ khóa"
                      >
                        <X className="h-4 w-4" />
                      </div>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid results */}
        <AnimatePresence mode="popLayout">
          {items.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
            >
              {items.map((job, idx) => (
                <motion.div
                  key={(job as any).id ?? idx}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: Math.min(idx * 0.03, 0.25),
                  }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <JobCard item={job} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center text-muted-foreground py-16"
            >
              <div className="mx-auto max-w-md">
                <div className="text-2xl font-semibold mb-2">
                  Không tìm thấy vị trí phù hợp
                </div>
                <p className="mb-6">
                  Thử đổi từ khóa hoặc chọn phòng ban khác nhé.
                </p>
                <div
                  onClick={handleClear}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 border border-gray-300 bg-white hover:border-gray-400 active:scale-[0.98] transition"
                >
                  <Search className="h-4 w-4" />
                  Làm mới bộ lọc
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <PaginationDynamic data={pagination!} />
      </div>
    </section>
  );
}

