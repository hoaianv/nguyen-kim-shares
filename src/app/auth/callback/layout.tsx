import { i18nText } from "@/lib/i18nText";
import {
  descriptionCompany,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.auth.callback.line9_0_xu_ly_dang_nhap_google", { value0: name }),
  description: i18nText("AUTO.app.auth.callback.line10_1_dang_xu_ly_dang_nhap", { value0: descriptionCompany }),
  alternates: {
    canonical: `${urlWebsite}auth/google/callback`,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: i18nText("AUTO.app.auth.callback.line19_2_dang_xu_ly_dang_nhap", { value0: name }),
    description: i18nText("AUTO.app.auth.callback.line20_3_trang_trung_gian_xu_ly", { value0: name }),
    url: `${urlWebsite}auth/google/callback`,
    siteName: name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: i18nText("AUTO.app.auth.callback.line27_4_dang_xu_ly_dang_nhap", { value0: name }),
    description: i18nText("AUTO.app.auth.callback.line28_5_trang_trung_gian_xac_thuc", { value0: name }),
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="">{children}</div>;
}
