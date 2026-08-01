import { i18nText } from "@/lib/i18nText";
import {
  descriptionCompany,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.dang.ky.line9_0_dang_ky", { value0: name }),
  description: i18nText("AUTO.app.dang.ky.line10_1_dang_ky_khoan_mua_sam", { value0: descriptionCompany }),
  alternates: {
    canonical: `${urlWebsite}dang-ky`,
  },
  openGraph: {
    title: i18nText("AUTO.app.dang.ky.line15_2_dang_ky", { value0: name }),
    description:
      i18nText("AUTO.app.dang.ky.line17_3_tao_khoan_moi") +
      name +
      i18nText("AUTO.app.dang.ky.line19_4_trai_nghiem_dich_vu_nhan"),
    url: `${urlWebsite}dang-ky`,
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
