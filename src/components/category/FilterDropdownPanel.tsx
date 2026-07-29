"use client";

import type {
  IOptionsDetail,
  ISubCateOption,
} from "@/interfaces/models/ICategoryDetail.interface";

interface FilterDropdownPanelProps {
  options: IOptionsDetail[];
  getSelectedValue: (slugKey: string) => string;
  setQueryParam: (key: string, value?: string) => void;
  clearAllFilters: () => void;
  onClose: () => void;
}

export default function FilterDropdownPanel({
  options,
  getSelectedValue,
  setQueryParam,
  clearAllFilters,
  onClose,
}: FilterDropdownPanelProps) {
  return (
    <div className="border border-border bg-white">
      <div className="grid max-h-[70vh] gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((group) => (
          <div key={group.id} className="space-y-3">
            <div className="border-b border-border pb-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
                {group.title}
              </h3>
            </div>

            <div className="space-y-2">
              {group.subCateOption?.map((sub: ISubCateOption) => {
                const selected = getSelectedValue(group.slug) === sub.url;
                return (
                  <button
                    key={sub.url}
                    type="button"
                    onClick={() => {
                      if (selected) {
                        setQueryParam(group.slug);
                      } else {
                        setQueryParam(group.slug, sub.url);
                      }
                    }}
                    title={sub.title}
                    className={`flex w-full items-center justify-between border px-3 py-2.5 text-left text-sm transition ${
                      selected
                        ? "border-amber-300 bg-amber-50 text-amber-800"
                        : "border-border bg-white text-foreground hover:border-amber-200 hover:bg-amber-50/40"
                    }`}
                  >
                    <span className="line-clamp-2">{sub.title}</span>
                    {selected ? (
                      <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                        Active
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-border bg-white p-4">
        <button
          type="button"
          onClick={clearAllFilters}
          className="inline-flex h-10 items-center border border-border bg-white px-4 text-sm font-medium text-foreground transition hover:border-amber-300 hover:bg-amber-50"
        >
          Thiết lập lại
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 items-center border border-slate-950 bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Xem kết quả
        </button>
      </div>
    </div>
  );
}
