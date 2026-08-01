import { i18nText } from "@/lib/i18nText";
import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.yeu.cau.bao.gia.line5_0_yeu_cau_bao_gia", { value0: name }),
  description: i18nText("AUTO.app.yeu.cau.bao.gia.line6_1_gui_yeu_cau_bao_gia", { value0: name }),
  alternates: {
    canonical: `${urlWebsite}yeu-cau-bao-gia`,
  },
  openGraph: {
    title: i18nText("AUTO.app.yeu.cau.bao.gia.line11_2_yeu_cau_bao_gia", { value0: name }),
    description: i18nText("AUTO.app.yeu.cau.bao.gia.line12_3_trang_gui_yeu_cau_bao") + name,
    url: `${urlWebsite}yeu-cau-bao-gia`,
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
