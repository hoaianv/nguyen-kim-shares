"use client";
import { i18nText } from "@/lib/i18nText";
import { FC, useEffect, useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input";
import Button from "@/components/ui/button";
import DateTimePicker from "@/components/ui/dateTimePicker";
import SelectField from "@/components/ui/select";

import { useAuthStore } from "@/stores/useAuth";
import { fromISODateOnly, toISODateOnly } from "@/until";
import { update } from "@/apis/common/auth.apis";
import { useStateStore } from "@/stores/stateStore";
import { toast } from "sonner";

const updateSchema = z.object({
  fullName: z.string().min(1, i18nText("AUTO.components.account.accountform.line18_0_ho_ten_bat_buoc")),
  phone: z
    .string()
    .min(1, i18nText("AUTO.components.account.accountform.line21_1_so_dien_thoai_bat_buoc"))
    .regex(/^(0|\+84)[1-9][0-9]{8,9}$/, i18nText("AUTO.components.account.accountform.line22_2_so_dien_thoai_khong_hop")),
  email: z.string().email(i18nText("AUTO.components.account.accountform.line23_3_email_khong_hop_le")).min(1, i18nText("AUTO.components.account.accountform.line23_4_email_bat_buoc")),
  gender: z.enum(["male", "female", "other"], {
    message: i18nText("AUTO.components.account.accountform.line25_5_gioi_tinh_bat_buoc"),
  }),
  dateOfBirth: z.date().nullable().optional(),
});

type UpdateFormData = z.infer<typeof updateSchema>;

const UpdateUserForm: FC = () => {
  const { user } = useAuthStore();
  const [disabled, setDisabled] = useState(true);
  const [loading, startTransition] = useTransition();
  const { setLoading } = useStateStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!user) return;
    reset({
      fullName: user.fullName || "",
      phone: user.phone || "",
      email: user.email || "",
      gender: (user.gender as "male" | "female" | "other") || "other",
      dateOfBirth: fromISODateOnly(user.dateOfBirth),
    });
  }, [user, reset]);

  const onSubmit = (data: UpdateFormData) => {
    startTransition(async () => {
      setLoading(true);

      const payload = {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        gender: data.gender,
        dateOfBirth: toISODateOnly(data.dateOfBirth),
      };

      const response = await update(payload);
      setLoading(false);

      if (response?.status && response?.errorCode === 200) {
        toast.success(response.message, {
          description: i18nText("AUTO.components.account.accountform.line77_6_da_cap_nhat_thong_tin"),
          position: "top-center",
        });
      } else {
        toast.error(response.message, {
          description: i18nText("AUTO.components.account.accountform.line82_7_loi_qua_trinh_cap_nhat"),
          position: "top-center",
        });
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <span className="text-lg font-medium">{i18nText("AUTO.components.account.accountform.line92_8_thong_tin_khoan")}</span>
        <span
          className="text-sm text-[#3f68e0] cursor-pointer"
          onClick={() => setDisabled(false)}
        >{i18nText("AUTO.components.account.accountform.line97_9_chinh_sua")}</span>
      </div>
      {user && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Thông tin cá nhân */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-md font-medium mb-3">{i18nText("AUTO.components.account.accountform.line104_10_thong_tin_ca_nhan")}</h3>

            {/* Username (chỉ xem) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="username"
                label={i18nText("AUTO.components.account.accountform.line110_11_ten_dang_nhap")}
                value={user?.username ?? ""}
                readonly
              />
            </div>

            {/* 3 field được update: fullName, phone, email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <InputField
                    id="fullName"
                    label={i18nText("AUTO.components.account.accountform.line124_12_ho_ten")}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.fullName}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <InputField
                    id="phone"
                    label={i18nText("AUTO.components.account.accountform.line137_13_so_dien_thoai")}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.phone}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputField
                    id="email"
                    label={i18nText("AUTO.components.account.accountform.extra152_0_email")}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.email}
                  />
                )}
              />
              {/* gender (update) */}
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <SelectField
                    id="gender"
                    label=""
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.gender}
                    options={[
                      { value: "male", label: "Nam" },
                      { value: "female", label: i18nText("AUTO.components.account.accountform.line173_14_nu") },
                      { value: "other", label: i18nText("AUTO.components.account.accountform.line174_15_khac") },
                    ]}
                    placeholder={i18nText("AUTO.components.account.accountform.line176_16_chon_gioi_tinh")}
                  />
                )}
              />
            </div>

            {/* dateOfBirth (update) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    onChange={(date) => field.onChange(date)}
                    value={field.value}
                    minYear={1950}
                    maxYear={2010}
                    placeholder={i18nText("AUTO.components.account.accountform.line193_17_chon_ngay_sinh")}
                    className="w-full max-w-sm"
                  />
                )}
              />
              {/* chừa trống cột phải cho gọn layout */}
              <div />
            </div>
          </div>

          {/* Thông tin công ty (chỉ xem) */}
          <div>
            <div className="flex items-baseline gap-2 mb-3">
              <h3 className="text-md font-medium leading-none">{i18nText("AUTO.components.account.accountform.line207_18_thong_tin_cong_ty")}</h3>
              <span className="text-gray-400 text-xs leading-none">{i18nText("AUTO.components.account.accountform.line210_19_khong_chinh_sua")}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="companyName"
                label={i18nText("AUTO.components.account.accountform.line217_20_ten_cong_ty")}
                value={user?.companyName ?? ""}
                readonly
              />
              <InputField
                id="taxCode"
                label={i18nText("AUTO.components.account.accountform.line223_21_ma_so_thue")}
                value={user?.taxCode ?? ""}
                readonly
              />
            </div>

            <InputField
              id="companyAddress"
              label={i18nText("AUTO.components.account.accountform.line231_22_dia_chi_cong_ty")}
              value={user?.companyAddress ?? ""}
              readonly
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <InputField
                id="companyPhone"
                label={i18nText("AUTO.components.account.accountform.line239_23_so_dien_thoai_cong_ty")}
                value={user?.companyPhone ?? ""}
                readonly
              />
              <InputField
                id="companyEmail"
                label={i18nText("AUTO.components.account.accountform.line245_24_email_cong_ty")}
                value={user?.companyEmail ?? ""}
                readonly
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#e6e6e6]">
            <Button
              variant={"primary"}
              size="md"
              className="mt-3"
              type="submit"
              disabled={loading || !isValid}
            >{i18nText("AUTO.components.account.accountform.line260_25_cap_nhat")}</Button>

            {!disabled && (
              <Button
                onClick={() => setDisabled(true)}
                variant={"outline"}
                size="xs"
                className="mt-3"
                type="button"
              >{i18nText("AUTO.components.account.accountform.line271_26_huy_bo")}</Button>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateUserForm;
