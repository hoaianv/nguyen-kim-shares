"use client";

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
  fullName: z.string().min(1, "Họ tên là bắt buộc"),
  phone: z
    .string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^\d{10}$/, "Số điện thoại phải có đúng 10 chữ số"),
  email: z.string().email("Email không hợp lệ").or(z.literal("")),
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
        toast.success("Đăng ký nhận thông tin đã được gửi", {
          description: "Sẽ có nhân viên kinh doanh liên hệ với bạn",
          duration: 4000,
        });

        // Reset form sau khi thành công
        reset();
      } catch (error) {
        console.error("Error registering product notify:", error);
        toast.error("Gửi đăng ký thất bại", {
          description: "Vui lòng thử lại hoặc liên hệ hotline để được hỗ trợ",
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
        <h3 className="text-md font-semibold text-gray-800">
          ĐĂNG KÝ NHẬN THÔNG TIN
        </h3>
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
                label="Họ tên (bắt buộc)"
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
                label="Số điện thoại (bắt buộc)"
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
                label="Email (để nhận phản hồi qua email)"
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
                label="Địa chỉ"
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
          {loading ? "Đang gửi..." : "Đăng ký nhận thông tin"}
        </Button>
      </form>
    </div>
  );
}

