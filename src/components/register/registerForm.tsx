"use client";
import { i18nText } from "@/lib/i18nText";
import React, { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CheckboxField from "@/components/ui/checkboxField";
import { register } from "@/apis/common/auth.apis";
import { useStateStore } from "@/stores/stateStore";

const registerSchema = z
  .object({
    username: z.string().min(3, i18nText("AUTO.components.register.registerform.line17_0_ten_dang_nhap_phai_it")),
    password: z
      .string()
      .min(8, i18nText("AUTO.components.register.registerform.line20_1_mat_khau_phai_it_nhat"))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        i18nText("AUTO.components.register.registerform.line23_2_mat_khau_phai_chua_it")
      ),
    password_confirmation: z
      .string()
      .min(1, i18nText("AUTO.components.register.registerform.line27_3_xac_nhan_mat_khau_bat"))
      .optional(),
    name: z.string().min(1, i18nText("AUTO.components.register.registerform.line29_4_ho_ten_nguoi_dai_dien")),
    email: z.string().email(i18nText("AUTO.components.register.registerform.line30_5_email_khong_hop_le")).min(1, i18nText("AUTO.components.register.registerform.line30_6_email_bat_buoc")),
    phone: z
      .string()
      .min(1, i18nText("AUTO.components.register.registerform.line33_7_so_dien_thoai_bat_buoc"))
      .regex(/^(0|\+84)[1-9][0-9]{8,9}$/, i18nText("AUTO.components.register.registerform.line34_8_so_dien_thoai_khong_hop")),
    receiverName: z.string().min(1, i18nText("AUTO.components.register.registerform.line35_9_ho_ten_nguoi_nhan_bat")),
    address: z.string().min(1, i18nText("AUTO.components.register.registerform.line36_10_dia_chi_nhan_hang_bat")),
    companyName: z.string().min(1, i18nText("AUTO.components.register.registerform.line37_11_ten_cong_ty_bat_buoc")),
    taxCode: z
      .string()
      .min(10, i18nText("AUTO.components.register.registerform.line40_12_ma_so_thue_tu_10"))
      .max(13, i18nText("AUTO.components.register.registerform.line41_13_ma_so_thue_tu_10"))
      .regex(/^\d{10,13}$/, i18nText("AUTO.components.register.registerform.line42_14_ma_so_thue_chi_gom")),
    companyEmail: z
      .string()
      .email(i18nText("AUTO.components.register.registerform.line45_15_email_cong_ty_khong_hop"))
      .min(1, i18nText("AUTO.components.register.registerform.line46_16_email_cong_ty_bat_buoc")),
    companyPhone: z
      .string()
      .min(1, i18nText("AUTO.components.register.registerform.line49_17_so_dien_thoai_cong_ty"))
      .regex(/^(0|\+84)[1-9][0-9]{8,9}$/, i18nText("AUTO.components.register.registerform.line50_18_so_dien_thoai_cong_ty")),
    companyAddress: z.string().min(1, i18nText("AUTO.components.register.registerform.line51_19_dia_chi_cong_ty_bat")),
  })
  .refine(
    (data) =>
      !data.password ||
      !data.password_confirmation ||
      data.password === data.password_confirmation,
    {
      message: i18nText("AUTO.components.register.registerform.line59_20_mat_khau_xac_nhan_mat"),
      path: ["password_confirmation"],
    }
  );

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const { setLoading } = useStateStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      password_confirmation: "",
      name: "",
      email: "",
      phone: "",
      receiverName: "",
      address: "",
      companyName: "",
      taxCode: "",
      companyEmail: "",
      companyPhone: "",
      companyAddress: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState<string | null>(null);

  const onSubmit = (data: RegisterFormData) => {
    if (!agree) {
      setAgreeError(i18nText("AUTO.components.register.registerform.extra104_0_vui_long_dong_y_dieu"));
      return;
    }
    setAgreeError(null);

    startTransition(async () => {
      try {
        setLoading(true);
        const response = await register(data);
        if (response?.status && response?.errorCode === 200) {
          reset();
          setAgree(false);
          toast.success(i18nText("AUTO.components.register.registerform.line115_21_dang_ky_thanh_cong"), {
            description:
              i18nText("AUTO.components.register.registerform.line117_22_khoan_se_duoc_kich_hoat"),
            position: "top-center",
            action: {
              label: i18nText("AUTO.components.register.registerform.line120_23_dang_nhap"),
              onClick: () => router.push("/dang-nhap"),
            },
          });
        } else {
          toast.error(response?.message || i18nText("AUTO.components.register.registerform.extra126_1_dang_ky_that_bai"), {
            description: i18nText("AUTO.components.register.registerform.line126_24_vui_long_kiem_tra_lai"),
            position: "top-center",
          });
        }
      } catch (err: any) {
        toast.error(i18nText("AUTO.components.register.registerform.line131_25_dang_ky_that_bai"), {
          description: err?.message || i18nText("AUTO.components.register.registerform.extra133_2_vui_long_thu_lai_sau"),
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Cụm 1: Tài khoản / Người đại diện */}
      <fieldset className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
        <legend className="px-2 text-md font-semibold text-neutral-800">{i18nText("AUTO.components.register.registerform.line146_26_thong_tin_khoan_nguoi_dai")}</legend>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 [&>*:last-child]:mb-0 [&>*:nth-last-child(2)]:mb-0">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <InputField
                id="username"
                label={i18nText("AUTO.components.register.registerform.line155_27_ten_dang_nhap")}
                value={field.value}
                onChange={field.onChange}
                error={errors.username}
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                id="name"
                label={i18nText("AUTO.components.register.registerform.line169_28_ho_ten_nguoi_dai_dien")}
                value={field.value}
                onChange={field.onChange}
                error={errors.name}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputField
                id="password"
                label={i18nText("AUTO.components.register.registerform.line183_29_mat_khau")}
                type="password"
                value={field.value}
                onChange={field.onChange}
                error={errors.password}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                id="email"
                label={i18nText("AUTO.components.register.registerform.extra197_3_email")}
                value={field.value}
                onChange={field.onChange}
                error={errors.email}
              />
            )}
          />
          <Controller
            name="password_confirmation"
            control={control}
            render={({ field }) => (
              <InputField
                id="password_confirmation"
                label={i18nText("AUTO.components.register.registerform.line211_30_xac_nhan_mat_khau")}
                type="password"
                value={field.value}
                onChange={field.onChange}
                error={errors.password_confirmation}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputField
                id="phone"
                label={i18nText("AUTO.components.register.registerform.line225_31_so_dien_thoai")}
                value={field.value}
                onChange={field.onChange}
                error={errors.phone}
              />
            )}
          />
        </div>
      </fieldset>

      {/* Cụm 2: Nhận hàng */}
      <fieldset className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
        <legend className="px-2 text-md font-semibold text-neutral-800">{i18nText("AUTO.components.register.registerform.line238_32_thong_tin_nhan_hang")}</legend>
        <div className="mt-4 grid grid-cols-1 gap-4 [&>*:last-child]:mb-0">
          <Controller
            name="receiverName"
            control={control}
            render={({ field }) => (
              <InputField
                id="receiverName"
                label={i18nText("AUTO.components.register.registerform.line247_33_ho_ten_nguoi_nhan")}
                value={field.value}
                onChange={field.onChange}
                error={errors.receiverName}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <InputField
                id="address"
                label={i18nText("AUTO.components.register.registerform.line260_34_dia_chi_nhan_hang")}
                value={field.value}
                onChange={field.onChange}
                error={errors.address}
              />
            )}
          />
        </div>
      </fieldset>

      {/* Cụm 3: Công ty */}
      <fieldset className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
        <legend className="px-2 text-md font-semibold text-neutral-800">{i18nText("AUTO.components.register.registerform.line273_35_thong_tin_cong_ty")}</legend>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <InputField
                id="companyName"
                label={i18nText("AUTO.components.register.registerform.line282_36_ten_cong_ty")}
                value={field.value}
                onChange={field.onChange}
                error={errors.companyName}
              />
            )}
          />
          <Controller
            name="taxCode"
            control={control}
            render={({ field }) => (
              <InputField
                id="taxCode"
                label={i18nText("AUTO.components.register.registerform.line295_37_ma_so_thue")}
                value={field.value}
                onChange={field.onChange}
                error={errors.taxCode}
              />
            )}
          />
          <Controller
            name="companyEmail"
            control={control}
            render={({ field }) => (
              <InputField
                id="companyEmail"
                label={i18nText("AUTO.components.register.registerform.line308_38_email_cong_ty")}
                value={field.value}
                onChange={field.onChange}
                error={errors.companyEmail}
              />
            )}
          />
          <Controller
            name="companyPhone"
            control={control}
            render={({ field }) => (
              <InputField
                id="companyPhone"
                label={i18nText("AUTO.components.register.registerform.line321_39_so_dien_thoai_cong_ty")}
                value={field.value}
                onChange={field.onChange}
                error={errors.companyPhone}
              />
            )}
          />
        </div>
        <div className="[&>*:last-child]:mb-0">
          <Controller
            name="companyAddress"
            control={control}
            render={({ field }) => (
              <InputField
                id="companyAddress"
                label={i18nText("AUTO.components.register.registerform.line336_40_dia_chi_cong_ty")}
                value={field.value}
                onChange={field.onChange}
                error={errors.companyAddress}
              />
            )}
          />
        </div>
      </fieldset>

      {/* Điều khoản */}
      <div className="space-y-2">
        <div className="flex w-full justify-center">
          <label className="flex max-w-[720px] items-center justify-center text-sm text-neutral-700">
            <CheckboxField
              id="agree"
              checked={agree}
              onChange={() => {
                setAgree((v) => !v);
                if (agreeError) setAgreeError(null);
              }}
            />
            <span className="text-center">{i18nText("AUTO.components.register.registerform.line359_41_toi_da_dong_y")}{" "}
              <Link href="/" className="text-blue-600 hover:underline">{i18nText("AUTO.components.register.registerform.line361_42_dieu_khoan_su_dung")}</Link>{" "}
              &{" "}
              <Link href="/" className="text-blue-600 hover:underline">{i18nText("AUTO.components.register.registerform.line365_43_chinh_sach_bao_mat_nguyen")}</Link>
            </span>
          </label>
        </div>
        {agreeError && (
          <p className="text-center text-sm text-red-600">{agreeError}</p>
        )}
      </div>

      {/* Nút tạo tài khoản */}
      <Button
        type="submit"
        disabled={!isValid || loading || !agree}
        className="w-full"
      >
        {loading ? i18nText("AUTO.components.register.registerform.line381_44_dang_xu_ly") : i18nText("AUTO.components.register.registerform.line381_45_tao_khoan")}
      </Button>

      {/* Link đăng nhập */}
      <p className="text-center text-sm text-neutral-700">{i18nText("AUTO.components.register.registerform.line386_46_da_khoan")}{" "}
        <Link href="/dang-nhap" className="text-blue-600 hover:underline">{i18nText("AUTO.components.register.registerform.line388_47_dang_nhap")}</Link>
      </p>
    </form>
  );
};

export default RegisterForm;

