import { i18nText } from "@/lib/i18nText";
import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.khoan.quan.ly.don.line5_0_chi_tiet_don_hang", { value0: name }),
  description: i18nText("AUTO.app.khoan.quan.ly.don.line6_1_xem_chi_tiet_don_hang", { value0: name }),
  alternates: {
    canonical: `${urlWebsite}chi-tiet-don-hang`,
  },
  openGraph: {
    title: i18nText("AUTO.app.khoan.quan.ly.don.line11_2_chi_tiet_don_hang", { value0: name }),
    description:
      i18nText("AUTO.app.khoan.quan.ly.don.line13_3_thong_tin_chi_tiet_don") + name,
    url: `${urlWebsite}chi-tiet-don-hang`,
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
