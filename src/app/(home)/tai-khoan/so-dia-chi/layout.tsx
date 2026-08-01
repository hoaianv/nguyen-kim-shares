import { i18nText } from "@/lib/i18nText";
import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.khoan.so.dia.chi.line5_0_so_dia_chi", { value0: name }),
  description: i18nText("AUTO.app.khoan.so.dia.chi.line6_1_quan_ly_cap_nhat_dia", { value0: name }),
  alternates: {
    canonical: `${urlWebsite}so-dia-chi`,
  },
  openGraph: {
    title: i18nText("AUTO.app.khoan.so.dia.chi.line11_2_so_dia_chi", { value0: name }),
    description: i18nText("AUTO.app.khoan.so.dia.chi.line12_3_danh_sach_quan_ly_dia") + name,
    url: `${urlWebsite}so-dia-chi`,
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
