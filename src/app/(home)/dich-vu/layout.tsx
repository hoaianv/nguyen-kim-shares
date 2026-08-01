import { i18nText } from "@/lib/i18nText";
import {
  descriptionCompany,
  name,
  urlWebsite,
} from "@/constants/company.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.dich.vu.line9_0_dich_vu", { value0: name }),
  description: descriptionCompany,
  alternates: {
    canonical: `${urlWebsite}dich-vu`,
  },
  openGraph: {
    title: i18nText("AUTO.app.dich.vu.line15_1_dich_vu", { value0: name }),
    description: descriptionCompany,
    url: `${urlWebsite}dich-vu`,
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
