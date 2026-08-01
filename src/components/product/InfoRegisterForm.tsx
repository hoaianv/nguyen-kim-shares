"use client";

import { i18nText } from "@/lib/i18nText";
import { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { useStateStore } from "@/stores/stateStore";
import { productNotifyRegister } from "@/apis/models/products.apis";

const schema = z.object({
  fullName: z.string().min(1, i18nText("AUTO.components.product.inforegisterform.line14_0_ho_ten_bat_buoc")),
  phone: z
    .string()
    .min(1, i18nText("AUTO.components.product.inforegisterform.line17_1_so_dien_thoai_bat_buoc"))
    .regex(/^\d{10}$/, i18nText("AUTO.components.product.inforegisterform.line18_2_so_dien_thoai_phai_dung")),
  email: z.string().email(i18nText("AUTO.components.product.inforegisterform.line19_3_email_khong_hop_le")).or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export default function InfoRegisterForm({
  productName,
  slug,
}: {
  productName?: string;
  slug: string;
}) {
  const { setLoading } = useStateStore();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", phone: "", email: "", address: "" },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [loading, startTransition] = useTransition();

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      try {
        setLoading(true);

        // Gọi API đăng ký nhận thông tin
        const payload = {
          fullname: data.fullName,
          phone: data.phone,
          email: data.email || "",
          address: data.address || "",
        };

        await productNotifyRegister(payload, slug);

        // Hiển thị thông báo thành công
        toast.success(i18nText("AUTO.components.product.inforegisterform.line62_4_dang_ky_nhan_thong_tin"), {
          description: i18nText("AUTO.components.product.inforegisterform.line63_5_se_nhan_vien_kinh_doanh"),
          duration: 4000,
        });

        // Reset form sau khi thành công
        reset();
      } catch (error) {
        console.error("Error registering product notify:", error);
        toast.error(i18nText("AUTO.components.product.inforegisterform.line71_6_gui_dang_ky_that_bai"), {
          description: i18nText("AUTO.components.product.inforegisterform.line72_7_vui_long_thu_lai_hoac"),
          duration: 4000,
        });
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="h-full rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Header - giảm padding */}
      <div className="px-3 py-2 border-b border-gray-200 flex items-center gap-2">
        <span className="text-base">🎁</span>
        <h3 className="text-md font-semibold text-gray-800">{i18nText("AUTO.components.product.inforegisterform.line87_8_dang_ky_nhan_thong_tin")}</h3>
      </div>

      {/* Form - giảm padding và spacing */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-3 space-y-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <InputField
                onChange={field.onChange}
                value={field.value}
                id="fullName"
                label={i18nText("AUTO.components.product.inforegisterform.line102_9_ho_ten_bat_buoc")}
                error={errors.fullName}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputField
                onChange={field.onChange}
                value={field.value}
                id="phone"
                label={i18nText("AUTO.components.product.inforegisterform.line115_10_so_dien_thoai_bat_buoc")}
                error={errors.phone}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                onChange={field.onChange}
                value={field.value}
                id="email"
                label={i18nText("AUTO.components.product.inforegisterform.line128_11_email_nhan_phan_hoi_qua")}
                type="email"
                error={errors.email}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <InputField
                onChange={field.onChange}
                value={field.value}
                id="address"
                label={i18nText("AUTO.components.product.inforegisterform.line142_12_dia_chi")}
                error={errors.address as any}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={!isValid || loading}
          variant="success"
          size="md"
          className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600 hover:from-indigo-600 hover:via-blue-600 hover:to-indigo-700"
        >
          {loading ? i18nText("AUTO.components.product.inforegisterform.line156_13_dang_gui") : i18nText("AUTO.components.product.inforegisterform.line156_14_dang_ky_nhan_thong_tin")}
        </Button>
      </form>
    </div>
  );
}

