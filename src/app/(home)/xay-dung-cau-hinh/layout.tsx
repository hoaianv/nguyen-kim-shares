import { i18nText } from "@/lib/i18nText";
import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.xay.dung.cau.hinh.line5_0_xay_dung_cau_hinh", { value0: name }),
  description: i18nText("AUTO.app.xay.dung.cau.hinh.line6_1_tu_chon_linh_kien_xay", { value0: name }),
  alternates: {
    canonical: `${urlWebsite}xay-dung-cau-hinh`,
  },
  openGraph: {
    title: i18nText("AUTO.app.xay.dung.cau.hinh.line11_2_xay_dung_cau_hinh", { value0: name }),
    description: i18nText("AUTO.app.xay.dung.cau.hinh.line12_3_cong_cu_chon_linh_kien") + name,
    url: `${urlWebsite}xay-dung-cau-hinh`,
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
