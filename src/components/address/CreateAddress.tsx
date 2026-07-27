"use client";

import { remove } from "@/apis/models/address.apis";
import ModalUserInfo from "@/components/checkout/ModalUserInfo";
import ConfirmPopover from "@/components/ui/ConfirmPopover";
import { IAddress } from "@/interfaces/models/IAddress.interface";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type AddressProps = {
  data: IAddress[];
};

export default function CreateAddress({ data }: AddressProps) {
  const [editAddress, setEditAddress] = useState<IAddress | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const t = useTranslations();

  const handleEdit = (value: IAddress) => {
    setOpen(true);
    setEditAddress(value);
  };

  return (
    <>
      <ModalUserInfo
        editData={editAddress}
        setEditAddress={setEditAddress}
        onOpen={setOpen}
        open={open}
      />

      <div className="mt-2">
        <div
          onClick={() => setOpen(true)}
          className="bg-white cursor-pointer rounded-lg shadow-sm h-14 sm:h-16 w-full p-3 sm:p-4 flex items-center justify-center gap-1 border-[1.5px] border-dashed border-gray-300"
        >
          <Plus className="text-gray-600" size={20} strokeWidth={1.75} />
          <span className="text-blue-500 text-sm sm:text-base">
            {" "}
            Thêm địa chỉ mới
          </span>
        </div>

        {data?.map((item) => (
          <div
            onClick={() => setEditAddress(item)}
            key={item.id}
            className="mt-2 p-2 sm:p-3 md:p-2 bg-white flex flex-col sm:flex-row sm:items-center"
          >
            <div className="flex flex-col gap-1 w-full sm:w-[85%]">
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-base sm:text-lg font-medium">
                  {item.name}
                </span>
                {item.isDefault && (
                  <span className="text-xs text-[#1230B0] p-1 bg-blue-200 rounded-lg whitespace-nowrap">
                    Mặc định
                  </span>
                )}
              </div>
              <span className="text-[#82869E] text-xs sm:text-sm break-words">
                Địa chỉ: {item.address}
              </span>
              <span className="text-[#82869E] text-xs sm:text-sm">
                Điện thoại: {item.phone}
              </span>
              <span className="text-[#82869E] text-xs sm:text-sm break-words">
                Email: {item.email}
              </span>
            </div>
            <div className="w-full sm:w-[15%] mt-3 sm:mt-0">
              <div className="flex items-center gap-2 justify-start sm:justify-end">
                <div
                  onClick={() => handleEdit(item)}
                  className="p-1 px-2 sm:px-1 cursor-pointer border-[1.5px] border-[#DA4343] rounded-lg"
                >
                  <span className="text-[#DA4343] text-xs sm:text-sm">
                    Chỉnh sửa
                  </span>
                </div>
                {!item.isDefault && (
                  <ConfirmPopover
                    trigger={
                      <div className="px-2 sm:px-3 cursor-pointer py-1 border-[1.5px] border-[#BCBFD6] rounded-lg w-fit">
                        <span className="text-[#333333] text-xs sm:text-sm">
                          {t("COMMON.delete")}
                        </span>
                      </div>
                    }
                    title="Xóa địa chỉ"
                    description="Bạn có chắc chắn muốn xóa địa chỉ này?"
                    onConfirm={() => remove(item.id)}
                    position="bottom"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

