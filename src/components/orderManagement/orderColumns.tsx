"use client";

import { i18nText } from "@/lib/i18nText";
import { Column } from "@/interfaces/common";
import { IOrder, OrderStatus } from "@/interfaces/models/IOrder.interface";
import Link from "next/link";

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "PROCESSING":
        return "bg-indigo-100 text-indigo-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return i18nText("AUTO.components.ordermanagement.ordercolumns.extra31_0_xu_ly");
      case "CONFIRMED":
        return i18nText("AUTO.components.ordermanagement.ordercolumns.extra33_1_da_xac_nhan");
      case "PROCESSING":
        return i18nText("AUTO.components.ordermanagement.ordercolumns.extra35_2_dang_xu_ly");
      case "SHIPPED":
        return i18nText("AUTO.components.ordermanagement.ordercolumns.extra37_3_da_gui");
      case "DELIVERED":
        return i18nText("AUTO.components.ordermanagement.ordercolumns.extra39_4_da_giao");
      case "CANCELLED":
        return i18nText("AUTO.components.ordermanagement.ordercolumns.extra41_5_da_huy");
      default:
        return status;
    }
  };

  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
        status
      )}`}
    >
      {getStatusText(status)}
    </span>
  );
};

export const orderColumns: Column<IOrder>[] = [
  {
    key: "orderCode",
    title: i18nText("AUTO.components.ordermanagement.ordercolumns.line60_0_ma_don_hang"),
    sortable: true,
    width: "80px",
    align: "center",
    render: (value, record) => (
      <Link
        href={`/tai-khoan/quan-ly-don-hang/${record.id}`}
        className="font-medium text-gray-900"
      >
        {value}
      </Link>
    ),
  },
  {
    key: "nameDelivery",
    title: i18nText("AUTO.components.ordermanagement.ordercolumns.line75_1_nguoi_nhan"),
    sortable: true,
    width: "150px",
    render: (value) => <div className="font-medium text-gray-900">{value}</div>,
  },
  {
    key: "addressDelivery",
    title: i18nText("AUTO.components.ordermanagement.ordercolumns.line82_2_dia_chi_giao_hang"),
    width: "200px",
    render: (value) => (
      <div className="text-sm text-gray-600 max-w-xs truncate" title={value}>
        {value}
      </div>
    ),
  },
  {
    key: "phoneDelivery",
    title: i18nText("AUTO.components.ordermanagement.ordercolumns.line92_3_sdt"),
    width: "120px",
    render: (value) => <div className="text-sm font-mono">{value}</div>,
  },
  {
    key: "emailDelivery",
    title: i18nText("AUTO.components.ordermanagement.ordercolumns.extra99_6_email"),
    width: "180px",
    render: (value) => (
      <div className="text-sm text-blue-600 max-w-xs truncate" title={value}>
        {value}
      </div>
    ),
  },

  {
    key: "dateOrder",
    title: i18nText("AUTO.components.ordermanagement.ordercolumns.line109_4_ngay_dat"),
    sortable: true,
    width: "140px",
    render: (value) => <div className="text-sm text-gray-600">{value}</div>,
  },

  {
    key: "status",
    title: i18nText("AUTO.components.ordermanagement.ordercolumns.line117_5_trang_thai"),
    sortable: true,
    width: "130px",
    align: "center",
    render: (value: OrderStatus) => <StatusBadge status={value} />,
  },
  {
    key: "action",
    title: i18nText("AUTO.components.ordermanagement.ordercolumns.line125_6_thao_tac"),
    width: "110px",
    align: "center",
    render: (_, record) => (
      <Link
        href={`/tai-khoan/quan-ly-don-hang/${record.id}`}
        aria-label={i18nText("AUTO.components.ordermanagement.ordercolumns.line131_7_xem_chi_tiet_don_hang", { value0: record.orderCode })}
        className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
      >{i18nText("AUTO.components.ordermanagement.ordercolumns.line134_8_xem_chi_tiet")}</Link>
    ),
  },
];

