"use client";
import { i18nText } from "@/lib/i18nText";
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
  name: z.string().min(1, i18nText("AUTO.components.checkout.modaluserinfo.line16_0_ho_ten_bat_buoc")),
  email: z.string().email(i18nText("AUTO.components.checkout.modaluserinfo.line17_1_email_khong_hop_le")),
  address: z.string().min(1, i18nText("AUTO.components.checkout.modaluserinfo.line18_2_dia_chi_bat_buoc")),
  phone: z
    .string()
    .min(8, i18nText("AUTO.components.checkout.modaluserinfo.line21_3_so_dien_thoai_khong_hop"))
    .max(15, i18nText("AUTO.components.checkout.modaluserinfo.line22_4_so_dien_thoai_qua_dai")),
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
              ? i18nText("AUTO.components.checkout.modaluserinfo.extra101_0_da_cap_nhat_dia_chi")
              : i18nText("AUTO.components.checkout.modaluserinfo.extra102_1_da_tao_dia_chi_moi"),
            position: "top-center",
          });
        } else {
          toast.error(response.message, {
            description: isEditing
              ? i18nText("AUTO.components.checkout.modaluserinfo.extra108_2_cap_nhat_dia_chi_that")
              : i18nText("AUTO.components.checkout.modaluserinfo.extra109_3_tao_dia_chi_that_bai"),
            position: "top-center",
          });
        }
      } catch (error) {
        console.error(
          `${isEditing ? "Update" : "Create"} address error:`,
          error
        );
        toast.error(i18nText("AUTO.components.checkout.modaluserinfo.line117_5_da_xay_ra_loi_he"), {
          description: i18nText("AUTO.components.checkout.modaluserinfo.line118_6_vui_long_thu_lai_sau"),
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
          ? i18nText("AUTO.components.checkout.modaluserinfo.line143_7_cap_nhat_thong_tin_nguoi")
          : i18nText("AUTO.components.checkout.modaluserinfo.line144_8_thong_tin_nguoi_nhan_hang")
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
                label={i18nText("AUTO.components.checkout.modaluserinfo.line156_9_ho_ten")}
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
                label={i18nText("AUTO.components.checkout.modaluserinfo.extra170_4_email")}
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
                label={i18nText("AUTO.components.checkout.modaluserinfo.line185_10_dia_chi")}
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
                label={i18nText("AUTO.components.checkout.modaluserinfo.line198_11_so_dien_thoai")}
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
              label={i18nText("AUTO.components.checkout.modaluserinfo.line212_12_dia_chi_mac_dinh")}
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
          >{i18nText("AUTO.components.checkout.modaluserinfo.line228_13_huy")}</Button>

          <Button
            disabled={!isValid || loading}
            variant="primary"
            size="md"
            className="flex-1"
          >
            {loading
              ? isEditing
                ? i18nText("AUTO.components.checkout.modaluserinfo.line239_14_dang_cap_nhat")
                : i18nText("AUTO.components.checkout.modaluserinfo.line240_15_dang_luu")
              : isEditing
              ? i18nText("AUTO.components.checkout.modaluserinfo.line242_16_cap_nhat")
              : i18nText("AUTO.components.checkout.modaluserinfo.line243_17_luu_thong_tin")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUserInfo;
