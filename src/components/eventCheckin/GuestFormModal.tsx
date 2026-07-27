"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/ui/Modal";
import InputField from "@/components/ui/input";
import SelectField from "@/components/ui/select";
import Button from "@/components/ui/button";
import {
  IEventCheckinGuest,
  IEventCheckinGuestPayload,
  ECheckinStatus,
} from "@/interfaces/models/IEventCheckin.interface";

// ═══ ZOD SCHEMA (inline theo convention project) ═══
const guestFormSchema = z.object({
  name: z.string().min(1, "Tên khách hàng là bắt buộc"),
  companyName: z.string().optional(),
  position: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  saleName: z.string().optional(),
  status: z.nativeEnum(ECheckinStatus).optional(),
});

const STATUS_OPTIONS = [
  { value: ECheckinStatus.NotChecked, label: "Chưa check-in" },
  { value: ECheckinStatus.Checked, label: "Đã check-in" },
];

type GuestFormData = z.infer<typeof guestFormSchema>;

const EMPTY_DEFAULTS: GuestFormData = {
  name: "",
  companyName: "",
  position: "",
  email: "",
  phone: "",
  saleName: "",
  status: undefined,
};

// ═══ COMPONENT ═══
interface GuestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  guest: IEventCheckinGuest | null;
  onCreate: (data: IEventCheckinGuestPayload) => Promise<boolean>;
  onUpdate: (id: number, data: IEventCheckinGuestPayload) => Promise<boolean>;
}

export default function GuestFormModal({
  isOpen,
  onClose,
  guest,
  onCreate,
  onUpdate,
}: GuestFormModalProps) {
  const isEditMode = guest !== null;
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: EMPTY_DEFAULTS,
    mode: "onChange",
  });

  // Reset form khi modal mở hoặc đổi mode (create ↔ edit)
  useEffect(() => {
    if (isOpen) {
      reset(
        guest
          ? {
              name: guest.name,
              companyName: guest.companyName,
              position: guest.position ?? "",
              email: guest.email,
              phone: guest.phone,
              saleName: guest.saleName ?? "",
              status: guest.status,
            }
          : EMPTY_DEFAULTS
      );
    }
  }, [isOpen, guest, reset]);

  const onSubmit = async (data: GuestFormData) => {
    setSubmitting(true);
    try {
      if (isEditMode) {
        await onUpdate(guest.id, data);
      } else {
        await onCreate(data);
      }
      // Hook tự close modal + toast + refetch khi thành công
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Chỉnh sửa khách mời" : "Thêm khách mời"}
      size="lg"
      closeOnOverlayClick={!submitting}
      closeOnEscape={!submitting}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        {/* Row 1: Tên + Công ty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                id="guest-name"
                label="Tên khách hàng *"
                value={field.value}
                onChange={field.onChange}
                error={errors.name}
              />
            )}
          />
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <InputField
                id="guest-companyName"
                label="Tên công ty"
                value={field.value}
                onChange={field.onChange}
                error={errors.companyName}
              />
            )}
          />
        </div>

        {/* Row 2: Chức vụ + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <InputField
                id="guest-position"
                label="Chức vụ"
                value={field.value ?? ""}
                onChange={field.onChange}
                error={errors.position}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                id="guest-email"
                label="Email"
                value={field.value}
                onChange={field.onChange}
                error={errors.email}
              />
            )}
          />
        </div>

        {/* Row 3: SĐT + Sale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputField
                id="guest-phone"
                label="Số điện thoại"
                value={field.value}
                onChange={field.onChange}
                error={errors.phone}
              />
            )}
          />
          <Controller
            name="saleName"
            control={control}
            render={({ field }) => (
              <InputField
                id="guest-saleName"
                label="Sale phụ trách"
                value={field.value ?? ""}
                onChange={field.onChange}
                error={errors.saleName}
              />
            )}
          />
        </div>

        {/* Row 4: Trạng thái check-in (chỉ hiện khi edit) */}
        {isEditMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="guest-status"
                  label="Trạng thái check-in"
                  options={STATUS_OPTIONS}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors.status}
                />
              )}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors disabled:opacity-50"
          >
            Hủy
          </button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={submitting}
            loading={submitting}
          >
            {isEditMode ? "Cập nhật" : "Thêm khách"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
