import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Xây dựng cấu hình | ${name}`,
  description: `Tự chọn linh kiện và xây dựng cấu hình PC phù hợp nhu cầu tại ${name}.`,
  alternates: {
    canonical: `${urlWebsite}xay-dung-cau-hinh`,
  },
  openGraph: {
    title: `Xây dựng cấu hình | ${name}`,
    description: "Công cụ chọn linh kiện và lắp ráp cấu hình PC tại " + name,
    url: `${urlWebsite}xay-dung-cau-hinh`,
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
