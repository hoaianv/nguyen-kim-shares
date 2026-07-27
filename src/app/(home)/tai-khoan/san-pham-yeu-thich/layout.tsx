import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sản phẩm yêu thích | ${name}`,
  description: `Xem và quản lý danh sách sản phẩm yêu thích tại ${name}, dễ dàng mua sắm và theo dõi ưu đãi.`,
  alternates: {
    canonical: `${urlWebsite}san-pham-yeu-thich`,
  },
  openGraph: {
    title: `Sản phẩm yêu thích | ${name}`,
    description: "Danh sách sản phẩm bạn đã thêm vào yêu thích tại " + name,
    url: `${urlWebsite}san-pham-yeu-thich`,
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
