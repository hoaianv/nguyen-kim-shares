"use client";

import { i18nText } from "@/lib/i18nText";
import React, { useState } from "react";
import { ChevronUp, ChevronDown, Search } from "lucide-react";
import { Column, IPagination } from "@/interfaces/common";
import PaginationDynamic from "@/components/ui/PaginationDynamic";

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  pagination?: IPagination;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  rowKey?: keyof T | ((record: T) => string);
  onRowClick?: (record: T, index: number) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  className?: string;
  size?: "small" | "medium" | "large";
  bordered?: boolean;
  striped?: boolean;
}

const TableSkeleton = ({
  rows = 5,
  columns = 4,
}: {
  rows?: number;
  columns?: number;
}) => (
  <div className="animate-pulse">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex space-x-4 border-b border-border p-4">
        {Array.from({ length: columns }).map((_, j) => (
          <div key={j} className="h-4 flex-1 rounded-lg bg-muted/70" />
        ))}
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="px-6 py-14 text-center">
    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-lg bg-muted text-muted-foreground">
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 17v-2m3 2v-4m3 2v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <p className="text-sm text-slate-500">{i18nText("AUTO.components.ui.table.line56_0_khong_du_lieu")}</p>
  </div>
);

function Table<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  pagination,
  showSearch = false,
  searchPlaceholder = i18nText("AUTO.components.ui.table.extra67_0_tim_kiem"),
  onSearch,
  rowKey,
  onRowClick,
  selectable = false,
  onSelectionChange,
  className = "",
  size = "medium",
  bordered = true,
  striped = false,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const sizeClasses = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };

  const cellPadding = {
    small: "px-3 py-2",
    medium: "px-4 py-3",
    large: "px-6 py-4",
  };

  const handleSort = (columnKey: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === columnKey &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const getRecordKey = (record: T): string => {
    if (typeof rowKey === "function") {
      return rowKey(record);
    }
    if (typeof rowKey === "string") {
      return String(record[rowKey]);
    }
    return JSON.stringify(record);
  };

  const isRowSelected = (record: T): boolean => {
    const recordKey = getRecordKey(record);
    return selectedRows.some((row) => getRecordKey(row) === recordKey);
  };

  const handleRowSelect = (record: T, checked: boolean) => {
    let newSelectedRows: T[];
    if (checked) {
      newSelectedRows = [...selectedRows, record];
    } else {
      const recordKey = getRecordKey(record);
      newSelectedRows = selectedRows.filter(
        (row) => getRecordKey(row) !== recordKey
      );
    }
    setSelectedRows(newSelectedRows);
    onSelectionChange?.(newSelectedRows);
    setSelectAll(newSelectedRows.length === data.length);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = checked ? [...data] : [];
    setSelectedRows(newSelectedRows);
    setSelectAll(checked);
    onSelectionChange?.(newSelectedRows);
  };

  const getCellValue = (record: T, column: Column<T>) => {
    if (column.render) {
      const index = data.indexOf(record);
      return column.render(record[column.key as keyof T], record, index);
    }
    return record[column.key as keyof T];
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <div
      className={`overflow-hidden rounded-lg border border-border bg-card shadow-[0_16px_40px_-30px_rgba(15,23,42,0.28)] ${className}`}
    >
      {showSearch && (
        <div className="border-b border-border p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={handleSearchChange}
              className="nk-focus-ring w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-amber-500"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
        <table className={`min-w-full ${sizeClasses[size]}`}>
          <thead className="bg-muted/40">
            <tr className="border-b border-border">
              {selectable && (
                <th
                  className={`${cellPadding[size]} text-left text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground`}
                >
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded-lg border-border text-amber-600 focus:ring-amber-500"
                  />
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`${
                    cellPadding[size]
                  } text-left text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground ${
                    column.sortable ? "cursor-pointer select-none hover:text-foreground" : ""
                  } ${
                    column.align === "center"
                      ? "text-center"
                      : column.align === "right"
                      ? "text-right"
                      : ""
                  }`}
                  style={{ width: column.width }}
                  onClick={() =>
                    column.sortable && handleSort(column.key as string)
                  }
                >
                  <div
                    className={`inline-flex items-center gap-1.5 ${
                      column.align === "center"
                        ? "justify-center"
                        : column.align === "right"
                        ? "justify-end"
                        : ""
                    }`}
                  >
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={`h-3 w-3 ${
                            sortConfig?.key === column.key &&
                            sortConfig.direction === "asc"
                              ? "text-amber-600"
                              : "text-muted-foreground/40"
                          }`}
                        />
                        <ChevronDown
                          className={`-mt-1 h-3 w-3 ${
                            sortConfig?.key === column.key &&
                            sortConfig.direction === "desc"
                              ? "text-amber-600"
                              : "text-muted-foreground/40"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border bg-card">
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <TableSkeleton rows={5} columns={columns.length} />
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              sortedData.map((record, index) => (
                <tr
                  key={getRecordKey(record)}
                  className={`transition-colors duration-150 ${
                    striped && index % 2 === 1 ? "bg-muted/30" : "bg-card"
                  } ${onRowClick ? "cursor-pointer hover:bg-amber-50/50" : ""} ${
                    isRowSelected(record) ? "bg-amber-50/70" : ""
                  } ${bordered ? "border-b border-border" : ""}`}
                  onClick={() => onRowClick?.(record, index)}
                >
                  {selectable && (
                    <td className={cellPadding[size]}>
                      <input
                        type="checkbox"
                        checked={isRowSelected(record)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleRowSelect(record, e.target.checked);
                        }}
                        className="rounded-lg border-border text-amber-600 focus:ring-amber-500"
                      />
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`${
                        cellPadding[size]
                      } whitespace-nowrap text-foreground ${
                        column.align === "center"
                          ? "text-center"
                          : column.align === "right"
                          ? "text-right"
                          : ""
                      }`}
                    >
                      {getCellValue(record, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && <PaginationDynamic data={pagination} />}
    </div>
  );
}

export default Table;

