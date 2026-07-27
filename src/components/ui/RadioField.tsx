import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { boolean } from "zod";

interface RadioFieldProps {
  id: string;
  label: string;
  description?: string;
  error?: FieldError;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name: string; // Radio buttons cần name để group lại với nhau
  value: string; // Giá trị của radio button
}

// forwardRef để có thể dùng với register của react-hook-form
const RadioField = forwardRef<HTMLInputElement, RadioFieldProps>(
  (
    {
      id,
      label,
      description,
      error,
      onChange,
      checked = false,
      disabled = false,
      required = false,
      className = "",
      name,
      value,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`relative group mb-6 ${className}`}>
        <div className="flex   space-x-3 items-center">
          <div className="flex items-center h-5  ">
            <input
              id={id}
              type="radio"
              ref={ref}
              name={name}
              value={value}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              className={`
                h-4 w-4 border-[1px] text-blue-600
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  error
                    ? "border-red-600 focus:ring-red-500"
                    : "border-[#b8b8b8] focus:ring-blue-500"
                }
                transition-colors duration-200
              `}
              {...props}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor={id}
              className={`
                text-sm font-medium cursor-pointer transition-colors duration-200
                ${error ? "text-red-600" : "text-[#333]"}
                ${
                  disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-[#666]"
                }
              `}
            >
              {label}
              {required && <span className="text-red-600 ml-1">*</span>}
            </label>
            {description && (
              <p
                className={`text-xs mt-1 transition-colors duration-200 ${
                  error ? "text-red-500" : "text-[#999]"
                }`}
              >
                {description}
              </p>
            )}
          </div>
        </div>
        {error && (
          <p className="mt-1 absolute top-full text-red-600 text-sm ml-7">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

RadioField.displayName = "RadioField";
export default RadioField;
