"use client";
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
  fullName: z.string().min(1, "Họ tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  catId: z.string().min(1, "Chuyên mục là bắt buộc"),
  content: z.string().min(1, "Vui lòng nhập nội dung câu hỏi"),
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
            >
              Gửi câu hỏi ngay
            </Button>
          </div>
        </div>
      )}

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        size="md"
        title="Đặt câu hỏi tư vấn "
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="fullName"
                label="Họ tên"
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
                label="Email"
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
                label="Chuyên mục"
                value={field.value}
                onChange={field.onChange}
                error={errors.catId}
                options={advises.map((item) => ({
                  value: item.id.toString(),
                  label: item.title,
                }))}
                placeholder="Chọn chuyên mục "
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
                label="Nội dung câu hỏi"
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
      </Modal>
    </>
  );
};

export default FormAdvise;
