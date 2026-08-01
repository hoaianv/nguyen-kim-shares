import { i18nText } from "@/lib/i18nText";
import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.khoan.san.pham.yeu.line5_0_san_pham_yeu_thich", { value0: name }),
  description: i18nText("AUTO.app.khoan.san.pham.yeu.line6_1_xem_quan_ly_danh_sach", { value0: name }),
  alternates: {
    canonical: `${urlWebsite}san-pham-yeu-thich`,
  },
  openGraph: {
    title: i18nText("AUTO.app.khoan.san.pham.yeu.line11_2_san_pham_yeu_thich", { value0: name }),
    description: i18nText("AUTO.app.khoan.san.pham.yeu.line12_3_danh_sach_san_pham_da") + name,
    url: `${urlWebsite}san-pham-yeu-thich`,
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
