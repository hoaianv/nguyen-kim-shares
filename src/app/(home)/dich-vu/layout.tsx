import {
  descriptionCompany,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dịch vụ | ${name}`,
  description: descriptionCompany,
  alternates: {
    canonical: `${urlWebsite}dich-vu`,
  },
  openGraph: {
    title: `Dịch vụ | ${name}`,
    description: descriptionCompany,
    url: `${urlWebsite}dich-vu`,
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
