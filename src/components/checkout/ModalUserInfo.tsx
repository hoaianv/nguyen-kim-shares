"use client";
import React, { useTransition, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import Switch from "@/components/ui/Switch";
import { create, update } from "@/apis/models/address.apis";
import { getValidData } from "@/lib/utils";
import { toast } from "sonner";
import { IAddress } from "@/interfaces/models/IAddress.interface";

const userInfoSchema = z.object({
  name: z.string().min(1, "Họ và tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
  phone: z
    .string()
    .min(8, "Số điện thoại không hợp lệ")
    .max(15, "Số điện thoại quá dài"),
  isDefault: z.boolean(),
});

type UserInfoFormData = z.infer<typeof userInfoSchema>;

interface ModalUserInfoProps {
  open: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: IAddress | null;
  setEditAddress: React.Dispatch<React.SetStateAction<IAddress | null>>;
}

const ModalUserInfo = ({
  open,
  onOpen,
  editData = null,
  setEditAddress,
}: ModalUserInfoProps) => {
  const isEditing = !!editData;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      isDefault: false,
    },
    mode: "onChange",
  });

  const [loading, startTransition] = useTransition();

  useEffect(() => {
    reset();
    if (open) {
      if (editData) {
        reset({
          name: editData.name,
          email: editData.email,
          address: editData.address,
          phone: editData.phone,
          isDefault: editData.isDefault,
        });
      } else {
        reset({
          name: "",
          email: "",
          address: "",
          phone: "",
          isDefault: false,
        });
      }
    }
  }, [open, editData, reset]);

  const onSubmit = (data: UserInfoFormData) => {
    startTransition(async () => {
      try {
        let response;

        if (isEditing) {
          // Cập nhật địa chỉ
          response = await update(editData.id!, data);
        } else {
          response = await create(data);
        }

        if (getValidData(response)) {
          toast.success(response.message, {
            description: isEditing
              ? "Đã cập nhật địa chỉ thành công"
              : "Đã tạo địa chỉ mới thành công",
            position: "top-center",
          });
        } else {
          toast.error(response.message, {
            description: isEditing
              ? "Cập nhật địa chỉ thất bại, vui lòng thử lại!"
              : "Tạo địa chỉ thất bại, vui lòng thử lại!",
            position: "top-center",
          });
        }
      } catch (error) {
        console.error(
          `${isEditing ? "Update" : "Create"} address error:`,
          error
        );
        toast.error("Đã xảy ra lỗi hệ thống", {
          description: "Vui lòng thử lại sau!",
          position: "top-center",
        });
      } finally {
        onOpen(false);
        reset();
        setEditAddress(null);
      }
    });
  };

  const handleClose = () => {
    onOpen(false);
    setEditAddress(null);

    reset();
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      size="md"
      title={
        isEditing
          ? "Cập nhật thông tin người nhận"
          : "Thông tin người nhận hàng"
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-2 gap-2">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="name"
                label="Họ và tên"
                error={errors.name}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="email"
                label="Email"
                type="email"
                error={errors.email}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="address"
                label="Địa chỉ"
                error={errors.address}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="phone"
                label="Số điện thoại"
                type="tel"
                error={errors.phone}
              />
            )}
          />
        </div>

        <Controller
          name="isDefault"
          control={control}
          render={({ field }) => (
            <Switch
              id="isDefault"
              label="Địa chỉ mặc định"
              checked={field.value}
              onChange={field.onChange}
              error={errors.isDefault}
            />
          )}
        />

        <div className="flex gap-2 mt-3">
          <Button
            type="button"
            onClick={handleClose}
            variant="secondary"
            size="md"
            disabled={loading}
          >
            Hủy
          </Button>

          <Button
            disabled={!isValid || loading}
            variant="primary"
            size="md"
            className="flex-1"
          >
            {loading
              ? isEditing
                ? "Đang cập nhật..."
                : "Đang lưu..."
              : isEditing
              ? "Cập nhật"
              : "Lưu thông tin"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUserInfo;
