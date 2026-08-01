import { i18nText } from "@/lib/i18nText";
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
  pending: i18nText("AUTO.constants.index.extra169_0_xu_ly"),
  payment: i18nText("AUTO.constants.index.extra170_1_thanh_toan"),
  paid: i18nText("AUTO.constants.index.extra171_2_da_thanh_toan"),
  delivered: i18nText("AUTO.constants.index.extra172_3_dang_giao_hang"),
  finished: i18nText("AUTO.constants.index.extra173_4_da_hoan_tat"),
  fail: i18nText("AUTO.constants.index.extra174_5_da_huy_bo"),
  "customer-cancels": i18nText("AUTO.constants.index.extra175_6_khach_hang_huy_bo"),
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
    title: i18nText("AUTO.constants.index.line190_0_cau_hinh_1"),
  },
  {
    id: 2,
    title: i18nText("AUTO.constants.index.line194_1_cau_hinh_2"),
  },
  {
    id: 3,
    title: i18nText("AUTO.constants.index.line198_2_cau_hinh_3"),
  },
];

export const sortFilter = [
  { id: 1, title: i18nText("AUTO.constants.index.line203_3_chay"), value: "ASC", key: "view" },
  { id: 2, title: i18nText("AUTO.constants.index.line204_4_gia_tang_dan"), value: "ASC", key: "price" },
  { id: 3, title: i18nText("AUTO.constants.index.line205_5_gia_giam_dan"), value: "DESC", key: "price" },
];

export const metaNotFound = {
  title: i18nText("AUTO.constants.index.line209_6_404_not_found"),
  description: i18nText("AUTO.constants.index.line210_7_trang_dang_tim_khong_ton"),
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

export const classPost = i18nText("AUTO.constants.index.extra226_7_prose_prose_sm_sm_prose");

export const classDetailPost = i18nText("AUTO.constants.index.extra239_8_prose_prose_sm_sm_prose");

export const EMPTY_PAGINATION = {
  currentPage: 1,
  lastPage: 1,
  total: 0,
  perPage: 10,
};
