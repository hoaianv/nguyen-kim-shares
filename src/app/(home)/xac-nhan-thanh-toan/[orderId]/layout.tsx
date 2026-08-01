import { i18nText } from "@/lib/i18nText";
import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.xac.nhan.thanh.toan.line5_0_xac_nhan_thanh_toan", { value0: name }),
  description: i18nText("AUTO.app.xac.nhan.thanh.toan.line6_1_xac_nhan_don_hang_huong", { value0: name }),
  alternates: {
    canonical: `${urlWebsite}xac-nhan-thanh-toan`,
  },
  openGraph: {
    title: i18nText("AUTO.app.xac.nhan.thanh.toan.line11_2_xac_nhan_thanh_toan", { value0: name }),
    description: i18nText("AUTO.app.xac.nhan.thanh.toan.line12_3_don_hang_da_duoc_xac", { value0: name }),
    url: `${urlWebsite}xac-nhan-thanh-toan`,
    siteName: name,
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="">{children}</div>;
}
