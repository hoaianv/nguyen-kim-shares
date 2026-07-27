import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Chi tiết đơn hàng | ${name}`,
  description: `Xem chi tiết đơn hàng đã mua tại ${name}, bao gồm sản phẩm, giá và trạng thái giao hàng.`,
  alternates: {
    canonical: `${urlWebsite}chi-tiet-don-hang`,
  },
  openGraph: {
    title: `Chi tiết đơn hàng | ${name}`,
    description:
      "Thông tin chi tiết đơn hàng và trạng thái giao hàng tại " + name,
    url: `${urlWebsite}chi-tiet-don-hang`,
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
