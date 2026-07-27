import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sản phẩm đã xem | ${name}`,
  description: `Xem lại các sản phẩm công nghệ bạn đã xem tại ${name}, dễ dàng so sánh và chọn mua.`,
  alternates: {
    canonical: `${urlWebsite}san-pham-da-xem`,
  },
  openGraph: {
    title: `Sản phẩm đã xem | ${name}`,
    description: "Danh sách sản phẩm bạn đã xem gần đây tại " + name,
    url: `${urlWebsite}san-pham-da-xem`,
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
