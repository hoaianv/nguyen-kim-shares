"use client";
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
  name: z.string().min(1, "Họ tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  address: z.string().optional(),
  phone: z
    .string()
    .min(8, "Số điện thoại không hợp lệ")
    .max(15, "Số điện thoại quá dài"),
  staffId: z.string().min(1, "Vui lòng chọn bộ phận"), // select trả về string
  subject: z.string().min(1, "Vui lòng nhập tiêu đề liên hệ"),
  content: z.string().min(1, "Vui lòng nhập nội dung liên hệ"),
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
            placeholder="Chọn bộ phận"
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
            label="Tiêu đề liên hệ"
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
            label="Nội dung liên hệ"
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
      >
        Gửi liên hệ
      </Button>
    </form>
  );
};

export default ContactForm;
