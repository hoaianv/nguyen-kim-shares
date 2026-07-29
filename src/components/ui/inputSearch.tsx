import { Search } from "lucide-react";
import React, { forwardRef } from "react";

interface InputSearchProps {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: string) => void;
  onFocus?: () => void;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  showSearchIcon?: boolean;
}

const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  (
    {
      id = "search",
      placeholder = "Nhập từ khóa tìm kiếm...",
      value,
      onChange,
      onFocus,
      className = "",
      children,
      onClick,
      onKeyDown,
      showSearchIcon = true,
    },
    ref
  ) => {
    return (
      <div className="relative w-full">
        {showSearchIcon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
        ) : null}
        <input
          ref={ref}
          type="text"
          id={id}
          value={value}
          onFocus={() => onFocus?.()}
          onClick={() => onClick?.()}
          onKeyDown={onKeyDown}
          onChange={(e) => onChange?.(e.target.value)}
          className={`nk-focus-ring w-full rounded-lg border border-input bg-background/95 py-3 pl-11 pr-4 text-sm text-foreground shadow-[0_10px_28px_-24px_rgba(15,23,42,0.42)] placeholder:text-muted-foreground transition-all hover:border-foreground/20 focus:border-amber-500 ${className}`}
          placeholder={placeholder}
          autoComplete="off"
        />
        {children ?? null}
      </div>
    );
  }
);

InputSearch.displayName = "InputSearch";

export default InputSearch;

