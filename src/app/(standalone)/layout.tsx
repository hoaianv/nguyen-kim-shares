import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Check-in",
  description: "Quản lý check-in sự kiện",
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
