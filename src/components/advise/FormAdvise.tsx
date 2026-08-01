"use client";
import { i18nText } from "@/lib/i18nText";
import React, { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input";
import SelectField from "@/components/ui/select";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { useStateStore } from "@/stores/stateStore";
import { IAdvise } from "@/interfaces/models/IAdvise.interfaces";
import Modal from "@/components/ui/Modal";
import TextArea from "@/components/ui/TextArea";
import { create } from "@/apis/models/advise.apis";
import { getValidData } from "@/lib/utils";
import Image from "next/image";
import { bannerKeys } from "@/constants/values.constant";

const adviseSchema = z.object({
  fullName: z.string().min(1, i18nText("AUTO.components.advise.formadvise.line20_0_ho_ten_bat_buoc")),
  email: z.string().email(i18nText("AUTO.components.advise.formadvise.line21_1_email_khong_hop_le")),
  catId: z.string().min(1, i18nText("AUTO.components.advise.formadvise.line22_2_chuyen_muc_bat_buoc")),
  content: z.string().min(1, i18nText("AUTO.components.advise.formadvise.line23_3_vui_long_nhap_noi_dung")),
});

type AdviseFormData = z.infer<typeof adviseSchema>;

interface AdviseFormProps {
  advises: IAdvise[] | [];
}

const FormAdvise: React.FC<AdviseFormProps> = ({ advises }) => {
  const { setLoading, banner } = useStateStore();
  const [loading, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const advertise = banner?.[bannerKeys.bannerAdvise]?.advertises?.[0];

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AdviseFormData>({
    resolver: zodResolver(adviseSchema),
    defaultValues: {
      fullName: "",
      email: "",
      catId: "",
      content: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: AdviseFormData) => {
    startTransition(async () => {
      setLoading(true);

      try {
        const response = await create(data);

        if (getValidData(response)) {
          toast.success(response.message, {
            description: i18nText("AUTO.components.advise.formadvise.line63_4_chung_toi_se_phan_hoi"),
            position: "top-center",
          });
          reset();
        } else {
          toast.success(response.message, {
            description: i18nText("AUTO.components.advise.formadvise.line69_5_van_qua_trinh_gui_tu"),
            position: "top-center",
          });
        }
      } catch (err) {
        toast.error(i18nText("AUTO.components.advise.formadvise.line74_6_loi_xay_ra"), {
          description: i18nText("AUTO.components.advise.formadvise.line75_7_vui_long_thu_lai_sau"),
          position: "top-center",
        });
      } finally {
        setLoading(false);
        setOpen(false);
      }
    });
  };

  return (
    <>
      {advertise && (
        <div className="relative h-[235px] w-full">
          <Image
            src={advertise?.picture ?? ""}
            alt={advertise?.title ?? ""}
            fill
            className="object-cover" // hoặc object-contain tùy ý
          />
          <div className="absolute z-10 bottom-3 left-3">
            <Button
              onClick={() => setOpen(true)}
              variant={"success"}
              size="md"
              className="mt-3"
            >{i18nText("AUTO.components.advise.formadvise.line102_8_gui_cau_hoi_ngay")}</Button>
          </div>
        </div>
      )}

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        size="md"
        title={i18nText("AUTO.components.advise.formadvise.line112_9_dat_cau_hoi_tu_van")}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="fullName"
                label={i18nText("AUTO.components.advise.formadvise.line122_10_ho_ten")}
                error={errors.fullName}
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
                label={i18nText("AUTO.components.advise.formadvise.extra134_0_email")}
                type="email"
                error={errors.email}
              />
            )}
          />

          <Controller
            name="catId"
            control={control}
            render={({ field }) => (
              <SelectField
                id="catId"
                label={i18nText("AUTO.components.advise.formadvise.line148_11_chuyen_muc")}
                value={field.value}
                onChange={field.onChange}
                error={errors.catId}
                options={advises.map((item) => ({
                  value: item.id.toString(),
                  label: item.title,
                }))}
                placeholder={i18nText("AUTO.components.advise.formadvise.line156_12_chon_chuyen_muc")}
              />
            )}
          />

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                id="content"
                label={i18nText("AUTO.components.advise.formadvise.line168_13_noi_dung_cau_hoi")}
                error={errors.content}
              />
            )}
          />

          <Button
            disabled={!isValid || loading}
            variant="success"
            size="md"
            className="mt-3"
          >{i18nText("AUTO.components.advise.formadvise.line180_14_gui_lien_he")}</Button>
        </form>
      </Modal>
    </>
  );
};

export default FormAdvise;
