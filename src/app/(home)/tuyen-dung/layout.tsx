import { urlWebsite } from "@/constants/company.constant";
import { recruitmentCompanyName } from "@/lib/recruitmentCompanyName";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Tuyển dụng | ${recruitmentCompanyName}`,
  description: `${recruitmentCompanyName} – Cơ hội việc làm trong lĩnh vực công nghệ, gia nhập đội ngũ và cùng phát triển sự nghiệp.`,
  alternates: {
    canonical: `${urlWebsite}tuyen-dung`,
  },
  openGraph: {
    title: `Tuyển dụng | ${recruitmentCompanyName}`,
    description: `Khám phá các vị trí tuyển dụng hấp dẫn tại ${recruitmentCompanyName}`,
    url: `${urlWebsite}tuyen-dung`,
    siteName: recruitmentCompanyName,
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
