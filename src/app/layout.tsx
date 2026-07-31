import "./globals.css";
import type { Metadata } from "next";
import { AuthInitializer } from "@/init/AuthInitializer";
import { getAll as getAllCart } from "@/apis/models/cart.apis";
import { CartInitializer } from "@/init/CartInitializer";
import { getValidData } from "@/lib/utils";
import { getMe } from "@/apis/common/auth.apis";
import { getAll as getAllAdvertise } from "@/apis/models/advertise.apis";
import { BannerInitializer } from "@/init/BannerInitializer";
import { getAll as getAllSupport } from "@/apis/models/support.apis";
import {
  getAll as getAllConfig,
  getAllSections as getAllFooterSections,
} from "@/apis/common/footer.apis";
import { ConfigInitializer } from "@/init/ConfigInitializer";
import { FooterInitializer } from "@/init/FooterInitializer";
import { CompanyAddressInitializer } from "@/init/CompanyAddressInitializer";
import { getAll as getAllCompanyAddresses } from "@/apis/common/company-address.apis";
import { NextIntlClientProvider } from "next-intl";

import dynamic from "next/dynamic";
import JsonldHome from "@/json/schemaHome";
import { CategoriesInitializer } from "@/init/CategoriesInitializer";
import { getAll as getAllMenu } from "@/apis/models/menu.apis";
import GTMScript from "@/components/analytics/GTMScript";
import GTMNoScript from "@/components/analytics/GTMNoScript";

const SupportInitializer = dynamic(() => import("@/init/SupportInitializer"), {
  ssr: false,
});
const ProgressBar = dynamic(() => import("@/components/ui/ProgressBar"), {
  ssr: false,
});
const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"), {
  ssr: false,
});
const Toaster = dynamic(() => import("@/components/ui/sonner"), { ssr: false });
const PageTransition = dynamic(() => import("@/components/ui/PageTransition"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Page Not Found - 404",
  description:
    "Trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra lại URL hoặc quay lại trang chủ để tiếp tục khám phá các sản phẩm và giải pháp năng lượng của EcoFlow.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [
    me,
    cart,
    advertises,
    supports,
    config,
    footerSections,
    companyAddresses,
    menu,
  ] = await Promise.all([
    getMe(),
    getAllCart(),
    getAllAdvertise(),
    getAllSupport(),
    getAllConfig(),
    getAllFooterSections(),
    getAllCompanyAddresses(),
    getAllMenu(),
  ]);

  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <GTMScript />

        <meta name="google" content="notranslate" />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <GTMNoScript />
        <JsonldHome />
        <Toaster />
        <LoadingScreen message="Đang xử lý..." variant="spinner" size="lg" />
        <ProgressBar />

        {/* Initializers - render trên server */}

        <CategoriesInitializer data={getValidData(menu)} />
        <AuthInitializer user={getValidData(me)} />
        <CartInitializer data={getValidData(cart)} />
        <BannerInitializer data={getValidData(advertises)} />
        <SupportInitializer data={getValidData(supports)} />
        <ConfigInitializer data={getValidData(config)} />
        <FooterInitializer data={getValidData(footerSections)} />
        <CompanyAddressInitializer data={getValidData(companyAddresses)} />

        <NextIntlClientProvider>
          <PageTransition>{children}</PageTransition>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
