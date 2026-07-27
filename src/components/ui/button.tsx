import {
  ShoppingCart,
  Zap,
  Heart,
  Download,
  Plus,
  Minus,
  LucideIcon,
} from "lucide-react";
import { ReactNode, ButtonHTMLAttributes } from "react";

// Type definitions
type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "outline"
  | "ghost"
  | "gradient";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

type IconPosition = "left" | "right";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: IconPosition;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

// Reusable Button Component
const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  className = "",
  ...props
}: ButtonProps) => {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out nk-focus-ring disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-[1px]";

  // Variant styles
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-primary-foreground shadow-[0_14px_35px_-20px_rgba(15,23,42,0.42)] hover:opacity-95",
    secondary:
      "border border-border bg-background text-foreground shadow-[0_12px_30px_-24px_rgba(15,23,42,0.22)] hover:bg-muted/60",
    success:
      "bg-emerald-600 text-white shadow-[0_14px_35px_-18px_rgba(5,150,105,0.7)] hover:bg-emerald-700",
    warning:
      "bg-amber-400 text-slate-950 shadow-[0_14px_35px_-18px_rgba(245,158,11,0.65)] hover:bg-amber-500",
    danger:
      "bg-rose-600 text-white shadow-[0_14px_35px_-18px_rgba(244,63,94,0.7)] hover:bg-rose-700",
    outline:
      "border border-border bg-transparent text-foreground shadow-none hover:bg-muted/60",
    ghost:
      "bg-transparent text-foreground shadow-none hover:bg-muted/60",
    gradient:
      "bg-gradient-to-r from-slate-950 via-slate-900 to-amber-500 text-white shadow-[0_18px_40px_-20px_rgba(15,23,42,0.85)] hover:from-slate-900 hover:via-slate-800 hover:to-amber-600",
  };

  // Size styles
  const sizes: Record<ButtonSize, string> = {
    xs: "px-2.5 py-1.5 text-xs",
    sm: "px-3.5 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
    xl: "px-6 py-3.5 text-lg",
  };

  // Icon sizes
  const iconSizes: Record<ButtonSize, string> = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-7 w-7",
  };

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `.trim();

  const LoadingSpinner = () => (
    <div
      className={`animate-spin rounded-full border-2 border-current border-t-transparent ${iconSizes[size]}`}
    />
  );

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {Icon && iconPosition === "left" && (
            <Icon className={iconSizes[size]} />
          )}
          {children}
          {Icon && iconPosition === "right" && (
            <Icon className={iconSizes[size]} />
          )}
        </>
      )}
    </button>
  );
};

// Example usage component
const ButtonDemo = () => {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Button Component Demo</h2>

      {/* Basic variants */}
      <div className="flex flex-wrap gap-4">
        <Button variant="primary" icon={ShoppingCart}>
          Primary
        </Button>
        <Button variant="secondary" icon={Zap}>
          Secondary
        </Button>
        <Button variant="success" icon={Heart}>
          Success
        </Button>
        <Button variant="warning" icon={Download}>
          Warning
        </Button>
        <Button variant="danger" icon={Minus}>
          Danger
        </Button>
        <Button variant="outline" icon={Plus}>
          Outline
        </Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="gradient">Gradient</Button>
      </div>

      {/* Different sizes */}
      <div className="flex flex-wrap items-center gap-4">
        <Button size="xs" icon={Heart}>
          XS
        </Button>
        <Button size="sm" icon={Heart}>
          Small
        </Button>
        <Button size="md" icon={Heart}>
          Medium
        </Button>
        <Button size="lg" icon={Heart}>
          Large
        </Button>
        <Button size="xl" icon={Heart}>
          XL
        </Button>
      </div>

      {/* Icon positions */}
      <div className="flex flex-wrap gap-4">
        <Button icon={Download} iconPosition="left">
          Left Icon
        </Button>
        <Button icon={Download} iconPosition="right">
          Right Icon
        </Button>
      </div>

      {/* States */}
      <div className="flex flex-wrap gap-4">
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button fullWidth>Full Width</Button>
      </div>
    </div>
  );
};

export default Button;

