import { i18nText } from "@/lib/i18nText";
import {
  address,
  hotline,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.san.pham.line10_0_trang_san_pham", { value0: name }),
  description: i18nText("AUTO.app.san.pham.line11_1_xem_toan_bo_san_pham", { value0: name, value1: hotline }),
  alternates: { canonical: `${urlWebsite}san-pham` },
  openGraph: {
    title: i18nText("AUTO.app.san.pham.line14_2_tat_ca_san_pham_danh", { value0: name }),
    description: i18nText("AUTO.app.san.pham.line15_3_duyet_toan_bo_san_pham", { value0: name }),
    url: `${urlWebsite}san-pham`,
    siteName: name,
    type: "website",
  },
  keywords: [i18nText("AUTO.app.san.pham.extra21_0_tat_ca_san_pham"), i18nText("AUTO.app.san.pham.extra21_1_danh_muc_san_pham"), name],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
