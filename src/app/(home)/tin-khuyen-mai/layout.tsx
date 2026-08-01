import { i18nText } from "@/lib/i18nText";
import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.tin.khuyen.mai.line5_0_tin_tuc", { value0: name }),
  description: i18nText("AUTO.app.tin.khuyen.mai.line6_1_cap_nhat_tin_tuc_cong", { value0: name }),
  alternates: {
    canonical: `${urlWebsite}tin-tuc`,
  },
  openGraph: {
    title: i18nText("AUTO.app.tin.khuyen.mai.line11_2_tin_tuc", { value0: name }),
    description: i18nText("AUTO.app.tin.khuyen.mai.line12_3_tin_tuc_bai_viet_su") + name,
    url: `${urlWebsite}tin-tuc`,
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
