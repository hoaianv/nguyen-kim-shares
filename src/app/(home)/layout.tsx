import dynamic from "next/dynamic";
import Header from "@/components/header/Header";
import {
  description,
  keywords,
  logo,
  name,
} from "@/constants/company.constant";
import { domain } from "@/constants/routes";
import { Metadata } from "next";
import ScrollTop from "@/components/ui/ScrollTop";
import GoogleTranslate from "@/components/GoogleTranslate";

const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: false,
});

const SupportWidget = dynamic(
  () =>
    import("@/components/ui/SupportWidget").then((mod) => ({
      default: mod.SupportWidget,
    })),
  {
    ssr: false,
  },
);

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: name,
  description: description,
  keywords: keywords,
  alternates: {
    canonical: domain,
  },
  authors: [{ name: name, url: domain }],
  openGraph: {
    title: name,
    description: description,
    url: domain,
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: logo,
        width: 1200,
        height: 630,
        alt: name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: name,
    creator: name,
    title: name,
    description: description,
    images: logo,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed right-4 top-4 z-[9999]">
        <GoogleTranslate />
      </div>
      <ScrollTop />
      <Header />
      <main className="min-h-screen bg-white">{children}</main>
      <Footer />
      <SupportWidget />
    </>
  );
}
