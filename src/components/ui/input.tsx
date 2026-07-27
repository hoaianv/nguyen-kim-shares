import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import React, { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  error?: FieldError;
  value?: string;
  classProps?: string;
  readonly?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      type = "text",
      error,
      onChange,
      value,
      classProps,
      readonly = false,
      disabled = false,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const isInteractive = !readonly && !disabled;

    const inputType = isPasswordType && showPassword ? "text" : type;

    const toggleVisibility = () => {
      if (isInteractive) {
        setShowPassword(!showPassword);
      }
    };

    return (
      <div className={twMerge(clsx("relative group mb-6", classProps))}>
        <span
          className={`absolute left-[14px] top-1/2 -translate-y-1/2 text-sm transition-all duration-200
            ${error ? "text-destructive" : disabled ? "text-muted-foreground/60" : "text-muted-foreground"}
            ${
              isInteractive
                ? "group-focus-within:text-[11px] group-focus-within:top-[14px] group-focus-within:text-foreground"
                : ""
            }
            ${value && value.length > 0 ? "text-[11px] top-[14px]" : ""}`}
        >
          {label}
        </span>
        <input
          value={value}
          id={id}
          type={inputType}
          ref={ref}
          onChange={onChange}
          readOnly={readonly}
          disabled={disabled}
          className={`peer h-[54px] w-full rounded-lg border border-input bg-background px-[15px] pt-[20px] pb-[8px] text-foreground transition-all duration-200 nk-focus-ring
            ${isPasswordType ? "pr-[50px]" : ""}
            ${
              error
                ? "border-destructive focus:border-destructive"
                : disabled
                ? "cursor-not-allowed border-border bg-muted/50 text-muted-foreground"
                : readonly
                ? "border-border bg-muted/30"
                : "hover:border-foreground/20 focus:border-amber-500"
            }`}
        />

        {value && value.length > 0 && isPasswordType && (
          <button
            type="button"
            onClick={toggleVisibility}
            disabled={!isInteractive}
            className={`absolute right-[15px] top-1/2 -translate-y-1/2 transition-colors duration-200 focus:outline-none
              ${
                isInteractive
                  ? "cursor-pointer text-muted-foreground hover:text-foreground"
                  : "cursor-not-allowed text-muted-foreground/40"
              }`}
            tabIndex={isInteractive ? -1 : undefined}
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </button>
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

InputField.displayName = "InputField";

export default InputField;

