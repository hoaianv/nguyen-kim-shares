import { logout as logoutApi } from "@/apis/common/auth.apis";
import {
  AuthItem,
  CartItem,
  NotificationItem,
} from "@/components/header/ItemsHeader";
import {
  AuthPopup,
  CartPopup,
  ContactPopup,
  NotificationPopup,
} from "@/components/header/PopupHeader";
import { MenuItem, NavAccountLinkItem } from "@/interfaces/common";
import { OrderStatus } from "@/interfaces/models/IOrder.interface";

import {
  Tag,
  Cpu,
  Newspaper,
  Contact,
  Hammer,
  Briefcase,
  Settings,
  UserRound,
  Bell,
  ShoppingCart,
  LucideIcon,
  FileText,
  Package,
  MapPin,
  Eye,
  Heart,
  LogOut,
  ShoppingBasket,
} from "lucide-react";

type MenuItemI18n = Omit<MenuItem, "label"> & { labelKey: string };
export type HeaderItemI18n = Omit<MenuItem, "label"> & { labelKey: string };
type NavAccountLinkItemI18n = Omit<NavAccountLinkItem, "label"> & {
  labelKey: string;
};

export const MENU_ITEMS: MenuItemI18n[] = [
  {
    labelKey: "HEADER.promotion_news",
    value: "promotion_news",
    link: "/tin-khuyen-mai",
    icon: Tag,
  },
  {
    labelKey: "HEADER.product_page",
    value: "product_page",
    link: "/san-pham",
    icon: ShoppingBasket,
  },
  {
    labelKey: "HEADER.pc_builder",
    value: "pc_builder",
    link: "/xay-dung-cau-hinh",
    icon: Settings,
  },
  // {
  //   labelKey: "HEADER.tech_news",
  //   value: "tech_news",
  //   link: "/tin-tuc?danh-muc=tin-cong-nghe",
  //   icon: Cpu,
  // },
  {
    labelKey: "HEADER.business_solutions",
    value: "business_solutions",
    link: "/giai-phap-cho-doanh-nghiep",
    icon: Briefcase,
  },

  { labelKey: "HEADER.news", value: "news", link: "/tin-tuc", icon: Newspaper },
  {
    labelKey: "HEADER.contact",
    value: "contact",
    hasPopup: true,
    icon: Contact,
    renderPopup: () => <ContactPopup />,
  },
  // {
  //   labelKey: "HEADER.services",
  //   value: "services",
  //   link: "/dich-vu",
  //   icon: Hammer,
  // },
  {
    labelKey: "HEADER.careers",
    value: "careers",
    link: "/tuyen-dung",
    icon: Briefcase,
  },
];

export const HEADER_ITEMS: HeaderItemI18n[] = [
  {
    labelKey: "HEADER.auth",
    value: "auth",
    icon: UserRound,
    hasPopup: true,
    renderPopup: () => <AuthPopup />,
    renderItem: () => <AuthItem />,
  },
  {
    labelKey: "HEADER.notifications",
    value: "notifications",
    hasPopup: true,
    icon: Bell,
    renderPopup: () => <NotificationPopup />,
    renderItem: () => <NotificationItem />,
  },
  {
    labelKey: "HEADER.cart",
    value: "cart",
    link: "/gio-hang",
    hasPopup: true,
    icon: ShoppingCart,
    renderPopup: () => <CartPopup />,
    renderItem: () => <CartItem />,
  },
];

export const ICONS: Record<string, LucideIcon> = {
  FileText,
  Package,
  Eye,
  MapPin,
  Heart,
  LogOut,
};

export const ACCOUNT_LINKS: NavAccountLinkItemI18n[] = [
  {
    key: "profile",
    labelKey: "ACCOUNT.personal_info",
    href: "/tai-khoan",
    icon: "FileText",
  },
  {
    key: "orders",
    labelKey: "ACCOUNT.order_management",
    href: "/tai-khoan/quan-ly-don-hang",
    icon: "Package",
  },
  {
    key: "viewed",
    labelKey: "ACCOUNT.viewed_products",
    href: "/tai-khoan/san-pham-da-xem",
    icon: "Eye",
  },
  {
    key: "addresses",
    labelKey: "ACCOUNT.address_book",
    href: "/tai-khoan/so-dia-chi",
    icon: "MapPin",
  },
  {
    key: "wishlist",
    labelKey: "ACCOUNT.favorite_products",
    href: "/tai-khoan/san-pham-yeu-thich",
    icon: "Heart",
  },
];

export const ORDER_STATUS_LABEL: Record<string, string> = {
  pending: "Chờ xử lý",
  payment: "Chờ thanh toán",
  paid: "Đã thanh toán",
  delivered: "Đang giao hàng",
  finished: "Đã hoàn tất",
  fail: "Đã hủy bỏ",
  "customer-cancels": "Khách hàng hủy bỏ",
};

export const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  payment: "bg-yellow-50 text-yellow-700 ring-yellow-200",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  delivered: "bg-sky-50 text-sky-700 ring-sky-200",
  finished: "bg-green-50 text-green-700 ring-green-200",
  fail: "bg-rose-50 text-rose-700 ring-rose-200",
  "customer-cancels": "bg-gray-100 text-gray-700 ring-gray-200",
};

export const configuration = [
  {
    id: 1,
    title: "Cấu hình 1",
  },
  {
    id: 2,
    title: "Cấu hình 2",
  },
  {
    id: 3,
    title: "Cấu hình 3",
  },
];

export const sortFilter = [
  { id: 1, title: "Bán chạy", value: "ASC", key: "view" },
  { id: 2, title: "Giá tăng dần", value: "ASC", key: "price" },
  { id: 3, title: "Giá giảm dần", value: "DESC", key: "price" },
];

export const metaNotFound = {
  title: "404 - Not Found",
  description: "Trang bạn đang tìm không tồn tại hoặc đã bị xóa.",
  robots: {
    index: false,
    follow: false,
  },
};

export const ALLOWED_DOCS = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const ALLOWED_IMAGES = ["image/jpeg", "image/png", "image/gif"];
export const MAX_5MB = 5 * 1024 * 1024;

export const classPost = `prose 
    prose-sm sm:prose md:prose-lg
    !max-w-none
    prose-headings:text-gray-900
    prose-p:text-gray-700 prose-p:leading-relaxed
    prose-img:w-full prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto
    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline

    /* Thêm tối ưu gọn */
    overflow-x-auto md:overflow-visible break-words
    prose-pre:overflow-x-auto
    [&_table]:w-full [&_table]:min-w-[640px] [&_th]:text-left [&_td]:align-top`;

export const classDetailPost = `prose 
  prose-sm sm:prose md:prose-lg
  !max-w-none
  prose-headings:text-gray-900
  prose-p:text-gray-700 prose-p:leading-relaxed

  /* Ảnh & iframe responsive - ảnh luôn nằm giữa */
  prose-img:w-full prose-img:h-auto prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto
  [&_iframe]:w-full [&_iframe]:h-auto [&_iframe]:aspect-video

  /* Link */
  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline

  /* Tối ưu hiển thị & cuộn ngang khi nội dung rộng */
  break-words
  prose-pre:overflow-x-auto

  /* Table: rộng tối thiểu và cho phép scroll ngang trên màn nhỏ */
  [&_table]:block [&_table]:w-full [&_table]:min-w-[640px] [&_table]:overflow-x-auto
  [&_th]:text-left [&_td]:align-top
  [&_th]:p-2 [&_td]:p-2
  [&_thead]:bg-gray-50 [&_tbody_tr:nth-child(even)]:bg-gray-50/40
`;

export const EMPTY_PAGINATION = {
  currentPage: 1,
  lastPage: 1,
  total: 0,
  perPage: 10,
};
