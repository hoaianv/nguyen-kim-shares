import { getAll } from "@/apis/models/address.apis";
import PageCheckout from "@/components/checkout/pageCheckout";
import { IAddress } from "@/interfaces/models/IAddress.interface";
import { getValidData } from "@/lib/utils";

export default async function page() {
  const data = await getAll();
  const addresses = getValidData<IAddress[]>(data) ?? [];

  return (
    <div>
      <div
        className="mx-auto h-full w-full max-w-7xl 2xl:max-w-[1520px]
px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20"
      >
        <PageCheckout data={addresses} />
      </div>
    </div>
  );
}
