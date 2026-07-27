"use client";

import type React from "react";
import { useTransition, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/button";
import InputField from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useStateStore } from "@/stores/stateStore";
import { resetPassword } from "@/apis/common/auth.apis";

const resetPasswordSchema = z
  .object({
    email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
    password: z
      .string()
      .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
      .min(1, "Mật khẩu mới là bắt buộc"),
    passwordConfirm: z.string().min(1, "Xác nhận mật khẩu là bắt buộc"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["passwordConfirm"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const { setLoading } = useStateStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const emailFromUrl = searchParams.get("email");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [loading, startTransition] = useTransition();

  // Watch all form values
  const watchedValues = watch();
  const isFormComplete =
    watchedValues.email &&
    watchedValues.password &&
    watchedValues.passwordConfirm &&
    watchedValues.password.length >= 6 &&
    watchedValues.password === watchedValues.passwordConfirm;

  // Set email from URL
  useEffect(() => {
    if (emailFromUrl) {
      setValue("email", emailFromUrl);
    }
  }, [emailFromUrl, setValue]);

  const onSubmit = (data: ResetPasswordFormData) => {
    startTransition(async () => {
      setLoading(true);

      try {
        const response = await resetPassword(
          {
            password: data.password,
            passwordConfirm: data.passwordConfirm,
          },
          token!,
          emailFromUrl!
        );

        setLoading(false);

        if (response?.status && response?.errorCode === 200) {
          reset();
          toast.success("Thành công!", {
            description: "Mật khẩu đã được đặt lại thành công!",
            position: "top-center",
            duration: 2000,
          });

          // Redirect to login after success
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          toast.error(response.message || "Có lỗi xảy ra!", {
            description: "Vui lòng thử lại sau",
            position: "top-center",
          });
        }
      } catch (error) {
        setLoading(false);
        toast.error("Có lỗi xảy ra!", {
          description: "Vui lòng thử lại sau",
          position: "top-center",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              onChange={field.onChange}
              value={emailFromUrl || field.value}
              id="email"
              label="Email"
              type="email"
              disabled={true}
              error={errors.email}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              onChange={field.onChange}
              value={field.value}
              id="password"
              label="Mật khẩu mới"
              type="password"
              error={errors.password}
            />
          )}
        />

        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field }) => (
            <InputField
              onChange={field.onChange}
              value={field.value}
              id="passwordConfirm"
              label="Xác nhận mật khẩu mới"
              type="password"
              error={errors.passwordConfirm}
            />
          )}
        />

        <Button
          type="submit"
          disabled={!isValid || loading || !isFormComplete}
          variant="success"
          size="md"
          className="w-full"
        >
          {loading ? "Đang đặt lại mật khẩu..." : "Đặt lại mật khẩu"}
        </Button>

        {/* Progress indicator */}
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${emailFromUrl || watchedValues.email
                  ? "bg-green-500"
                  : "bg-gray-300"
                }`}
            ></span>
            <span>Email xác thực</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${watchedValues.password && watchedValues.password.length >= 6
                  ? "bg-green-500"
                  : "bg-gray-300"
                }`}
            ></span>
            <span>Mật khẩu mới (tối thiểu 6 ký tự)</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${watchedValues.passwordConfirm &&
                  watchedValues.password === watchedValues.passwordConfirm
                  ? "bg-green-500"
                  : "bg-gray-300"
                }`}
            ></span>
            <span>Xác nhận mật khẩu khớp</span>
          </div>
        </div>
      </form>

      {/* Back to login link */}
      <div className="text-center">
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 text-sm font-medium underline hover:no-underline transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại trang đăng nhập
        </Link>
      </div>
    </div>
  );
}
