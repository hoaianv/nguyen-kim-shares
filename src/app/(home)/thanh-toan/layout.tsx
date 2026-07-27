import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Thanh toán | ${name}`,
  description: `Hoàn tất đơn hàng và thanh toán an toàn tại ${name}. Hỗ trợ nhiều phương thức thanh toán tiện lợi.`,
  alternates: {
    canonical: `${urlWebsite}thanh-toan`,
  },
  openGraph: {
    title: `Thanh toán | ${name}`,
    description: "Trang thanh toán đơn hàng nhanh chóng và an toàn tại " + name,
    url: `${urlWebsite}thanh-toan`,
    siteName: name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="">{children}</div>;
}
