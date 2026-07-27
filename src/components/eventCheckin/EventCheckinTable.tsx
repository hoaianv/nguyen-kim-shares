"use client";

import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Table from "@/components/ui/table";
import ConfirmPopover from "@/components/ui/ConfirmPopover";
import { Column, IPagination } from "@/interfaces/common";
import {
  IEventCheckinGuest,
  ECheckinStatus,
} from "@/interfaces/models/IEventCheckin.interface";
import QrThumbnail from "./QrThumbnail";

const STATUS_CONFIG: Record<
  ECheckinStatus,
  { label: string; className: string }
> = {
  [ECheckinStatus.Checked]: {
    label: "Đã check-in",
    className:
      "bg-emerald-50 text-emerald-700 border border-emerald-200 ring-1 ring-emerald-500/10",
  },
  [ECheckinStatus.NotChecked]: {
    label: "Chưa check-in",
    className:
      "bg-amber-50 text-amber-700 border border-amber-200 ring-1 ring-amber-500/10",
  },
};

interface EventCheckinTableProps {
  data: IEventCheckinGuest[];
  loading: boolean;
  pagination?: IPagination;
  onEdit: (guest: IEventCheckinGuest) => void;
  onDelete: (guest: IEventCheckinGuest) => void;
  onViewQr: (guest: IEventCheckinGuest) => void;
  onSelectionChange: (rows: IEventCheckinGuest[]) => void;
  selectionResetKey: number;
}

export default function EventCheckinTable({
  data,
  loading,
  pagination,
  onEdit,
  onDelete,
  onViewQr,
  onSelectionChange,
  selectionResetKey,
}: EventCheckinTableProps) {
  const columns: Column<IEventCheckinGuest>[] = useMemo(
    () => [
      {
        key: "name",
        title: "Khách hàng",
        sortable: true,
        render: (_, record) => (
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-gray-900 leading-tight">
              {record.name}
            </span>
            <div className="flex items-center gap-2 mt-1 flex-wrap text-xs text-gray-500">
              <span className="truncate max-w-[200px]" title={record.email}>
                {record.email}
              </span>
              <span className="text-gray-300">•</span>
              <span className="font-mono text-gray-600">{record.phone}</span>
            </div>
          </div>
        ),
      },
      {
        key: "company",
        title: "Công ty / Chức vụ",
        render: (_, record) => (
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-gray-800 text-sm leading-snug line-clamp-2" title={record.companyName}>
              {record.companyName}
            </span>
            {record.position && (
              <span className="text-xs text-gray-500 inline-block mt-0.5">
                {record.position}
              </span>
            )}
          </div>
        ),
      },
      {
        key: "saleName",
        title: "Sale phụ trách",
        width: "140px",
        render: (_, record) => (
          <span className="text-sm text-gray-600 font-medium bg-gray-100/70 px-2 py-1 rounded-md inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            {record.saleName || "—"}
          </span>
        ),
      },
      {
        key: "qrCode",
        title: "Mã QR",
        width: "80px",
        align: "center" as const,
        render: (_, record) => (
          <QrThumbnail
            qrData={record.qrCode}
            guestName={record.name}
            onView={() => onViewQr(record)}
          />
        ),
      },
      {
        key: "status",
        title: "Trạng thái",
        width: "130px",
        align: "center" as const,
        render: (_, record) => {
          const config =
            STATUS_CONFIG[record.status] ||
            STATUS_CONFIG[ECheckinStatus.NotChecked];
          return (
            <span
              className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase ${config.className}`}
            >
              {config.label}
            </span>
          );
        },
      },
      {
        key: "actions" as string,
        title: "Tác vụ",
        width: "90px",
        align: "center" as const,
        render: (_, record) => (
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(record);
              }}
              className="p-1.5 rounded-md hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
              title="Chỉnh sửa"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <ConfirmPopover
              trigger={
                <span className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors inline-flex cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </span>
              }
              title="Xác nhận xóa"
              description={`Bạn có chắc muốn xóa khách "${record.name}"?`}
              confirmText="Xóa"
              cancelText="Hủy"
              variant="danger"
              position="left"
              onConfirm={() => onDelete(record)}
            />
          </div>
        ),
      },
    ],
    [onEdit, onDelete, onViewQr]
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm overflow-hidden">
      <Table<IEventCheckinGuest>
        key={selectionResetKey}
        data={data}
        columns={columns}
        loading={loading}
        pagination={pagination}
        rowKey="id"
        selectable
        onSelectionChange={onSelectionChange}
        size="medium"
        striped
      />
    </div>
  );
}
