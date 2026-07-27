import {
  descriptionCompany,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Đăng ký | ${name}`,
  description: `${descriptionCompany} – Đăng ký tài khoản để mua sắm laptop, PC và thiết bị công nghệ chính hãng với nhiều ưu đãi.`,
  alternates: {
    canonical: `${urlWebsite}dang-ky`,
  },
  openGraph: {
    title: `Đăng ký | ${name}`,
    description:
      "Tạo tài khoản mới tại " +
      name +
      " để trải nghiệm dịch vụ và nhận ưu đãi độc quyền.",
    url: `${urlWebsite}dang-ky`,
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
