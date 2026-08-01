import { i18nText } from "@/lib/i18nText";
import InfoUserCard from "@/components/checkout/InfoUserCard";
import { IAddress } from "@/interfaces/models/IAddress.interface";
import { IMember } from "@/interfaces/models/member.interfaces";
import { Plus } from "lucide-react";

const AddressGrid = ({
  user,
  addresses,
  selectedAddressId,
  onEditAddress,
  onSelectAddress,
  onAddAddress,
}: {
  user: IMember | null;
  addresses: IAddress[];
  selectedAddressId: number | "user" | null;
  onEditAddress: (data: IAddress) => void;
  onSelectAddress: (data: IAddress) => void;
  onAddAddress: () => void;
}) => {
  const userAddress: Partial<IAddress> = {
    name: user?.fullName,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  };

  const isUserAddressValid =
    userAddress.name &&
    userAddress.email &&
    userAddress.phone &&
    userAddress.address;

  return (
    <div className="mb-4 grid grid-cols-1 items-center gap-2 sm:grid-cols-2 sm:gap-3">
      {isUserAddressValid && (
        <InfoUserCard
          name={userAddress.name}
          email={userAddress.email}
          phone={userAddress.phone}
          address={userAddress.address}
          isDefault={selectedAddressId === "user"}
          onSelect={() => onSelectAddress(userAddress as IAddress)}
        />
      )}

      {addresses.map((address) => (
        <InfoUserCard
          key={address.id}
          {...address}
          isDefault={selectedAddressId === address.id}
          onEdit={onEditAddress}
          onSelect={onSelectAddress}
        />
      ))}

      <div
        onClick={onAddAddress}
        className="h-[100px] w-full cursor-pointer rounded-lg border border-gray-200 transition-colors hover:border-gray-300 sm:h-[126px]"
      >
        <div className="flex h-full flex-col items-center justify-center text-gray-500 transition-colors hover:text-gray-700">
          <Plus
            size={24}
            strokeWidth={1.5}
            className="sm:h-[30px] sm:w-[30px]"
          />
          <span className="mt-2 text-xs sm:text-sm">{i18nText("AUTO.components.checkout.addressgrid.line67_0_them_dia_chi")}</span>
        </div>
      </div>
    </div>
  );
};

export default AddressGrid;
