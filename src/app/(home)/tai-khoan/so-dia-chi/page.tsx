import { i18nText } from "@/lib/i18nText";
import { getAll } from "@/apis/models/address.apis";
import CreateAddress from "@/components/address/CreateAddress";
import { IAddress } from "@/interfaces/models/IAddress.interface";
import { getValidData } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const data = await getAll();
  const addresses = getValidData<IAddress[]>(data) ?? [];

  return (
    <div className="   p-3  ">
      <h2 className="text-2xl font-semibold">{i18nText("AUTO.app.khoan.so.dia.chi.line16_0_so_dia_chi")}</h2>
      <CreateAddress data={addresses} />
    </div>
  );
}
