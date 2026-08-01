import { i18nText } from "@/lib/i18nText";
import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.khoan.san.pham.da.line5_0_san_pham_da_xem", { value0: name }),
  description: i18nText("AUTO.app.khoan.san.pham.da.line6_1_xem_lai_cac_san_pham", { value0: name }),
  alternates: {
    canonical: `${urlWebsite}san-pham-da-xem`,
  },
  openGraph: {
    title: i18nText("AUTO.app.khoan.san.pham.da.line11_2_san_pham_da_xem", { value0: name }),
    description: i18nText("AUTO.app.khoan.san.pham.da.line12_3_danh_sach_san_pham_da") + name,
    url: `${urlWebsite}san-pham-da-xem`,
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
