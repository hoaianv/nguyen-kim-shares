"use client";

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
        return "Chờ xử lý";
      case "CONFIRMED":
        return "Đã xác nhận";
      case "PROCESSING":
        return "Đang xử lý";
      case "SHIPPED":
        return "Đã gửi";
      case "DELIVERED":
        return "Đã giao";
      case "CANCELLED":
        return "Đã hủy";
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
    title: "Mã đơn hàng",
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
    title: "Người nhận",
    sortable: true,
    width: "150px",
    render: (value) => <div className="font-medium text-gray-900">{value}</div>,
  },
  {
    key: "addressDelivery",
    title: "Địa chỉ giao hàng",
    width: "200px",
    render: (value) => (
      <div className="text-sm text-gray-600 max-w-xs truncate" title={value}>
        {value}
      </div>
    ),
  },
  {
    key: "phoneDelivery",
    title: "SĐT",
    width: "120px",
    render: (value) => <div className="text-sm font-mono">{value}</div>,
  },
  {
    key: "emailDelivery",
    title: "Email",
    width: "180px",
    render: (value) => (
      <div className="text-sm text-blue-600 max-w-xs truncate" title={value}>
        {value}
      </div>
    ),
  },

  {
    key: "dateOrder",
    title: "Ngày đặt",
    sortable: true,
    width: "140px",
    render: (value) => <div className="text-sm text-gray-600">{value}</div>,
  },

  {
    key: "status",
    title: "Trạng thái",
    sortable: true,
    width: "130px",
    align: "center",
    render: (value: OrderStatus) => <StatusBadge status={value} />,
  },
  {
    key: "action",
    title: "Thao tác",
    width: "110px",
    align: "center",
    render: (_, record) => (
      <Link
        href={`/tai-khoan/quan-ly-don-hang/${record.id}`}
        aria-label={`Xem chi tiết đơn hàng ${record.orderCode}`}
        className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
      >
        Xem chi tiết
      </Link>
    ),
  },
];

