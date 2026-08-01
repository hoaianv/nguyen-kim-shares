import { i18nText } from "@/lib/i18nText";
import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.tu.van.line5_0_tu_van", { value0: name }),
  description: i18nText("AUTO.app.tu.van.line6_1_nhan_cac_bai_viet_tu", { value0: name }),
  alternates: {
    canonical: `${urlWebsite}tu-van`,
  },
  openGraph: {
    title: i18nText("AUTO.app.tu.van.line11_2_tu_van", { value0: name }),
    description:
      i18nText("AUTO.app.tu.van.line13_3_chuyen_muc_tu_van_chon") + name,
    url: `${urlWebsite}tu-van`,
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
