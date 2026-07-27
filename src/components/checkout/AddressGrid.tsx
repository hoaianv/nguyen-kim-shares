import InfoUserCard from "@/components/checkout/InfoUserCard";
import { IAddress } from "@/interfaces/models/IAddress.interface";
import { IMember } from "@/interfaces/models/member.interfaces";
import { Plus } from "lucide-react";

const areAddressesEqual = (
  addr1: Partial<IAddress>,
  addr2: Partial<IAddress>
): boolean => {
  return (
    addr1?.name === addr2?.name &&
    addr1?.email === addr2?.email &&
    addr1?.phone === addr2?.phone &&
    addr1?.address === addr2?.address
  );
};

const AddressGrid = ({
  user,
  addresses,
  selectedPayload,
  onEditAddress,
  onSelectAddress,
  onAddAddress,
}: {
  user: IMember | null;
  addresses: IAddress[];
  selectedPayload: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  onEditAddress: (data: IAddress) => void;
  onSelectAddress: (data: IAddress) => void;
  onAddAddress: () => void;
}) => {
  // Tạo user address object từ user data
  const userAddress: Partial<IAddress> = {
    name: user?.fullName,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  };

  // Kiểm tra user address có valid không
  const isUserAddressValid =
    userAddress.name &&
    userAddress.email &&
    userAddress.phone &&
    userAddress.address;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 items-center mb-4">
      {/* User Default Address Card */}
      {isUserAddressValid && (
        <InfoUserCard
          name={userAddress.name}
          email={userAddress.email}
          phone={userAddress.phone}
          address={userAddress.address}
          isDefault={areAddressesEqual(selectedPayload, userAddress)}
          onSelect={() => onSelectAddress(userAddress as IAddress)}
        />
      )}

      {/* Saved Addresses Cards */}
      {addresses.map((address) => (
        <InfoUserCard
          key={address.id}
          {...address}
          isDefault={areAddressesEqual(selectedPayload, address)}
          onEdit={onEditAddress}
          onSelect={onSelectAddress}
        />
      ))}

      {/* Add New Address Card */}
      <div
        onClick={onAddAddress}
        className="h-[100px] sm:h-[126px] border rounded-lg border-gray-200 w-full cursor-pointer hover:border-gray-300 transition-colors"
      >
        <div className="flex flex-col justify-center items-center h-full text-gray-500 hover:text-gray-700 transition-colors">
          <Plus
            size={24}
            strokeWidth={1.5}
            className="sm:w-[30px] sm:h-[30px]"
          />
          <span className="mt-2 text-xs sm:text-sm">Thêm địa chỉ</span>
        </div>
      </div>
    </div>
  );
};

export default AddressGrid;

