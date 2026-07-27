import MenuAccount from "@/components/account/menuAccount";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="mx-auto mt-5 h-full w-full max-w-7xl 2xl:max-w-[1520px]
px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20
"
    >
      <div className="grid grid-cols-1 md:grid-cols-10 gap-2">
        <div className="col-span-10 md:col-span-3 lg:col-span-2">
          <MenuAccount />
        </div>

        <div className="col-span-10 md:col-span-7 lg:col-span-8">
          {children}
        </div>
      </div>
    </div>
  );
}
