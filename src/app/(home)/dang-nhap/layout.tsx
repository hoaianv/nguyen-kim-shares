import {
  descriptionCompany,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Đăng nhập | ${name}`,
  description: `${descriptionCompany} – Đăng nhập tài khoản để tiếp tục mua sắm laptop, PC và thiết bị công nghệ chính hãng.`,
  alternates: {
    canonical: `${urlWebsite}login`,
  },
  openGraph: {
    title: `Đăng nhập | ${name}`,
    description:
      "Đăng nhập vào " +
      name +
      " để quản lý đơn hàng và trải nghiệm dịch vụ nhanh chóng.",
    url: `${urlWebsite}login`,
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
