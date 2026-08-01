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
import TextArea from "@/components/ui/TextArea";
import FileUpload from "@/components/ui/FileUpload";
import { create } from "@/apis/models/recruitment.apis";
import { getValidData } from "@/lib/utils";
import { ALLOWED_DOCS, ALLOWED_IMAGES, MAX_5MB } from "@/constants";
import { useParams } from "next/navigation";

const CvFileSchema = z
  .any()
  .refine((v) => v instanceof FileList && v.length === 1, i18nText("AUTO.components.recruitmentdetail.formapply.line19_0_vui_long_len_cv"))
  .refine(
    (v) => ALLOWED_DOCS.includes(v?.[0]?.type),
    i18nText("AUTO.components.recruitmentdetail.formapply.line22_1_cv_phai_pdf_doc_hoac")
  )
  .refine(
    (v) => v?.[0]?.size <= MAX_5MB,
    i18nText("AUTO.components.recruitmentdetail.formapply.line26_2_kich_thuoc_cv_khong_duoc")
  );

const ExtraFileSchema = z
  .any()
  .refine(
    (v) => v instanceof FileList && v.length === 1,
    i18nText("AUTO.components.recruitmentdetail.formapply.line33_3_vui_long_nop_phieu_thong")
  )
  .refine((v) => {
    const t = v?.[0]?.type;
    return [...ALLOWED_DOCS, ...ALLOWED_IMAGES].includes(t);
  }, i18nText("AUTO.components.recruitmentdetail.formapply.line38_4_file_bo_sung_phai_pdf"))
  .refine((v) => v?.[0]?.size <= MAX_5MB, i18nText("AUTO.components.recruitmentdetail.formapply.line39_5_file_bo_sung_khong_vuot"));

const FormApplySchema = z.object({
  name: z
    .string()
    .min(1, i18nText("AUTO.components.recruitmentdetail.formapply.line44_6_ho_ten_bat_buoc"))
    .min(2, i18nText("AUTO.components.recruitmentdetail.formapply.line45_7_ho_ten_phai_it_nhat"))
    .max(100, i18nText("AUTO.components.recruitmentdetail.formapply.line46_8_ho_ten_khong_duoc_qua")),

  email: z
    .string()
    .min(1, i18nText("AUTO.components.recruitmentdetail.formapply.line50_9_email_bat_buoc"))
    .email(i18nText("AUTO.components.recruitmentdetail.formapply.line51_10_email_khong_hop_le"))
    .max(100, i18nText("AUTO.components.recruitmentdetail.formapply.line52_11_email_khong_duoc_qua_100")),

  phone: z
    .string()
    .min(1, i18nText("AUTO.components.recruitmentdetail.formapply.line56_12_so_dien_thoai_bat_buoc"))
    .regex(/^[0-9+\-\s\(\)]{10,15}$/, i18nText("AUTO.components.recruitmentdetail.formapply.line57_13_so_dien_thoai_khong_hop"))
    .min(10, i18nText("AUTO.components.recruitmentdetail.formapply.line58_14_so_dien_thoai_phai_it")),

  message: z
    .string()
    .min(1, i18nText("AUTO.components.recruitmentdetail.formapply.line62_15_loi_nhan_bat_buoc"))
    .min(10, i18nText("AUTO.components.recruitmentdetail.formapply.line63_16_loi_nhan_phai_it_nhat"))
    .max(1000, i18nText("AUTO.components.recruitmentdetail.formapply.line64_17_loi_nhan_khong_duoc_qua")),

  cv: CvFileSchema,
  fileInfo: ExtraFileSchema,
});

type JobApplicationFormData = z.infer<typeof FormApplySchema>;

const FormApply = () => {
  const params = useParams();
  const { slug } = params;
  const { setLoading } = useStateStore();
  const [loading, startTransition] = useTransition();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<JobApplicationFormData>({
    resolver: zodResolver(FormApplySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      cv: null as unknown as FileList,
      fileInfo: null as unknown as FileList,
    },

    mode: "onChange",
    reValidateMode: "onChange",
  });
 
  const onSubmit = (data: JobApplicationFormData) => {
    startTransition(async () => {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("message", data.message);
        formData.append("slug", Array.isArray(slug) ? slug[0] : slug);
        if (data.cv?.length) {
          formData.append("cv", data.cv[0]);
        }

        if (data.fileInfo?.length) {
          formData.append("fileInfo", data.fileInfo[0]);
        }

        const response = await create(formData);

        if (getValidData(response)) {
          reset();
          toast.success(response.message, {
            description: i18nText("AUTO.components.recruitmentdetail.formapply.line121_18_chung_toi_se_lien_he"),
            position: "top-center",
          });
        } else {
          toast.error(response.message, {
            description: i18nText("AUTO.components.recruitmentdetail.formapply.line126_19_vui_long_kiem_tra_lai"),
            position: "top-center",
          });
        }
      } catch (error) {
        console.error("Error submitting job application:", error);
        toast.error(i18nText("AUTO.components.recruitmentdetail.formapply.line132_20_loi_ket_noi"), {
          description: i18nText("AUTO.components.recruitmentdetail.formapply.line133_21_vui_long_kiem_tra_ket"),
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-3    rounded-lg shadow-lg">
      <div
        className=" pr-2 max-h-[600px] overflow-y-auto 
               scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 
               hover:scrollbar-thumb-gray-400"
      >
        <div className="mb-6">
          <p className="text-gray-600">{i18nText("AUTO.components.recruitmentdetail.formapply.line151_22_vui_long_dien_day_du")}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Họ và tên */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                onChange={field.onChange}
                value={field.value}
                id="name"
                label={i18nText("AUTO.components.recruitmentdetail.formapply.line165_23_ho_ten")}
                error={errors.name}
              />
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                onChange={field.onChange}
                value={field.value}
                id="email"
                label={i18nText("AUTO.components.recruitmentdetail.formapply.line180_24_email")}
                type="email"
                error={errors.email}
              />
            )}
          />

          {/* Số điện thoại */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputField
                onChange={field.onChange}
                value={field.value}
                id="phone"
                label={i18nText("AUTO.components.recruitmentdetail.formapply.line196_25_so_dien_thoai")}
                type="tel"
                error={errors.phone}
              />
            )}
          />

          {/* Lời nhắn */}
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextArea
                onChange={field.onChange}
                value={field.value}
                id="message"
                label={i18nText("AUTO.components.recruitmentdetail.formapply.line212_26_loi_nhan")}
                placeholder={i18nText("AUTO.components.recruitmentdetail.formapply.line213_27_hay_chung_toi_biet_ly")}
                rows={4}
                error={errors.message}
              />
            )}
          />

          {/* CV Upload */}
          <Controller
            name="cv"
            control={control}
            render={({ field }) => (
              <FileUpload
                id="cv"
                label={i18nText("AUTO.components.recruitmentdetail.formapply.line227_28_cv_resume")}
                accept={i18nText("AUTO.components.recruitmentdetail.formapply.line228_29_pdf_doc_docx")}
                multiple={false}
                value={field.value ?? null}
                onChange={field.onChange}
                error={errors.cv}
                helperText={i18nText("AUTO.components.recruitmentdetail.formapply.line233_30_chap_nhan_pdf_doc_docx")}
              />
            )}
          />

          {/* File bổ sung */}
          <Controller
            name="fileInfo"
            control={control}
            render={({ field }) => (
              <FileUpload
                id="fileInfo"
                label={i18nText("AUTO.components.recruitmentdetail.formapply.line245_31_phieu_thong_tin_ung_vien")}
                accept={i18nText("AUTO.components.recruitmentdetail.formapply.line246_32_pdf_doc_docx_jpg_jpeg")}
                multiple={false}
                value={field.value ?? null}
                onChange={field.onChange}
                error={errors.fileInfo}
                helperText={i18nText("AUTO.components.recruitmentdetail.formapply.line251_33_chi_1_file_toi_da")}
              />
            )}
          />

          {/* Submit button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={!isValid || loading}
              variant="success"
              size="lg"
              className="w-full"
            >
              {loading ? i18nText("AUTO.components.recruitmentdetail.formapply.line265_34_dang_gui") : i18nText("AUTO.components.recruitmentdetail.formapply.line265_35_gui_don_ung_tuyen")}
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-center text-sm text-gray-500">
            <p>{i18nText("AUTO.components.recruitmentdetail.formapply.line272_36_bang_viec_gui_don_ung")}{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">{i18nText("AUTO.components.recruitmentdetail.formapply.line274_37_chinh_sach_bao_mat")}</a>{" "}{i18nText("AUTO.components.recruitmentdetail.formapply.line276_38_chung_toi")}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormApply;

