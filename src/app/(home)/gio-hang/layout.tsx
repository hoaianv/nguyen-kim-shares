import { i18nText } from "@/lib/i18nText";
import { name, urlWebsite } from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.gio.hang.line5_0_gio_hang", { value0: name }),
  description:
    i18nText("AUTO.app.gio.hang.line7_1_xem_quan_ly_cac_san") +
    name,
  alternates: {
    canonical: `${urlWebsite}gio-hang`,
  },
  openGraph: {
    title: i18nText("AUTO.app.gio.hang.line13_2_gio_hang", { value0: name }),
    description: i18nText("AUTO.app.gio.hang.line14_3_gio_hang_mua_sam") + name,
    url: `${urlWebsite}gio-hang`,
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
