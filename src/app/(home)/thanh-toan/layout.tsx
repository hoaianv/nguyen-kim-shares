import { i18nText } from "@/lib/i18nText";
import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.thanh.toan.line5_0_thanh_toan", { value0: name }),
  description: i18nText("AUTO.app.thanh.toan.line6_1_hoan_tat_don_hang_thanh", { value0: name }),
  alternates: {
    canonical: `${urlWebsite}thanh-toan`,
  },
  openGraph: {
    title: i18nText("AUTO.app.thanh.toan.line11_2_thanh_toan", { value0: name }),
    description: i18nText("AUTO.app.thanh.toan.line12_3_trang_thanh_toan_don_hang") + name,
    url: `${urlWebsite}thanh-toan`,
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
