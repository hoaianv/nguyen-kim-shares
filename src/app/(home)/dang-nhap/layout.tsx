import { i18nText } from "@/lib/i18nText";
import {
  descriptionCompany,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.dang.nhap.line9_0_dang_nhap", { value0: name }),
  description: i18nText("AUTO.app.dang.nhap.line10_1_dang_nhap_khoan_tiep_tuc", { value0: descriptionCompany }),
  alternates: {
    canonical: `${urlWebsite}login`,
  },
  openGraph: {
    title: i18nText("AUTO.app.dang.nhap.line15_2_dang_nhap", { value0: name }),
    description:
      i18nText("AUTO.app.dang.nhap.line17_3_dang_nhap_vao") +
      name +
      i18nText("AUTO.app.dang.nhap.line19_4_quan_ly_don_hang_trai"),
    url: `${urlWebsite}login`,
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
