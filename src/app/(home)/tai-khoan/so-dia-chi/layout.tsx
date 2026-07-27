import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sổ địa chỉ | ${name}`,
  description: `Quản lý và cập nhật địa chỉ giao hàng, địa chỉ thanh toán trong tài khoản của bạn tại ${name}.`,
  alternates: {
    canonical: `${urlWebsite}so-dia-chi`,
  },
  openGraph: {
    title: `Sổ địa chỉ | ${name}`,
    description: "Danh sách và quản lý địa chỉ cá nhân của bạn tại " + name,
    url: `${urlWebsite}so-dia-chi`,
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
