import { IAddress } from "@/interfaces/models/IAddress.interface";
import { Check, Pencil } from "lucide-react";
import { de } from "zod/v4/locales";

interface CardProps {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  isDefault?: boolean;
  onEdit?: (data: IAddress) => void;
  onSelect?: (data: IAddress) => void;
}

const isIAddress = (v: any): v is IAddress =>
  v &&
  v.id != null &&
  v.name != null &&
  v.email != null &&
  v.phone != null &&
  v.address != null &&
  v.isDefault != null;
const InfoUserCard = ({
  id,
  name,
  email,
  phone,
  address,
  isDefault = false,
  onEdit,
  onSelect,
}: CardProps) => {
  const addressData = { id, name, email, phone, address, isDefault };
  const canEdit = id !== undefined && onEdit; // Chỉ cho edit nếu có id và onEdit function
  const canSelect = name && email && phone && address && onSelect;

  const handleCardClick = () => {
    if (canSelect) {
      onSelect(addressData as IAddress);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canEdit && isIAddress(addressData)) {
      onEdit(addressData);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
        h-[126px] border w-full flex items-center justify-start rounded-lg 
        relative overflow-hidden transition-all duration-200
        ${
          isDefault
            ? "border-[#1230B0] bg-blue-50/30"
            : "border-gray-200 hover:border-gray-300"
        }
        ${canSelect ? "cursor-pointer" : "cursor-default"}
      `}
    >
      {/* Selected indicator */}
      {isDefault && (
        <>
          <div className="absolute top-0 right-0 w-0 h-0 border-solid border-t-0 border-r-[36px] border-b-[36px] border-l-0 border-transparent border-r-[#1435C3]" />
          <Check size={16} className="text-white top-1 right-[2px] absolute" />
        </>
      )}

      <div className="p-3 w-full">
        <div className="flex items-start flex-col gap-1">
          {/* Name and Edit button row */}
          <div className="flex gap-2 items-center  ">
            <h4 className="font-medium text-gray-900 flex-1 truncate">
              {name}
            </h4>
            {canEdit && (
              <Pencil
                onClick={handleEditClick}
                size={16}
                strokeWidth={1.5}
                className="text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0"
              />
            )}
          </div>

          {/* Contact info */}
          <p className="text-sm text-gray-600 truncate w-full">{email}</p>
          <p className="text-sm text-gray-600 truncate w-full">{phone}</p>
          <p className="text-sm text-gray-600 mt-1 line-clamp-1 w-full">
            {address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoUserCard;

