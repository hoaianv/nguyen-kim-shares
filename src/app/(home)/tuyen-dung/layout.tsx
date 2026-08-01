import { i18nText } from "@/lib/i18nText";
import {
  descriptionCompany,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.tuyen.dung.line9_0_tuyen_dung", { value0: name }),
  description: i18nText("AUTO.app.tuyen.dung.line10_1_hoi_viec_lam_linh_vuc", { value0: descriptionCompany }),
  alternates: {
    canonical: `${urlWebsite}tuyen-dung`,
  },
  openGraph: {
    title: i18nText("AUTO.app.tuyen.dung.line15_2_tuyen_dung", { value0: name }),
    description: i18nText("AUTO.app.tuyen.dung.line16_3_kham_pha_cac_vi_tri") + name,
    url: `${urlWebsite}tuyen-dung`,
    siteName: name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="">{children}</div>;
}
