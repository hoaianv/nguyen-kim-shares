import { i18nText } from "@/lib/i18nText";
import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.khoan.quan.ly.don.line5_0_quan_ly_don_hang", { value0: name }),
  description: i18nText("AUTO.app.khoan.quan.ly.don.line6_1_theo_doi_quan_ly_don", { value0: name }),
  alternates: {
    canonical: `${urlWebsite}quan-ly-don-hang`,
  },
  openGraph: {
    title: i18nText("AUTO.app.khoan.quan.ly.don.line11_2_quan_ly_don_hang", { value0: name }),
    description: i18nText("AUTO.app.khoan.quan.ly.don.line12_3_xem_chi_tiet_quan_ly") + name,
    url: `${urlWebsite}quan-ly-don-hang`,
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
