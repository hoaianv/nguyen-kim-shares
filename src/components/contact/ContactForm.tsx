"use client";
import { i18nText } from "@/lib/i18nText";
import React, { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input";
import SelectField from "@/components/ui/select";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { useStateStore } from "@/stores/stateStore";
import {
  IContact,
  IContactCategory,
} from "@/interfaces/models/IContact.interface";
import { getValidData } from "@/lib/utils";
import { create } from "@/apis/models/contact.apis";

const contactSchema = z.object({
  name: z.string().min(1, i18nText("AUTO.components.contact.contactform.line19_0_ho_ten_bat_buoc")),
  email: z.string().email(i18nText("AUTO.components.contact.contactform.line20_1_email_khong_hop_le")).optional().or(z.literal("")),
  address: z.string().optional(),
  phone: z
    .string()
    .min(8, i18nText("AUTO.components.contact.contactform.line24_2_so_dien_thoai_khong_hop"))
    .max(15, i18nText("AUTO.components.contact.contactform.line25_3_so_dien_thoai_qua_dai")),
  staffId: z.string().min(1, i18nText("AUTO.components.contact.contactform.line26_4_vui_long_chon_bo_phan")), // select trả về string
  subject: z.string().min(1, i18nText("AUTO.components.contact.contactform.line27_5_vui_long_nhap_tieu_lien")),
  content: z.string().min(1, i18nText("AUTO.components.contact.contactform.line28_6_vui_long_nhap_noi_dung")),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  categories: IContactCategory[];
}

const ContactForm: React.FC<ContactFormProps> = ({ categories }) => {
  const { setLoading } = useStateStore();
  const [loading, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      staffId: "",
      subject: "",
      content: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: ContactFormData) => {
    startTransition(async () => {
      setLoading(true);

      try {
        const response = await create(data);

        if (getValidData(response)) {
          toast.success(response.message, {
            description: i18nText("AUTO.components.contact.contactform.line69_7_chung_toi_se_phan_hoi"),
            position: "top-center",
          });
          reset();
        } else {
          toast.success(response.message, {
            description: i18nText("AUTO.components.contact.contactform.line75_8_van_qua_trinh_gui_tu"),
            position: "top-center",
          });
        }
      } catch (err) {
        toast.error(i18nText("AUTO.components.contact.contactform.line80_9_loi_xay_ra"), {
          description: i18nText("AUTO.components.contact.contactform.line81_10_vui_long_thu_lai_sau"),
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
          <InputField {...field} id="name" label={i18nText("AUTO.components.contact.contactform.line97_11_ho_ten")} error={errors.name} />
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
            label={i18nText("AUTO.components.contact.contactform.extra110_0_email")}
            type="email"
            error={errors.email}
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
            label={i18nText("AUTO.components.contact.contactform.line124_12_dia_chi")}
            error={errors.address}
          />
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
            label={i18nText("AUTO.components.contact.contactform.line138_13_so_dien_thoai")}
            type="tel"
            error={errors.phone}
          />
        )}
      />

      {/* Bộ phận phụ trách */}
      <Controller
        name="staffId"
        control={control}
        render={({ field }) => (
          <SelectField
            id="staffId"
            label=""
            value={field.value}
            onChange={field.onChange}
            error={errors.staffId}
            options={categories.map((item) => ({
              value: item.id.toString(),
              label: item.title,
            }))}
            placeholder={i18nText("AUTO.components.contact.contactform.line160_14_chon_bo_phan")}
          />
        )}
      />

      {/* Tiêu đề */}
      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            id="subject"
            label={i18nText("AUTO.components.contact.contactform.line173_15_tieu_lien_he")}
            error={errors.subject}
          />
        )}
      />

      {/* Nội dung */}
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            id="content"
            label={i18nText("AUTO.components.contact.contactform.line187_16_noi_dung_lien_he")}
            type="textarea"
            error={errors.content}
          />
        )}
      />

      <Button
        disabled={!isValid || loading}
        variant="success"
        size="md"
        className="mt-3"
      >{i18nText("AUTO.components.contact.contactform.line200_17_gui_lien_he")}</Button>
    </form>
  );
};

export default ContactForm;
