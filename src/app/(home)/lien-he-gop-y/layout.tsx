import { i18nText } from "@/lib/i18nText";
import {
  address,
  hotline,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.lien.he.gop.y.line10_0_lien_he_gop_y", { value0: name }),
  description: i18nText("AUTO.app.lien.he.gop.y.line11_1_lien_he_qua_hotline_hoac", { value0: name, value1: hotline, value2: address }),
  alternates: {
    canonical: `${urlWebsite}lien-he`,
  },
  openGraph: {
    title: i18nText("AUTO.app.lien.he.gop.y.line16_2_lien_he_gop_y", { value0: name }),
    description:
      i18nText("AUTO.app.lien.he.gop.y.line18_3_gui_gop_y_hoac_lien") +
      name +
      i18nText("AUTO.app.lien.he.gop.y.line20_4_nhan_ho_tro_nhanh_chong"),
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
