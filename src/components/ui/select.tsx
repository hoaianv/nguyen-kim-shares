import { i18nText } from "@/lib/i18nText";
import { ChevronDown } from "lucide-react";
import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  options: SelectOption[];
  error?: FieldError;
  value?: string;
  classProps?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      id,
      label,
      options,
      error,
      onChange,
      value = "",
      classProps,
      placeholder = i18nText("AUTO.components.ui.select.extra32_0_chon"),
      disabled,
    },
    ref
  ) => {
    const describedBy = error ? `${id}-error` : undefined;

    return (
      <div className={classProps}>
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm font-normal text-muted-foreground"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            id={id}
            ref={ref}
            value={value}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={`h-[54px] w-full appearance-none rounded-lg border border-input bg-background px-3 py-2.5 pr-10 text-sm font-normal text-foreground outline-none transition-all nk-focus-ring
              ${
                error
                  ? "border-destructive focus:border-destructive"
                  : "hover:border-foreground/20 focus:border-amber-500"
              }
              ${
                disabled
                  ? "cursor-not-allowed bg-muted/50 text-muted-foreground"
                  : "cursor-pointer"
              }
            `}
          >
            <option value="" disabled>
              {placeholder}
            </option>

            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>

        {error && (
          <p id={describedBy} className="mt-1 text-sm text-destructive">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
export default SelectField;

