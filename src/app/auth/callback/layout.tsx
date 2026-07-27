import {
  descriptionCompany,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Xử lý đăng nhập Google | ${name}`,
  description: `${descriptionCompany} – Đang xử lý đăng nhập Google, vui lòng đợi trong giây lát...`,
  alternates: {
    canonical: `${urlWebsite}auth/google/callback`,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Đang xử lý đăng nhập Google | ${name}`,
    description: `Trang trung gian xử lý xác thực Google của ${name}.`,
    url: `${urlWebsite}auth/google/callback`,
    siteName: name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Đang xử lý đăng nhập Google | ${name}`,
    description: `Trang trung gian xác thực Google của ${name}.`,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="">{children}</div>;
}
