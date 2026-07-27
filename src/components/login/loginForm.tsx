"use client";
import React, { useTransition, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/input";
import Button from "@/components/ui/button";
import ForgotPasswordModal from "../account/forgotPassword";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { login } from "@/apis/common/auth.apis";
import { useStateStore } from "@/stores/stateStore";

const loginSchema = z.object({
  username: z.string().min(1, "Tên tài khoản là bắt buộc"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { setLoading } = useStateStore();
  const [showForgotModal, setShowForgotModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (data: LoginFormData) => {
    startTransition(async () => {
      setLoading(true);
      const response = await login(data);
      setLoading(false);

      if (response?.status && response?.errorCode === 200) {
        reset();
        router.push("/");
        toast.success(response.message, {
          description: "Chào mừng bạn đến với hệ thống!",
          position: "top-center",
        });
      } else {
        toast.error(response.message, {
          description: "Tài khoản hoặc mật khẩu chưa đúng!",
          position: "top-center",
        });
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <InputField
              onChange={field.onChange}
              value={field.value}
              id="username"
              label="Tên tài khoản"
              error={errors.username}
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
              label="Mật khẩu"
              type="password"
              error={errors.password}
            />
          )}
        />

        <div className="text-end">
          <button
            type="button"
            onClick={() => setShowForgotModal(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium underline hover:no-underline transition-colors duration-200"
          >
            Quên mật khẩu?
          </button>
        </div>

        <Button
          disabled={!isValid || loading}
          variant="success"
          size="md"
          className="mt-3"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />
    </>
  );
};

export default LoginForm;
