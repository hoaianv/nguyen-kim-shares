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
      <h2 className="text-2xl font-semibold">Sổ địa chỉ</h2>
      <CreateAddress data={addresses} />
    </div>
  );
}
