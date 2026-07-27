import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Quản lý đơn hàng | ${name}`,
  description: `Theo dõi và quản lý đơn hàng đã mua tại ${name}. Xem trạng thái giao hàng và lịch sử mua sắm của bạn.`,
  alternates: {
    canonical: `${urlWebsite}quan-ly-don-hang`,
  },
  openGraph: {
    title: `Quản lý đơn hàng | ${name}`,
    description: "Xem chi tiết và quản lý đơn hàng của bạn tại " + name,
    url: `${urlWebsite}quan-ly-don-hang`,
    siteName: name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
