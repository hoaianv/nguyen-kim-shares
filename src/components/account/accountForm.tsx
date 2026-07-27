"use client";
import { FC, useEffect, useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input";
import Button from "@/components/ui/button";
import DateTimePicker from "@/components/ui/dateTimePicker";
import SelectField from "@/components/ui/select";

import { useAuthStore } from "@/stores/useAuth";
import { fromISODateOnly, toISODateOnly } from "@/until";
import { update } from "@/apis/common/auth.apis";
import { useStateStore } from "@/stores/stateStore";
import { toast } from "sonner";

const updateSchema = z.object({
  fullName: z.string().min(1, "Họ tên là bắt buộc"),
  phone: z
    .string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^(0|\+84)[1-9][0-9]{8,9}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
  gender: z.enum(["male", "female", "other"], {
    message: "Giới tính là bắt buộc",
  }),
  dateOfBirth: z.date().nullable().optional(),
});

type UpdateFormData = z.infer<typeof updateSchema>;

const UpdateUserForm: FC = () => {
  const { user } = useAuthStore();
  const [disabled, setDisabled] = useState(true);
  const [loading, startTransition] = useTransition();
  const { setLoading } = useStateStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!user) return;
    reset({
      fullName: user.fullName || "",
      phone: user.phone || "",
      email: user.email || "",
      gender: (user.gender as "male" | "female" | "other") || "other",
      dateOfBirth: fromISODateOnly(user.dateOfBirth),
    });
  }, [user, reset]);

  const onSubmit = (data: UpdateFormData) => {
    startTransition(async () => {
      setLoading(true);

      const payload = {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        gender: data.gender,
        dateOfBirth: toISODateOnly(data.dateOfBirth),
      };

      const response = await update(payload);
      setLoading(false);

      if (response?.status && response?.errorCode === 200) {
        toast.success(response.message, {
          description: "Bạn đã cập nhật thông tin thành công",
          position: "top-center",
        });
      } else {
        toast.error(response.message, {
          description: "Có lỗi trong quá trình cập nhật thông tin",
          position: "top-center",
        });
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <span className="text-lg font-medium">Thông tin tài khoản</span>
        <span
          className="text-sm text-[#3f68e0] cursor-pointer"
          onClick={() => setDisabled(false)}
        >
          Chỉnh sửa
        </span>
      </div>
      {user && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Thông tin cá nhân */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-md font-medium mb-3">Thông tin cá nhân</h3>

            {/* Username (chỉ xem) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="username"
                label="Tên đăng nhập"
                value={user?.username ?? ""}
                readonly
              />
            </div>

            {/* 3 field được update: fullName, phone, email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <InputField
                    id="fullName"
                    label="Họ và tên"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.fullName}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <InputField
                    id="phone"
                    label="Số điện thoại"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.phone}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputField
                    id="email"
                    label="Email"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.email}
                  />
                )}
              />
              {/* gender (update) */}
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <SelectField
                    id="gender"
                    label=""
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.gender}
                    options={[
                      { value: "male", label: "Nam" },
                      { value: "female", label: "Nữ" },
                      { value: "other", label: "Khác" },
                    ]}
                    placeholder="Chọn giới tính"
                  />
                )}
              />
            </div>

            {/* dateOfBirth (update) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    onChange={(date) => field.onChange(date)}
                    value={field.value}
                    minYear={1950}
                    maxYear={2010}
                    placeholder="Chọn ngày sinh"
                    className="w-full max-w-sm"
                  />
                )}
              />
              {/* chừa trống cột phải cho gọn layout */}
              <div />
            </div>
          </div>

          {/* Thông tin công ty (chỉ xem) */}
          <div>
            <div className="flex items-baseline gap-2 mb-3">
              <h3 className="text-md font-medium leading-none">
                Thông tin công ty
              </h3>
              <span className="text-gray-400 text-xs leading-none">
                (Không thể chỉnh sửa)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="companyName"
                label="Tên công ty"
                value={user?.companyName ?? ""}
                readonly
              />
              <InputField
                id="taxCode"
                label="Mã số thuế"
                value={user?.taxCode ?? ""}
                readonly
              />
            </div>

            <InputField
              id="companyAddress"
              label="Địa chỉ công ty"
              value={user?.companyAddress ?? ""}
              readonly
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <InputField
                id="companyPhone"
                label="Số điện thoại công ty"
                value={user?.companyPhone ?? ""}
                readonly
              />
              <InputField
                id="companyEmail"
                label="Email công ty"
                value={user?.companyEmail ?? ""}
                readonly
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#e6e6e6]">
            <Button
              variant={"primary"}
              size="md"
              className="mt-3"
              type="submit"
              disabled={loading || !isValid}
            >
              Cập nhật
            </Button>

            {!disabled && (
              <Button
                onClick={() => setDisabled(true)}
                variant={"outline"}
                size="xs"
                className="mt-3"
                type="button"
              >
                Hủy bỏ
              </Button>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateUserForm;
