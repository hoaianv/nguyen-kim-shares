import { i18nText } from "@/lib/i18nText";
import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.giai.phap.doanh.nghiep.line5_0_giai_phap_doanh_nghiep", { value0: name }),
  description: i18nText("AUTO.app.giai.phap.doanh.nghiep.line6_1_cung_cap_cac_giai_phap", { value0: name }),
  alternates: {
    canonical: `${urlWebsite}giai-phap-cho-doanh-nghiep`,
  },
  openGraph: {
    title: i18nText("AUTO.app.giai.phap.doanh.nghiep.line11_2_giai_phap_doanh_nghiep", { value0: name }),
    description: i18nText("AUTO.app.giai.phap.doanh.nghiep.line12_3_giai_phap_toan_dien_doanh", { value0: name }),
    url: `${urlWebsite}giai-phap-cho-doanh-nghiep`,
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
