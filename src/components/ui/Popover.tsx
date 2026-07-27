"use client";

import { useState, useRef, useEffect, useId, useCallback } from "react";

type Side = "top" | "bottom" | "left" | "right";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  position?: Side;
  offset?: number;
  openOn?: "hover" | "click";
  closeDelay?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export default function Popover({
  trigger,
  children,
  title,
  position = "bottom",
  offset = 8,
  openOn = "hover",
  closeDelay = 120,
  open: controlledOpen,
  onOpenChange,
  className,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  const setOpen = useCallback(
    (v: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(v);
      onOpenChange?.(v);
    },
    [controlledOpen, onOpenChange]
  );

  const clearCloseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const closeWithDelay = useCallback(() => {
    clearCloseTimer();
    timerRef.current = setTimeout(() => setOpen(false), closeDelay);
  }, [clearCloseTimer, closeDelay, setOpen]);

  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      if (!open) return;
      const w = wrapperRef.current;
      if (w && !w.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const posClass: Record<Side, string> = {
    bottom: `top-full left-1/2 -translate-x-1/2 mt-[${offset}px]`,
    top: `bottom-full left-1/2 -translate-x-1/2 mb-[${offset}px]`,
    left: `right-full top-1/2 -translate-y-1/2 mr-[${offset}px]`,
    right: `left-full top-1/2 -translate-y-1/2 ml-[${offset}px]`,
  };

  const triggerProps =
    openOn === "hover"
      ? {
          onMouseEnter: () => {
            clearCloseTimer();
            setOpen(true);
          },
          onMouseLeave: closeWithDelay,
          onFocus: () => setOpen(true),
          onBlur: closeWithDelay,
        }
      : {
          onClick: () => setOpen(!open),
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(!open);
            }
          },
        };

  const panelHoverProps =
    openOn === "hover"
      ? {
          onMouseEnter: clearCloseTimer,
          onMouseLeave: closeWithDelay,
        }
      : {};

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`popover-${id}`}
        {...triggerProps}
      >
        {trigger}
      </div>

      {open && (
        <div
          id={`popover-${id}`}
          role="dialog"
          aria-modal="false"
          className={[
            "absolute z-[200] rounded-lg border border-border bg-popover text-sm text-popover-foreground shadow-[0_22px_60px_-30px_rgba(15,23,42,0.55)]",
            "animate-in fade-in-0 zoom-in-95",
            posClass[position],
            className ?? "",
          ].join(" ")}
          {...panelHoverProps}
        >
          {title && (
            <div className="rounded-t-lg border-b border-border px-3 py-2">
              <h3 className="text-sm font-semibold">{title}</h3>
            </div>
          )}
          <div className="px-3 py-2">{children}</div>
        </div>
      )}
    </div>
  );
}

