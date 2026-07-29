"use client";

import { useState, useRef, useEffect, useId, useCallback } from "react";

type Side = "top" | "bottom" | "left" | "right";

interface ConfirmPopoverProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  position?: Side;
  offset?: number;
  onConfirm: () => void;
  onCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  variant?: "danger" | "primary";
}

export default function ConfirmPopover({
  trigger,
  title = "Xác nhận xóa",
  description = "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
  confirmText = "Xóa",
  cancelText = "Hủy",
  position = "bottom",
  offset = 8,
  onConfirm,
  onCancel,
  open: controlledOpen,
  onOpenChange,
  className,
  variant = "danger",
}: ConfirmPopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState<Side>(position);
  const open = controlledOpen ?? uncontrolledOpen;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  const setOpen = useCallback(
    (v: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(v);
      onOpenChange?.(v);
    },
    [controlledOpen, onOpenChange]
  );

  // Tự động điều chỉnh hướng + clamp không tràn viewport (desktop)
  useEffect(() => {
    if (!open || !wrapperRef.current || !panelRef.current) return;

    const updatePosition = () => {
      const wrapper = wrapperRef.current!;
      const panel = panelRef.current!;
      const rect = wrapper.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Kích thước panel ước lượng/đo thực tế
      // Đặt width cố định 320 (w-80), nhưng max-width đã clamp bằng CSS.
      const panelWidth = Math.min(320, vw - 32);
      // Tạm thời hiển thị để đo chiều cao thực tế (nếu cần)
      // Ở đây dùng ước lượng an toàn
      const panelHeight = Math.min(240, vh - 32);

      let newPos: Side = position;

      // Nếu thiếu ngang, đổi left/right
      if (position === "right" && rect.right + panelWidth > vw - 16)
        newPos = "left";
      else if (position === "left" && rect.left - panelWidth < 16)
        newPos = "right";

      // Nếu thiếu dọc, đổi top/bottom
      if (position === "bottom" && rect.bottom + panelHeight > vh - 16)
        newPos = "top";
      else if (position === "top" && rect.top - panelHeight < 16)
        newPos = "bottom";

      setAdjustedPosition(newPos);

      // Reset shift
      panel.style.setProperty("--shift-x", "0px");
      panel.style.setProperty("--shift-y", "0px");

      // Clamp để không tràn ngang khi top/bottom
      if (newPos === "top" || newPos === "bottom") {
        const idealCenterLeft = rect.left + rect.width / 2 - panelWidth / 2;
        const clampedLeft = Math.max(
          16,
          Math.min(idealCenterLeft, vw - panelWidth - 16)
        );
        // dịch chuyển so với "-50%"
        const delta =
          clampedLeft - (rect.left + rect.width / 2 - panelWidth / 2);
        panel.style.setProperty("--shift-x", `${Math.round(delta)}px`);
      }

      // Clamp để không tràn dọc khi left/right
      if (newPos === "left" || newPos === "right") {
        const idealCenterTop = rect.top + rect.height / 2 - panelHeight / 2;
        const clampedTop = Math.max(
          16,
          Math.min(idealCenterTop, vh - panelHeight - 16)
        );
        const delta =
          clampedTop - (rect.top + rect.height / 2 - panelHeight / 2);
        panel.style.setProperty("--shift-y", `${Math.round(delta)}px`);
      }
    };

    // Delay một frame để panel render xong
    const t = setTimeout(updatePosition, 0);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, position]);

  // Focus vào nút confirm khi mở
  useEffect(() => {
    if (open && confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    }
  }, [open]);

  // Click outside + phím Esc
  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      if (!open) return;
      const w = wrapperRef.current;
      if (w && !w.contains(e.target as Node)) {
        setOpen(false);
        onCancel?.();
      }
    }
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        onCancel?.();
      }
    }
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen, onCancel]);

  // Mapping vị trí (desktop). Dùng CSS variable cho gap & shift.
  const posClass: Record<Side, string> = {
    bottom: [
      "sm:top-full sm:left-1/2 sm:mt-[var(--gap)]",
      "sm:translate-x-[calc(-50%+var(--shift-x))]",
    ].join(" "),
    top: [
      "sm:bottom-full sm:left-1/2 sm:mb-[var(--gap)]",
      "sm:translate-x-[calc(-50%+var(--shift-x))]",
    ].join(" "),
    left: [
      "sm:right-full sm:top-1/2 sm:mr-[var(--gap)]",
      "sm:translate-y-[calc(-50%+var(--shift-y))]",
    ].join(" "),
    right: [
      "sm:left-full sm:top-1/2 sm:ml-[var(--gap)]",
      "sm:translate-y-[calc(-50%+var(--shift-y))]",
    ].join(" "),
  };

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    onCancel?.();
  };

  const handleTriggerClick = () => setOpen(true);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const confirmButtonClass =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white"
      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white";

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      {/* Trigger */}
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`confirm-popover-${id}`}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        {trigger}
      </div>

      {open && (
        <>
          {/* Backdrop cho mobile/tablet */}
          <div className="fixed inset-0 z-40 bg-slate-950/25 sm:hidden" />

          <div
            id={`confirm-popover-${id}`}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`confirm-title-${id}`}
            aria-describedby={`confirm-desc-${id}`}
            // Lưu ý: base = mobile (fixed + center); sm: desktop (absolute + posClass)
            className={[
              "z-50 text-sm bg-white border border-gray-200 rounded-lg shadow-lg",
              "dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100",
              "animate-in fade-in-0 zoom-in-95",

              // Kích thước & scroll an toàn
              "w-80 max-w-[calc(100vw-2rem)] max-h-[70vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400",

              // Mobile & tablet: center màn hình
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",

              // Desktop: bám theo trigger
              "sm:absolute sm:translate-x-0 sm:translate-y-0",
              posClass[adjustedPosition],

              className ?? "",
            ].join(" ")}
            // CSS variables để Tailwind có thể build utility trước, giá trị thay đổi runtime
            style={
              {
                // đảm bảo không vượt quá cạnh
                maxWidth: "calc(100vw - 2rem)",
                // khoảng cách giữa trigger & panel
                ["--gap" as any]: `${offset}px`,
                // dịch chuyển clamp bù trừ
                ["--shift-x" as any]: "0px",
                ["--shift-y" as any]: "0px",
              } as React.CSSProperties
            }
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3
                id={`confirm-title-${id}`}
                className="text-sm font-semibold text-gray-900 dark:text-gray-100"
              >
                {title}
              </h3>
            </div>

            {/* Content */}
            <div className="px-4 py-3">
              <p
                id={`confirm-desc-${id}`}
                className="text-sm text-gray-600 dark:text-gray-300 mb-4"
              >
                {description}
              </p>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  {cancelText}
                </button>
                <button
                  ref={confirmButtonRef}
                  type="button"
                  onClick={handleConfirm}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${confirmButtonClass}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

