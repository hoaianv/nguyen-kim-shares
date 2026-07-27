import {
  address,
  hotline,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Trang sản phẩm | ${name}`,
  description: `Xem toàn bộ sản phẩm và tất cả danh mục tại ${name}. Giá tốt, giao nhanh. Hotline ${hotline}.`,
  alternates: { canonical: `${urlWebsite}san-pham` },
  openGraph: {
    title: `Tất cả sản phẩm & Danh mục | ${name}`,
    description: `Duyệt toàn bộ sản phẩm và danh mục tại ${name}.`,
    url: `${urlWebsite}san-pham`,
    siteName: name,
    type: "website",
  },
  keywords: ["tất cả sản phẩm", "danh mục sản phẩm", name],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
