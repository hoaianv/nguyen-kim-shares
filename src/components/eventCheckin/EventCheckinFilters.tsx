"use client";

import { useState } from "react";
import { Plus, Trash2, Download, Search, Loader2, Upload } from "lucide-react";
import ConfirmPopover from "@/components/ui/ConfirmPopover";
import { ECheckinStatus } from "@/interfaces/models/IEventCheckin.interface";

interface StatusTab {
  label: string;
  value: string;
}

const STATUS_TABS: StatusTab[] = [
  { label: "Tất cả", value: "" },
  { label: "Đã check-in", value: ECheckinStatus.Checked },
  { label: "Chưa check-in", value: ECheckinStatus.NotChecked },
];

interface EventCheckinFiltersProps {
  status: string;
  keyword: string;
  selectedCount: number;
  exporting: boolean;
  onStatusChange: (status: string) => void;
  onKeywordChange: (keyword: string) => void;
  onAddGuest: () => void;
  onBulkDelete: () => void;
  onExport: () => void;
  onImport: () => void;
}

export default function EventCheckinFilters({
  status,
  keyword,
  selectedCount,
  exporting,
  onStatusChange,
  onKeywordChange,
  onAddGuest,
  onBulkDelete,
  onExport,
  onImport,
}: EventCheckinFiltersProps) {
  const [localKeyword, setLocalKeyword] = useState(keyword);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onKeywordChange(localKeyword);
    }
  };

  const handleClear = () => {
    setLocalKeyword("");
    if (keyword) onKeywordChange("");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-4 mb-4 space-y-3">
      {/* Row 1: Status tabs + actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* Segmented control */}
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 gap-0.5">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onStatusChange(tab.value)}
              className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-150
                ${
                  status === tab.value
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onAddGuest}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Thêm khách</span>
            <span className="sm:hidden">Thêm</span>
          </button>

          <button
            onClick={onImport}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 shadow-sm transition-colors"
            title="Import Danh sách"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Import</span>
          </button>

          {selectedCount > 0 && (
            <ConfirmPopover
              trigger={
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg border border-red-200 transition-colors cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                  Xóa ({selectedCount})
                </span>
              }
              title="Xác nhận xóa hàng loạt"
              description={`Bạn có chắc muốn xóa ${selectedCount} khách đã chọn? Thao tác này không thể hoàn tác.`}
              confirmText={`Xóa ${selectedCount} khách`}
              cancelText="Hủy"
              variant="danger"
              position="bottom"
              onConfirm={onBulkDelete}
            />
          )}

          <button
            onClick={onExport}
            disabled={exporting}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Export Excel"
          >
            {exporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Row 2: Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={localKeyword}
          onChange={(e) => setLocalKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (localKeyword !== keyword) onKeywordChange(localKeyword);
          }}
          placeholder="Tìm theo tên, email, SĐT..."
          className="w-full pl-10 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
        />
        {localKeyword && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
