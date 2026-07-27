import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Tin tức | ${name}`,
  description: `Cập nhật tin tức công nghệ, khuyến mãi và sự kiện mới nhất từ ${name}.`,
  alternates: {
    canonical: `${urlWebsite}tin-tuc`,
  },
  openGraph: {
    title: `Tin tức | ${name}`,
    description: "Tin tức, bài viết và sự kiện nổi bật từ " + name,
    url: `${urlWebsite}tin-tuc`,
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
