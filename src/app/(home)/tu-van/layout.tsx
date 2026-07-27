import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Tư vấn | ${name}`,
  description: `Nhận các bài viết tư vấn mua sắm và sử dụng thiết bị công nghệ từ ${name}.`,
  alternates: {
    canonical: `${urlWebsite}tu-van`,
  },
  openGraph: {
    title: `Tư vấn | ${name}`,
    description:
      "Chuyên mục tư vấn chọn mua và sử dụng sản phẩm công nghệ tại " + name,
    url: `${urlWebsite}tu-van`,
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
