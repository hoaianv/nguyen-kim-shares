import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Giải pháp cho doanh nghiệp | ${name}`,
  description: `Cung cấp các giải pháp công nghệ, thiết bị điện máy và dịch vụ B2B chuyên nghiệp dành cho doanh nghiệp từ ${name}. Tối ưu hóa vận hành và chi phí.`,
  alternates: {
    canonical: `${urlWebsite}giai-phap-cho-doanh-nghiep`,
  },
  openGraph: {
    title: `Giải pháp cho doanh nghiệp | ${name}`,
    description: `Giải pháp toàn diện cho doanh nghiệp: Điện máy, công nghệ, dự án và quà tặng doanh nghiệp từ ${name}.`,
    url: `${urlWebsite}giai-phap-cho-doanh-nghiep`,
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
