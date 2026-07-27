"use client";
import React, { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CheckboxField from "@/components/ui/checkboxField";
import { register } from "@/apis/common/auth.apis";
import { useStateStore } from "@/stores/stateStore";

const registerSchema = z
  .object({
    username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
      ),
    password_confirmation: z
      .string()
      .min(1, "Xác nhận mật khẩu là bắt buộc")
      .optional(),
    name: z.string().min(1, "Họ tên người đại diện là bắt buộc"),
    email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
    phone: z
      .string()
      .min(1, "Số điện thoại là bắt buộc")
      .regex(/^(0|\+84)[1-9][0-9]{8,9}$/, "Số điện thoại không hợp lệ"),
    receiverName: z.string().min(1, "Họ và tên người nhận là bắt buộc"),
    address: z.string().min(1, "Địa chỉ nhận hàng là bắt buộc"),
    companyName: z.string().min(1, "Tên công ty là bắt buộc"),
    taxCode: z
      .string()
      .min(10, "Mã số thuế từ 10-13 ký tự số")
      .max(13, "Mã số thuế từ 10-13 ký tự số")
      .regex(/^\d{10,13}$/, "Mã số thuế chỉ gồm số, 10-13 ký tự"),
    companyEmail: z
      .string()
      .email("Email công ty không hợp lệ")
      .min(1, "Email công ty là bắt buộc"),
    companyPhone: z
      .string()
      .min(1, "Số điện thoại công ty là bắt buộc")
      .regex(/^(0|\+84)[1-9][0-9]{8,9}$/, "Số điện thoại công ty không hợp lệ"),
    companyAddress: z.string().min(1, "Địa chỉ công ty là bắt buộc"),
  })
  .refine(
    (data) =>
      !data.password ||
      !data.password_confirmation ||
      data.password === data.password_confirmation,
    {
      message: "Mật khẩu và xác nhận mật khẩu không trùng khớp",
      path: ["password_confirmation"],
    }
  );

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const { setLoading } = useStateStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      password_confirmation: "",
      name: "",
      email: "",
      phone: "",
      receiverName: "",
      address: "",
      companyName: "",
      taxCode: "",
      companyEmail: "",
      companyPhone: "",
      companyAddress: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState<string | null>(null);

  const onSubmit = (data: RegisterFormData) => {
    if (!agree) {
      setAgreeError("Vui lòng đồng ý Điều khoản sử dụng và Chính sách bảo mật");
      return;
    }
    setAgreeError(null);

    startTransition(async () => {
      try {
        setLoading(true);
        const response = await register(data);
        if (response?.status && response?.errorCode === 200) {
          reset();
          setAgree(false);
          toast.success("Đăng ký thành công", {
            description:
              "Tài khoản của bạn sẽ được kích hoạt sau khi xác minh. Bạn có thể đăng nhập ngay khi tài khoản được kích hoạt.",
            position: "top-center",
            action: {
              label: "Đăng nhập",
              onClick: () => router.push("/login"),
            },
          });
        } else {
          toast.error(response?.message || "Đăng ký thất bại", {
            description: "Vui lòng kiểm tra lại thông tin.",
            position: "top-center",
          });
        }
      } catch (err: any) {
        toast.error("Đăng ký thất bại", {
          description: err?.message || "Vui lòng thử lại sau.",
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Cụm 1: Tài khoản / Người đại diện */}
      <fieldset className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
        <legend className="px-2 text-md font-semibold text-neutral-800">
          Thông tin tài khoản / Người đại diện
        </legend>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 [&>*:last-child]:mb-0 [&>*:nth-last-child(2)]:mb-0">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <InputField
                id="username"
                label="Tên đăng nhập"
                value={field.value}
                onChange={field.onChange}
                error={errors.username}
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                id="name"
                label="Họ tên người đại diện"
                value={field.value}
                onChange={field.onChange}
                error={errors.name}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputField
                id="password"
                label="Mật khẩu"
                type="password"
                value={field.value}
                onChange={field.onChange}
                error={errors.password}
              />
            )}
          />

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
          <Controller
            name="password_confirmation"
            control={control}
            render={({ field }) => (
              <InputField
                id="password_confirmation"
                label="Xác nhận mật khẩu"
                type="password"
                value={field.value}
                onChange={field.onChange}
                error={errors.password_confirmation}
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
      </fieldset>

      {/* Cụm 2: Nhận hàng */}
      <fieldset className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
        <legend className="px-2 text-md font-semibold text-neutral-800">
          Thông tin nhận hàng
        </legend>
        <div className="mt-4 grid grid-cols-1 gap-4 [&>*:last-child]:mb-0">
          <Controller
            name="receiverName"
            control={control}
            render={({ field }) => (
              <InputField
                id="receiverName"
                label="Họ và tên người nhận"
                value={field.value}
                onChange={field.onChange}
                error={errors.receiverName}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <InputField
                id="address"
                label="Địa chỉ nhận hàng"
                value={field.value}
                onChange={field.onChange}
                error={errors.address}
              />
            )}
          />
        </div>
      </fieldset>

      {/* Cụm 3: Công ty */}
      <fieldset className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
        <legend className="px-2 text-md font-semibold text-neutral-800">
          Thông tin công ty
        </legend>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <InputField
                id="companyName"
                label="Tên công ty"
                value={field.value}
                onChange={field.onChange}
                error={errors.companyName}
              />
            )}
          />
          <Controller
            name="taxCode"
            control={control}
            render={({ field }) => (
              <InputField
                id="taxCode"
                label="Mã số thuế"
                value={field.value}
                onChange={field.onChange}
                error={errors.taxCode}
              />
            )}
          />
          <Controller
            name="companyEmail"
            control={control}
            render={({ field }) => (
              <InputField
                id="companyEmail"
                label="Email công ty"
                value={field.value}
                onChange={field.onChange}
                error={errors.companyEmail}
              />
            )}
          />
          <Controller
            name="companyPhone"
            control={control}
            render={({ field }) => (
              <InputField
                id="companyPhone"
                label="Số điện thoại công ty"
                value={field.value}
                onChange={field.onChange}
                error={errors.companyPhone}
              />
            )}
          />
        </div>
        <div className="[&>*:last-child]:mb-0">
          <Controller
            name="companyAddress"
            control={control}
            render={({ field }) => (
              <InputField
                id="companyAddress"
                label="Địa chỉ công ty"
                value={field.value}
                onChange={field.onChange}
                error={errors.companyAddress}
              />
            )}
          />
        </div>
      </fieldset>

      {/* Điều khoản */}
      <div className="space-y-2">
        <div className="flex w-full justify-center">
          <label className="flex max-w-[720px] items-center justify-center text-sm text-neutral-700">
            <CheckboxField
              id="agree"
              checked={agree}
              onChange={() => {
                setAgree((v) => !v);
                if (agreeError) setAgreeError(null);
              }}
            />
            <span className="text-center">
              Tôi đã đồng ý{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                Điều khoản sử dụng
              </Link>{" "}
              &{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                Chính sách bảo mật của Nguyên Kim
              </Link>
            </span>
          </label>
        </div>
        {agreeError && (
          <p className="text-center text-sm text-red-600">{agreeError}</p>
        )}
      </div>

      {/* Nút tạo tài khoản */}
      <Button
        type="submit"
        disabled={!isValid || loading || !agree}
        className="w-full"
      >
        {loading ? "Đang xử lý..." : "Tạo tài khoản"}
      </Button>

      {/* Link đăng nhập */}
      <p className="text-center text-sm text-neutral-700">
        Bạn đã có tài khoản?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Đăng nhập
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;

