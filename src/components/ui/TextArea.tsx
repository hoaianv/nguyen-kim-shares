import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  error?: FieldError;
  value?: string;
  classProps?: string;
  rows?: number;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      label,
      error,
      onChange,
      value,
      classProps,
      rows = 4,
      maxLength,
      placeholder,
      disabled = false,
      resize = "vertical",
    },
    ref
  ) => {
    const hasValue = value && value.length > 0;
    const currentLength = value?.length || 0;

    return (
      <div className={`${classProps} relative group mb-6`}>
        <span
          className={`absolute left-[14px] z-10 bg-background px-1 text-sm transition-all duration-200
            ${error ? "text-destructive" : "text-muted-foreground"}
            ${
              hasValue || placeholder
                ? "top-[8px] text-[11px] text-foreground"
                : "top-[20px] group-focus-within:top-[8px] group-focus-within:text-[11px] group-focus-within:text-foreground"
            }
            ${disabled ? "text-muted-foreground/40" : ""}`}
        >
          {label}
        </span>

        <textarea
          value={value}
          id={id}
          ref={ref}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          className={`peer w-full rounded-lg border border-input bg-background px-[15px] pt-[25px] pb-[12px] text-foreground transition-all duration-200 placeholder:text-transparent nk-focus-ring
            ${resize === "none" ? "resize-none" : ""}
            ${resize === "vertical" ? "resize-y" : ""}
            ${resize === "horizontal" ? "resize-x" : ""}
            ${resize === "both" ? "resize" : ""}
            ${
              disabled
                ? "cursor-not-allowed border-border bg-muted/50 text-muted-foreground"
                : error
                ? "border-destructive bg-background focus:border-destructive"
                : "hover:border-foreground/20 focus:border-amber-500"
            }
          `}
        />

        {maxLength && (
          <div className="absolute bottom-[8px] right-[15px] text-xs text-muted-foreground">
            <span
              className={
                currentLength > maxLength * 0.9 ? "text-amber-600" : ""
              }
            >
              {currentLength}
            </span>
            /{maxLength}
          </div>
        )}

        {error && (
          <p className="absolute top-full mt-1 text-sm text-destructive">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;

