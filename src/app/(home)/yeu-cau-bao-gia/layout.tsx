import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Yêu cầu báo giá | ${name}`,
  description: `Gửi yêu cầu báo giá sản phẩm và dịch vụ công nghệ tại ${name}. Nhận phản hồi nhanh chóng và chi tiết.`,
  alternates: {
    canonical: `${urlWebsite}yeu-cau-bao-gia`,
  },
  openGraph: {
    title: `Yêu cầu báo giá | ${name}`,
    description: "Trang gửi yêu cầu báo giá trực tiếp tới " + name,
    url: `${urlWebsite}yeu-cau-bao-gia`,
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
