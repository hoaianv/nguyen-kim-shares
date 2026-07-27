"use client";
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
  name: z.string().min(1, "Họ tên là bắt buộc"),
  phone: z
    .string()
    .min(8, "Số điện thoại không hợp lệ")
    .max(15, "Số điện thoại quá dài"),
  email: z.string().email("Email không hợp lệ"),
  company: z.string().min(1, "Vui lòng nhập tên công ty hoặc khách lẻ"),
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
  content: z.string().min(1, "Vui lòng nhập nội dung yêu cầu"),
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
            description: "Chúng tôi sẽ phản hồi bạn sớm nhất.",

            position: "top-center",
          });
          reset();
        } else {
          toast.success(response.message, {
            description: "Có vấn đề trong quá trình gửi tư vấn.",
            position: "top-center",
          });
        }
      } catch (err) {
        toast.error("Có lỗi xảy ra!", {
          description: "Vui lòng thử lại sau.",
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
          <InputField {...field} id="name" label="Họ tên" error={errors.name} />
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
            label="Số điện thoại"
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
            label="Email"
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
            label="Tên công ty / Khách lẻ"
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
            label="Địa chỉ"
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
            label="Nội dung"
            error={errors.content}
          />
        )}
      />

      <Button
        disabled={!isValid || loading}
        variant="success"
        size="md"
        className="mt-3"
      >
        Gửi yêu cầu báo giá
      </Button>
    </form>
  );
};

export default QuoteForm;
