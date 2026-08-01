import { i18nText } from "@/lib/i18nText";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: i18nText("AUTO.app.standalone.line4_0_admin_check_in"),
  description: i18nText("AUTO.app.standalone.line5_1_quan_ly_check_in_su"),
};

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}
