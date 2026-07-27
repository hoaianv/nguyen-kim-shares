import {
  address,
  hotline,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Liên hệ và góp ý | ${name}`,
  description: `Liên hệ ${name} qua hotline ${hotline} hoặc ghé địa chỉ ${address} để được tư vấn và hỗ trợ.`,
  alternates: {
    canonical: `${urlWebsite}lien-he`,
  },
  openGraph: {
    title: `Liên hệ và góp ý | ${name}`,
    description:
      "Gửi góp ý hoặc liên hệ trực tiếp với " +
      name +
      " để nhận hỗ trợ nhanh chóng.",
    url: `${urlWebsite}lien-he`,
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
