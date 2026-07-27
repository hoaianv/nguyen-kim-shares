import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Xác nhận thanh toán | ${name}`,
  description: `Xác nhận đơn hàng và hướng dẫn thanh toán chi tiết tại ${name}. Theo dõi tình trạng đơn hàng và nhận thông tin chuyển khoản.`,
  alternates: {
    canonical: `${urlWebsite}xac-nhan-thanh-toan`,
  },
  openGraph: {
    title: `Xác nhận thanh toán | ${name}`,
    description: `Đơn hàng đã được xác nhận thành công. Vui lòng kiểm tra email và thực hiện thanh toán theo hướng dẫn tại ${name}`,
    url: `${urlWebsite}xac-nhan-thanh-toan`,
    siteName: name,
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="">{children}</div>;
}
