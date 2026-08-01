"use client";

import { i18nText } from "@/lib/i18nText";
import type React from "react";
import { useTransition, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/button";
import InputField from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useStateStore } from "@/stores/stateStore";
import { resetPassword } from "@/apis/common/auth.apis";

const resetPasswordSchema = z
  .object({
    email: z.string().min(1, i18nText("AUTO.components.account.changepasswordform.line19_0_email_bat_buoc")).email(i18nText("AUTO.components.account.changepasswordform.line19_1_email_khong_hop_le")),
    password: z
      .string()
      .min(6, i18nText("AUTO.components.account.changepasswordform.line22_2_mat_khau_moi_phai_it"))
      .min(1, i18nText("AUTO.components.account.changepasswordform.line23_3_mat_khau_moi_bat_buoc")),
    passwordConfirm: z.string().min(1, i18nText("AUTO.components.account.changepasswordform.line24_4_xac_nhan_mat_khau_bat")),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: i18nText("AUTO.components.account.changepasswordform.line27_5_mat_khau_xac_nhan_khong"),
    path: ["passwordConfirm"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const { setLoading } = useStateStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const emailFromUrl = searchParams.get("email");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [loading, startTransition] = useTransition();

  // Watch all form values
  const watchedValues = watch();
  const isFormComplete =
    watchedValues.email &&
    watchedValues.password &&
    watchedValues.passwordConfirm &&
    watchedValues.password.length >= 6 &&
    watchedValues.password === watchedValues.passwordConfirm;

  // Set email from URL
  useEffect(() => {
    if (emailFromUrl) {
      setValue("email", emailFromUrl);
    }
  }, [emailFromUrl, setValue]);

  const onSubmit = (data: ResetPasswordFormData) => {
    startTransition(async () => {
      setLoading(true);

      try {
        const response = await resetPassword(
          {
            password: data.password,
            passwordConfirm: data.passwordConfirm,
          },
          token!,
          emailFromUrl!
        );

        setLoading(false);

        if (response?.status && response?.errorCode === 200) {
          reset();
          toast.success(i18nText("AUTO.components.account.changepasswordform.line95_6_thanh_cong"), {
            description: i18nText("AUTO.components.account.changepasswordform.line96_7_mat_khau_da_duoc_dat"),
            position: "top-center",
            duration: 2000,
          });

          // Redirect to login after success
          setTimeout(() => {
            router.push("/dang-nhap");
          }, 3000);
        } else {
          toast.error(response.message || i18nText("AUTO.components.account.changepasswordform.extra107_0_loi_xay_ra"), {
            description: i18nText("AUTO.components.account.changepasswordform.line107_8_vui_long_thu_lai_sau"),
            position: "top-center",
          });
        }
      } catch (error) {
        setLoading(false);
        toast.error(i18nText("AUTO.components.account.changepasswordform.line113_9_loi_xay_ra"), {
          description: i18nText("AUTO.components.account.changepasswordform.line114_10_vui_long_thu_lai_sau"),
          position: "top-center",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              onChange={field.onChange}
              value={emailFromUrl || field.value}
              id="email"
              label={i18nText("AUTO.components.account.changepasswordform.extra134_1_email")}
              type="email"
              disabled={true}
              error={errors.email}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              onChange={field.onChange}
              value={field.value}
              id="password"
              label={i18nText("AUTO.components.account.changepasswordform.line149_11_mat_khau_moi")}
              type="password"
              error={errors.password}
            />
          )}
        />

        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field }) => (
            <InputField
              onChange={field.onChange}
              value={field.value}
              id="passwordConfirm"
              label={i18nText("AUTO.components.account.changepasswordform.line164_12_xac_nhan_mat_khau_moi")}
              type="password"
              error={errors.passwordConfirm}
            />
          )}
        />

        <Button
          type="submit"
          disabled={!isValid || loading || !isFormComplete}
          variant="success"
          size="md"
          className="w-full"
        >
          {loading ? i18nText("AUTO.components.account.changepasswordform.line178_13_dang_dat_lai_mat_khau") : i18nText("AUTO.components.account.changepasswordform.line178_14_dat_lai_mat_khau")}
        </Button>

        {/* Progress indicator */}
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${emailFromUrl || watchedValues.email
                ? "bg-green-500"
                : "bg-gray-300"
                }`}
            ></span>
            <span>{i18nText("AUTO.components.account.changepasswordform.line190_15_email_xac_thuc")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${watchedValues.password && watchedValues.password.length >= 6
                ? "bg-green-500"
                : "bg-gray-300"
                }`}
            ></span>
            <span>{i18nText("AUTO.components.account.changepasswordform.line199_16_mat_khau_moi_toi_thieu")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${watchedValues.passwordConfirm &&
                watchedValues.password === watchedValues.passwordConfirm
                ? "bg-green-500"
                : "bg-gray-300"
                }`}
            ></span>
            <span>{i18nText("AUTO.components.account.changepasswordform.line209_17_xac_nhan_mat_khau_khop")}</span>
          </div>
        </div>
      </form>

      {/* Back to login link */}
      <div className="text-center">
        <Link
          href="/dang-nhap"
          className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 text-sm font-medium underline hover:no-underline transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />{i18nText("AUTO.components.account.changepasswordform.line221_18_quay_lai_trang_dang_nhap")}</Link>
      </div>
    </div>
  );
}
