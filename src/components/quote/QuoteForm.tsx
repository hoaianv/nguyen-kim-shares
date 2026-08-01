"use client";
import { i18nText } from "@/lib/i18nText";
import React, { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { useStateStore } from "@/stores/stateStore";
import { getValidData } from "@/lib/utils";
import { create } from "@/apis/models/quote.apis";
import TextArea from "@/components/ui/TextArea";

const requestSchema = z.object({
  name: z.string().min(1, i18nText("AUTO.components.quote.quoteform.line15_0_ho_ten_bat_buoc")),
  phone: z
    .string()
    .min(8, i18nText("AUTO.components.quote.quoteform.line18_1_so_dien_thoai_khong_hop"))
    .max(15, i18nText("AUTO.components.quote.quoteform.line19_2_so_dien_thoai_qua_dai")),
  email: z.string().email(i18nText("AUTO.components.quote.quoteform.line20_3_email_khong_hop_le")),
  company: z.string().min(1, i18nText("AUTO.components.quote.quoteform.line21_4_vui_long_nhap_ten_cong")),
  address: z.string().min(1, i18nText("AUTO.components.quote.quoteform.line22_5_dia_chi_bat_buoc")),
  content: z.string().min(1, i18nText("AUTO.components.quote.quoteform.line23_6_vui_long_nhap_noi_dung")),
});

type RequestFormData = z.infer<typeof requestSchema>;

const QuoteForm = () => {
  const { setLoading } = useStateStore();
  const [loading, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      company: "",
      address: "",
      content: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: RequestFormData) => {
    startTransition(async () => {
      setLoading(true);

      try {
        const response = await create(data);

        if (getValidData(response)) {
          toast.success(response.message, {
            description: i18nText("AUTO.components.quote.quoteform.line59_7_chung_toi_se_phan_hoi"),

            position: "top-center",
          });
          reset();
        } else {
          toast.success(response.message, {
            description: i18nText("AUTO.components.quote.quoteform.line66_8_van_qua_trinh_gui_tu"),
            position: "top-center",
          });
        }
      } catch (err) {
        toast.error(i18nText("AUTO.components.quote.quoteform.line71_9_loi_xay_ra"), {
          description: i18nText("AUTO.components.quote.quoteform.line72_10_vui_long_thu_lai_sau"),
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      {/* Họ tên */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <InputField {...field} id="name" label={i18nText("AUTO.components.quote.quoteform.line88_11_ho_ten")} error={errors.name} />
        )}
      />

      {/* Số điện thoại */}
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            id="phone"
            label={i18nText("AUTO.components.quote.quoteform.line100_12_so_dien_thoai")}
            type="tel"
            error={errors.phone}
          />
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            id="email"
            label={i18nText("AUTO.components.quote.quoteform.extra116_0_email")}
            type="email"
            error={errors.email}
          />
        )}
      />

      {/* Công ty / Khách lẻ */}
      <Controller
        name="company"
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            id="company"
            label={i18nText("AUTO.components.quote.quoteform.line130_13_ten_cong_ty_khach_le")}
            error={errors.company}
          />
        )}
      />

      {/* Địa chỉ */}
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            id="address"
            label={i18nText("AUTO.components.quote.quoteform.line144_14_dia_chi")}
            error={errors.address}
          />
        )}
      />

      {/* Nội dung */}
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            id="content"
            label={i18nText("AUTO.components.quote.quoteform.line158_15_noi_dung")}
            error={errors.content}
          />
        )}
      />

      <Button
        disabled={!isValid || loading}
        variant="success"
        size="md"
        className="mt-3"
      >{i18nText("AUTO.components.quote.quoteform.line170_16_gui_yeu_cau_bao_gia")}</Button>
    </form>
  );
};

export default QuoteForm;
