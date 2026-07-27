import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface SwitchProps {
  id: string;
  label: string;
  checked?: boolean;
  error?: FieldError;
  classProps?: string;
  disabled?: boolean;
  description?: string;
  onChange?: (checked: boolean) => void;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      id,
      label,
      checked = false,
      error,
      onChange,
      classProps,
      disabled = false,
      description,
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.checked);
      }
    };

    return (
      <div className={`${classProps} relative group mb-6`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              ref={ref}
              id={id}
              type="checkbox"
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
              className="sr-only"
            />
            <button
              type="button"
              disabled={disabled}
              className={`relative h-6 w-11 rounded-full transition-all duration-200 ${
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              } ${
                checked
                  ? error
                    ? "bg-rose-500"
                    : "bg-slate-950"
                  : error
                  ? "bg-rose-200"
                  : "bg-slate-200"
              }`}
              onClick={!disabled ? () => onChange?.(!checked) : undefined}
            >
              <span
                className={`absolute left-[3px] top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  checked ? "translate-x-[18px]" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor={id}
              className={`cursor-pointer text-sm font-medium transition-colors duration-200 ${
                error ? "text-rose-600" : "text-slate-900"
              } ${disabled ? "cursor-not-allowed text-slate-400" : ""}`}
            >
              {label}
            </label>
            {description && (
              <span
                className={`mt-1 text-xs transition-colors duration-200 ${
                  error ? "text-rose-500" : "text-slate-500"
                } ${disabled ? "text-slate-400" : ""}`}
              >
                {description}
              </span>
            )}
          </div>
        </div>

        {error && <p className="mt-2 text-sm text-rose-600">{error.message}</p>}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
