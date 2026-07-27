"use client";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast relative overflow-hidden group-[.toaster]:bg-white group-[.toaster]:!text-slate-900 group-[.toaster]:border group-[.toaster]:border-[#ffd500] group-[.toaster]:shadow-2xl group-[.toaster]:rounded-lg group-[.toaster]:backdrop-blur-sm group-[.toaster]:animate-fade-in-up group-[.toaster]:hover:shadow-[0_25px_50px_-12px_rgba(20,53,195,0.25)] group-[.toaster]:transition-all group-[.toaster]:duration-300",

          description:
            "group-[.toast]:!text-slate-900 group-[.toast]:font-medium group-[.toast]:text-sm group-[.toast]:opacity-90",

          actionButton:
            "group-[.toast]:bg-gradient-to-r from-[#ffd500] via-yellow-400 to-[#1435c3] group-[.toast]:text-white group-[.toast]:font-semibold group-[.toast]:rounded-lg group-[.toast]:px-6 group-[.toast]:py-2.5 hover:group-[.toast]:from-yellow-500 hover:group-[.toast]:to-[#0f2a9f] group-[.toast]:transition-all group-[.toast]:duration-300 group-[.toast]:shadow-lg hover:group-[.toast]:shadow-xl hover:group-[.toast]:scale-105 group-[.toast]:border group-[.toast]:border-white/20",

          cancelButton:
            "group-[.toast]:bg-white group-[.toast]:text-[#1435c3] group-[.toast]:border group-[.toast]:border-[#1435c3] group-[.toast]:font-medium group-[.toast]:rounded-lg group-[.toast]:px-6 group-[.toast]:py-2.5 hover:group-[.toast]:bg-gradient-to-r hover:group-[.toast]:from-[#ffd500]/10 hover:group-[.toast]:to-[#1435c3]/10 group-[.toast]:transition-all group-[.toast]:duration-300 group-[.toast]:shadow-md hover:group-[.toast]:shadow-lg hover:group-[.toast]:scale-105",

          success:
            "group-[.toast]:bg-gradient-to-br from-white via-green-50/80 to-slate-50 group-[.toast]:text-emerald-800 group-[.toast]:border-emerald-500 group-[.toast]:shadow-[0_20px_40px_-10px_rgba(34,197,94,0.3)]",

          error:
            "group-[.toast]:bg-gradient-to-br from-white via-red-50/80 to-slate-50 group-[.toast]:text-red-800 group-[.toast]:border-red-500 group-[.toast]:shadow-[0_20px_40px_-10px_rgba(239,68,68,0.3)]",

          warning:
            "group-[.toast]:bg-gradient-to-br from-white via-yellow-50/80 to-slate-50 group-[.toast]:text-amber-900 group-[.toast]:border-[#ffd500] group-[.toast]:shadow-[0_20px_40px_-10px_rgba(255,213,0,0.4)]",

          info: "group-[.toast]:bg-gradient-to-br from-white via-blue-50/80 to-slate-50 group-[.toast]:text-[#1435c3] group-[.toast]:border-[#1435c3] group-[.toast]:shadow-[0_20px_40px_-10px_rgba(20,53,195,0.4)]",
        },
      }}
      {...props}
    />
  );
};

export default Toaster;
