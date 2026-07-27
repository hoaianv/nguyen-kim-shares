import {
  descriptionCompany,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Tuyển dụng | ${name}`,
  description: `${descriptionCompany} – Cơ hội việc làm trong lĩnh vực công nghệ, gia nhập đội ngũ và cùng phát triển sự nghiệp.`,
  alternates: {
    canonical: `${urlWebsite}tuyen-dung`,
  },
  openGraph: {
    title: `Tuyển dụng | ${name}`,
    description: "Khám phá các vị trí tuyển dụng hấp dẫn tại " + name,
    url: `${urlWebsite}tuyen-dung`,
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
