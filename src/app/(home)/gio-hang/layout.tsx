import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Giỏ hàng | ${name}`,
  description:
    "Xem và quản lý các sản phẩm trong giỏ hàng của bạn trước khi đặt mua tại " +
    name,
  alternates: {
    canonical: `${urlWebsite}gio-hang`,
  },
  openGraph: {
    title: `Giỏ hàng | ${name}`,
    description: "Giỏ hàng mua sắm tại " + name,
    url: `${urlWebsite}gio-hang`,
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
