import { urlWebsite } from "@/constants/company.constant";
import { i18nText } from "@/lib/i18nText";
import { recruitmentCompanyName } from "@/lib/recruitmentCompanyName";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.tuyen.dung.line9_0_tuyen_dung", {
    value0: recruitmentCompanyName,
  }),
  description: i18nText("AUTO.app.tuyen.dung.line10_1_hoi_viec_lam_linh_vuc", {
    value0: recruitmentCompanyName,
  }),
  alternates: {
    canonical: `${urlWebsite}tuyen-dung`,
  },
  openGraph: {
    title: i18nText("AUTO.app.tuyen.dung.line15_2_tuyen_dung", {
      value0: recruitmentCompanyName,
    }),
    description: `${i18nText("AUTO.app.tuyen.dung.line16_3_kham_pha_cac_vi_tri")} ${recruitmentCompanyName}`,
    url: `${urlWebsite}tuyen-dung`,
    siteName: recruitmentCompanyName,
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
