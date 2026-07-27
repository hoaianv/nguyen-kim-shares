"use client";
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
  .refine((v) => v instanceof FileList && v.length === 1, "Vui lòng tải lên CV")
  .refine(
    (v) => ALLOWED_DOCS.includes(v?.[0]?.type),
    "CV phải là PDF, DOC hoặc DOCX"
  )
  .refine(
    (v) => v?.[0]?.size <= MAX_5MB,
    "Kích thước CV không được vượt quá 5MB"
  );

const ExtraFileSchema = z
  .any()
  .refine(
    (v) => v instanceof FileList && v.length === 1,
    "Vui lòng nộp Phiếu thông tin ứng viên: tải mẫu, điền và tải lên tại đây"
  )
  .refine((v) => {
    const t = v?.[0]?.type;
    return [...ALLOWED_DOCS, ...ALLOWED_IMAGES].includes(t);
  }, "File bổ sung phải là PDF, DOC, DOCX, JPG, PNG hoặc GIF")
  .refine((v) => v?.[0]?.size <= MAX_5MB, "File bổ sung không vượt quá 5MB");

const FormApplySchema = z.object({
  name: z
    .string()
    .min(1, "Họ và tên là bắt buộc")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(100, "Họ và tên không được quá 100 ký tự"),

  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ")
    .max(100, "Email không được quá 100 ký tự"),

  phone: z
    .string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^[0-9+\-\s\(\)]{10,15}$/, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại phải có ít nhất 10 số"),

  message: z
    .string()
    .min(1, "Lời nhắn là bắt buộc")
    .min(10, "Lời nhắn phải có ít nhất 10 ký tự")
    .max(1000, "Lời nhắn không được quá 1000 ký tự"),

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
            description: "Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.",
            position: "top-center",
          });
        } else {
          toast.error(response.message, {
            description: "Vui lòng kiểm tra lại thông tin và thử lại.",
            position: "top-center",
          });
        }
      } catch (error) {
        console.error("Error submitting job application:", error);
        toast.error("Lỗi kết nối", {
          description: "Vui lòng kiểm tra kết nối internet và thử lại.",
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
          <p className="text-gray-600">
            Vui lòng điền đầy đủ thông tin để chúng tôi có thể liên hệ với bạn.
          </p>
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
                label="Họ và tên *"
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
                label="Email *"
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
                label="Số điện thoại *"
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
                label="Lời nhắn *"
                placeholder="Hãy cho chúng tôi biết lý do bạn muốn ứng tuyển vị trí này..."
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
                label="CV/Resume *"
                accept=".pdf,.doc,.docx"
                multiple={false}
                value={field.value ?? null}
                onChange={field.onChange}
                error={errors.cv}
                helperText="Chấp nhận PDF, DOC, DOCX (tối đa 5MB)"
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
                label="Phiếu thông tin ứng viên *"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                multiple={false}
                value={field.value ?? null}
                onChange={field.onChange}
                error={errors.fileInfo}
                helperText="Chỉ 1 file, tối đa 5MB"
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
              {loading ? "Đang gửi..." : "Gửi đơn ứng tuyển"}
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Bằng việc gửi đơn ứng tuyển, bạn đồng ý với{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                chính sách bảo mật
              </a>{" "}
              của chúng tôi.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormApply;

